/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { string, date, object, lazy, Schema } from "yup";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { strategyFormFactoryHandlerManager } from "./helpers/utils";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";

interface IuseRulesFormUtils {
  decision: IRuleDecision;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
}

function useRulesFormUtils({ decision, onSubmitEvent }: IuseRulesFormUtils) {
  const initialValues = {
    ruleName: decision.ruleName || "",
    decisionDataType: decision.decisionDataType || ValueDataType.ALPHABETICAL,
    howToSetTheDecision: decision.howToSetTheDecision || "",
    value: decision.value || "",
    effectiveFrom: decision.effectiveFrom || "",
    validUntil: decision.validUntil || "",
    toggleNone: true,
    conditionsThatEstablishesTheDecision: {} as Record<string, any>,
    checkClosed: false,
  };

  const validationSchema: Schema<any> = object({
    ruleName: string().required("Name is required"),
    effectiveFrom: date().required("effective From date is required"),
    validUntil: date().when(
      "checkClosed",
      (_checkClosed, schema, { parent }) => {
        const checkClosed = parent?.checkClosed;
        return checkClosed
          ? schema
              .required("valid Until date is required")
              .test(
                "is-after-startDate",
                "valid Until date must be greater than or equal to Start date",
                function (validUntil) {
                  const effectiveFrom = this.parent.effectiveFrom;
                  if (!effectiveFrom || !validUntil) return true;
                  return new Date(validUntil) >= new Date(effectiveFrom);
                },
              )
          : schema.notRequired();
      },
    ),
    value: lazy(() => {
      const strategy = strategyFormFactoryHandlerManager(
        formik.values.howToSetTheDecision as any,
      );
      return strategy(
        formik.values.value as any,
        formik.values.decisionDataType,
      ).schema;
    }),
    conditionsThatEstablishesTheDecision: lazy((_value, { parent }) => {
      const toggleNone =
        parent?.toggleNone &&
        Object.keys(parent.conditionsThatEstablishesTheDecision || {}).length >
          0;

      if (toggleNone) return object().shape({});

      const conditionsSchema =
        decision.conditionsThatEstablishesTheDecision?.reduce(
          (schema, condition) => {
            const conditionValue =
              formik.values.conditionsThatEstablishesTheDecision[
                condition.conditionName
              ];
            if (conditionValue !== undefined) {
              const strategy = strategyFormFactoryHandlerManager(
                condition.howToSetTheCondition as EValueHowToSetUp,
              );
              schema[condition.conditionName] = strategy(
                condition.value as any,
                condition.conditionDataType,
              ).schema;
            }
            return schema;
          },
          {} as Record<string, Schema<any>>,
        );

      return object(conditionsSchema).test(
        "at-least-one-condition",
        "It must be at least one condition in order for the decision to be validated correctly.",
        (value) => {
          if (!value) return false;
          return Object.values(value).some(
            (v) => v !== undefined && v !== null && v !== "",
          );
        },
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
        ruleName: values.ruleName,
        decisionDataType: values.decisionDataType,
        howToSetTheDecision: values.howToSetTheDecision as any,
        value: values.value,
        effectiveFrom: values.effectiveFrom,
        validUntil: values.validUntil,
        conditionsThatEstablishesTheDecision:
          decision.conditionsThatEstablishesTheDecision
            ?.filter((condition) => {
              const conditionValue =
                values.conditionsThatEstablishesTheDecision[
                  condition.conditionName
                ];
              return (
                conditionValue !== undefined &&
                conditionValue !== null &&
                conditionValue !== ""
              );
            })
            .map((condition) => ({
              ...condition,
              value:
                values.conditionsThatEstablishesTheDecision[
                  condition.conditionName
                ],
            })),
      };
      onSubmitEvent(updatedDecision);
    },
  });

  const handleToggleNoneChange = (isNoneSelected: boolean) => {
    formik.setFieldValue("toggleNone", isNoneSelected);
    decision.conditionsThatEstablishesTheDecision?.forEach((condition) => {
      if (isNoneSelected) {
        formik.setFieldValue(
          `conditionsThatEstablishesTheDecision.${condition.conditionName}`,
          undefined,
        );
      } else {
        const defaultValue =
          condition.howToSetTheCondition ===
          EValueHowToSetUp.LIST_OF_VALUES_MULTI
            ? []
            : "";
        formik.setFieldValue(
          `conditionsThatEstablishesTheDecision.${condition.conditionName}`,
          defaultValue,
        );
      }
    });
  };

  return { formik, handleToggleNoneChange };
}

export { useRulesFormUtils };
