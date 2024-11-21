/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ICondition,
  IDecision,
  IRuleDecision,
  IValue,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import {
  string,
  number,
  StringSchema,
  NumberSchema,
  object,
  ObjectSchema,
  AnyObject,
  mixed,
} from "yup";

declare const inputTypes: readonly [
  "alphabetical",
  "date",
  "currency",
  "number",
  "percentage",
];

declare type ITextfieldInputType = (typeof inputTypes)[number];

interface TypeDataOutput {
  schema: StringSchema | NumberSchema | ObjectSchema<any, AnyObject, any> | any;
  value: IValue | undefined | string | number | string[];
}
const currencyFormat = (price: number): string => {
  if (price === 0 || !price) {
    return "$ 0";
  }
  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const parseCurrencyString = (currencyString: string): number => {
  if (currencyString === "$ 0") {
    return NaN;
  }
  return parseInt(currencyString.replace(/\$|\./g, ""));
};

const parsePercentageString = (percentageString: string): number => {
  if (percentageString === "0%") {
    return NaN;
  }
  return parseFloat(percentageString.replace("%", ""));
};

const percentageFormat = (percentage: number): string => {
  if (percentage === 0 || !percentage) {
    return "0%";
  }
  return `${percentage.toFixed(0)}%`;
};

const typeData = (
  element:
    | IDecision
    | ICondition
    | IRuleDecision
    | IValue
    | undefined
    | string[],
): TypeDataOutput | undefined => {
  if (
    "value" in element! &&
    "valueUse" in element! &&
    element.value !== undefined
  ) {
    const value = element.value;
    const fromNumber =
      typeof value === "object" &&
      "from" in value &&
      typeof value.from === "number"
        ? value.from
        : 0;
    const toNumber =
      typeof value === "object" && "to" in value && typeof value.to === "number"
        ? value.to
        : 0;

    switch (element!.valueUse) {
      case ValueHowToSetUp.LIST_OF_VALUES:
        return {
          schema: mixed().test(
            "isArrayOrString",
            "Must be an array of strings/numbers or a single string",
            (val) =>
              Array.isArray(val)
                ? val.every(
                    (item) =>
                      typeof item === "string" || typeof item === "number",
                  )
                : typeof val === "string",
          ),
          value: value,
        };
      case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
        return {
          schema: mixed().test(
            "isArrayOrString",
            "Must be an array of strings/numbers or a single string",
            (val) =>
              Array.isArray(val)
                ? val.every(
                    (item) =>
                      typeof item === "string" || typeof item === "number",
                  )
                : typeof val === "string",
          ),
          value: value,
        };
      case ValueHowToSetUp.RANGE:
        return {
          schema: object({
            from: number()
              .required("Range From is required")
              .max(toNumber, `'Range From' cannot be greater than 'Range To'`)
              .min(0, `'Range From' cannot be less than 0`),
            to: number()
              .required("Range To is required")
              .min(fromNumber, `'Range To' cannot be less than 'Range From'`)
              .min(0, "'Range To' cannot be less than 0"),
          }),
          value: {
            from: fromNumber,
            to: toNumber,
          },
        };
      case ValueHowToSetUp.GREATER_THAN:
      case ValueHowToSetUp.LESS_THAN:
      case ValueHowToSetUp.EQUAL:
        if (element.dataType === ValueDataType.PERCENTAGE) {
          return {
            schema: number()
              .required("Percentage is required")
              .min(0, "Percentage cannot be less than 0")
              .max(100, "Percentage cannot be greater than 100"),
            value: value,
          };
        }
        return {
          schema: string().required("Required"),
          value: value,
        };
      default:
        return {
          schema: string(),
          value: undefined,
        };
    }
  }
};

const ValueValidationSchema = (
  decision: IRuleDecision,
  activeConditions: ICondition[] = [],
  checkClosed: boolean = false,
) => {
  const respValue: {
      [key: string]:
        | StringSchema
        | NumberSchema
        | ObjectSchema<any, AnyObject, any>;
    } = {},
    initialValues: {
      [key: string]: IValue | undefined | string | number | string[];
    } = {};

  if (decision) {
    const decisionData = typeData(decision);
    if (decisionData) {
      respValue[decision.name] = decisionData.schema;
      initialValues[decision.name] = decisionData.value;
    }
    respValue.startDate = string()
      .required("Start date is required.")
      .test(
        "not-placeholder",
        "Start date cannot be 'dd/mm/yyyy'.",
        (value) => value !== "dd/mm/yyyy",
      )
      .test(
        "valid-date-format",
        "Start date must be a valid date.",
        (value) => {
          if (!value) return false;
          const parsedDate = Date.parse(value);
          return !isNaN(parsedDate);
        },
      );

    initialValues.startDate = (decision.startDate as any) || "";

    respValue.endDate = string()
      .test(
        "valid-date-format",
        "End date must be a valid date or null.",
        (value) => {
          if (!value) return true;
          const parsedDate = Date.parse(value);
          return !isNaN(parsedDate);
        },
      )
      .test(
        "start-before-end",
        "Start date must not be greater than end date.",
        (value, context) => {
          if (!checkClosed) return true;
          if (!value) return true;
          const startDate = Date.parse(context.parent.startDate);
          const endDate = Date.parse(value);
          return startDate <= endDate;
        },
      );

    initialValues.endDate = (decision.endDate as any) || "";
  }

  activeConditions.forEach((condition) => {
    const typeDataResult = typeData(condition);
    if (typeDataResult) {
      respValue[condition.name] = typeDataResult.schema;
      initialValues[condition.name] = typeDataResult.value;
    }
  });
  return { validationSchema: object().shape(respValue), initialValues };
};

const formatters: Record<
  ITextfieldInputType,
  (value: number | string) => string | number
> = {
  currency: (value) =>
    typeof value === "number" ? currencyFormat(value) : value,
  percentage: (value) =>
    typeof value === "number" ? percentageFormat(value) : value,
  number: (value) => value,
  alphabetical: (value) => value,
  date: (value) => value,
};

const formatValue = (value: number | string, type: ITextfieldInputType) => {
  const formatter = formatters[type] || ((v: number) => v);
  return formatter(value);
};

interface IRangeMessages {
  from?: string | NestedErrors | IRangeMessages;
  to?: string | NestedErrors | IRangeMessages;
}

interface NestedErrors {
  [key: string]: string | NestedErrors | IRangeMessages;
}

const findNestedError = (
  errors: NestedErrors | string,
): string | IRangeMessages => {
  if (typeof errors === "string") {
    return errors;
  }

  if (typeof errors === "object" && ("from" in errors || "to" in errors)) {
    const rangeMessages: IRangeMessages = {
      from: errors.from || "",
      to: errors.to || "",
    };
    return rangeMessages;
  }

  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      const nestedError = findNestedError(errors[key] as NestedErrors);
      if (nestedError) return nestedError;
    }
  }

  return "";
};

export {
  currencyFormat,
  formatValue,
  findNestedError,
  parseCurrencyString,
  parsePercentageString,
  percentageFormat,
  typeData,
  ValueValidationSchema,
};
export type { IRangeMessages, TypeDataOutput };
