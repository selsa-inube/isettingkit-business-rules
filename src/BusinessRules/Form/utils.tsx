/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { string, date, object, lazy, Schema } from "yup";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { getStrategy } from "./helpers/typeData/utils";

interface IuseRulesFormUtils {
  decision: IRuleDecision;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
}

function useRulesFormUtils({ decision, onSubmitEvent }: IuseRulesFormUtils) {
  const initialValues = {
    name: decision.name || "",
    dataType: decision.dataType || ValueDataType.ALPHABETICAL,
    valueUse: decision.valueUse || "",
    value: decision.value || "",
    startDate: decision.startDate || "",
    endDate: decision.endDate || "",
    toggleNone: true,
    conditions: {} as Record<string, any>,
    checkClosed: false,
  };

  const validationSchema: Schema<any> = object({
    name: string().required("Name is required"),
    startDate: date().required("Start date is required"),
    endDate: date().when("checkClosed", (_checkClosed, schema, { parent }) => {
      const checkClosed = parent?.checkClosed;
      return checkClosed
        ? schema
            .required("End date is required")
            .test(
              "is-after-startDate",
              "End date must be greater than or equal to Start date",
              function (endDate) {
                const startDate = this.parent.startDate;
                if (!startDate || !endDate) return true;
                return new Date(endDate) >= new Date(startDate);
              },
            )
        : schema.notRequired();
    }),
    value: lazy(() => {
      const strategy = getStrategy(formik.values.valueUse);
      return strategy(formik.values.value as any, formik.values.dataType)
        .schema;
    }),
    conditions: lazy((_value, { parent }) => {
      const toggleNone = parent?.toggleNone && parent?.conditions?.length > 0;
      if (toggleNone) return object().shape({});
      return object(
        decision.conditions?.reduce(
          (schema, condition) => {
            if (formik.values.conditions[condition.name] !== undefined) {
              const strategy = getStrategy(condition.valueUse);
              schema[condition.name] = strategy(
                condition.value as any,
                condition.dataType,
              ).schema;
            }
            return schema;
          },
          {} as Record<string, Schema<any>>,
        ),
      );
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      const updatedDecision: IRuleDecision = {
        ...decision,
        name: values.name,
        dataType: values.dataType,
        valueUse: values.valueUse,
        value: values.value,
        startDate: values.startDate,
        endDate: values.endDate,
        conditions: decision.conditions?.map((condition) => ({
          ...condition,
          value: values.conditions[condition.name],
        })),
      };
      onSubmitEvent(updatedDecision);
    },
  });

  const handleToggleNoneChange = (isNoneSelected: boolean) => {
    formik.setFieldValue("toggleNone", isNoneSelected);
    decision.conditions?.forEach((condition) => {
      if (isNoneSelected) {
        formik.setFieldValue(`conditions.${condition.name}`, undefined);
      } else {
        const defaultValue =
          condition.valueUse === ValueHowToSetUp.LIST_OF_VALUES_MULTI ? [] : "";
        formik.setFieldValue(`conditions.${condition.name}`, defaultValue);
      }
    });
  };

  return { formik, handleToggleNoneChange };
}

export { useRulesFormUtils };
