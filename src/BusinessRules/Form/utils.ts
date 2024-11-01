/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ICondition,
  IDecision,
  IRuleDecision,
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
  schema: StringSchema | NumberSchema | ObjectSchema<any, AnyObject, any>;
  value: string | number | { rangeFrom: number; rangeTo: number } | undefined;
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
  element: IDecision | ICondition,
): TypeDataOutput | undefined => {
  const value = element.possibleValue;
  const rangeFromNumber =
    typeof value?.rangeFrom === "number" ? value.rangeFrom : 0;
  const rangeToNumber =
    typeof value?.rangeTo === "number" ? value.rangeTo : Infinity;

  switch (element.howToSetUp) {
    case ValueHowToSetUp.LIST_OF_VALUES:
      return {
        schema: string(),
        value: value!.listSelected?.[0],
      };
    case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
      return {
        schema: string(),
        value: "",
      };
    case ValueHowToSetUp.RANGE:
      return {
        schema: object({
          rangeFrom: number()
            .required("Range From is required")
            .max(
              rangeToNumber,
              "'Range From' cannot be greater than 'Range To'",
            )
            .min(0, "'Range From' cannot be less than 0"),
          rangeTo: number()
            .required("Range To is required")
            .min(rangeFromNumber, "'Range To' cannot be less than 'Range From'")
            .min(0, "'Range To' cannot be less than 0"),
        }),
        value: {
          rangeFrom: rangeFromNumber,
          rangeTo: rangeToNumber,
        },
      };
    case ValueHowToSetUp.GREATER_THAN:
    case ValueHowToSetUp.LESS_THAN:
    case ValueHowToSetUp.EQUAL:
      return {
        schema: string().required("Required"),
        value: value!.value,
      };
    default:
      return {
        schema: string(),
        value: undefined,
      };
  }
};

const ValueValidationSchema = (decision: IRuleDecision) => {
  const respValue: {
      [key: string]:
        | StringSchema
        | NumberSchema
        | ObjectSchema<any, AnyObject, any>;
    } = {},
    initialValues: {
      [key: string]:
        | string
        | number
        | { rangeFrom: number; rangeTo: number }
        | undefined;
    } = {};

  if (decision.decision) {
    const decisionData = typeData(decision.decision);
    if (decisionData) {
      respValue[decision.decision.name] = decisionData.schema;
      initialValues[decision.decision.name] = decisionData.value;
    }
  }

  if (decision.conditions) {
    decision.conditions.forEach((condition) => {
      const typeDataResult = typeData(condition);
      if (typeDataResult) {
        respValue[condition.name] = typeDataResult.schema;
        initialValues[condition.name] = typeDataResult.value;
      }
    });
  }
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
  rangeFrom?: string | NestedErrors | IRangeMessages;
  rangeTo?: string | NestedErrors | IRangeMessages;
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

  if (
    typeof errors === "object" &&
    ("rangeFrom" in errors || "rangeTo" in errors)
  ) {
    const rangeMessages: IRangeMessages = {
      rangeFrom: errors.rangeFrom || "",
      rangeTo: errors.rangeTo || "",
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
