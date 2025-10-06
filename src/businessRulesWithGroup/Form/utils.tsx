/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { string, date, object, lazy, Schema } from "yup";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { strategyFormFactoryHandlerManager } from "./helpers/utils";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
import { IUseRulesFormUtils } from "../types/Forms/IUseRulesFormUtils";
import { IRulesForm } from "../types/Forms/IRulesForm";

const hasContent = (v: any) =>
  v !== undefined &&
  v !== null &&
  (typeof v !== "string" || v.trim() !== "") &&
  (!Array.isArray(v) || v.length > 0);

function useRulesFormUtilsWithGroup({
  decision,
  onSubmitEvent,
  textValues,
}: IUseRulesFormUtils & { textValues: IRulesForm["textValues"] }) {
  const incomingConditions =
    decision.conditionGroups?.conditionsThatEstablishesTheDecision ?? [];

  // Build initial map for formik
  const seededConditionsMap = incomingConditions.reduce((acc, c) => {
    if (hasContent(c.value)) acc[c.conditionName] = c.value;
    return acc;
  }, {} as Record<string, any>);

  const seededHasAny = Object.keys(seededConditionsMap).length > 0;

  const initialValues = {
    ruleName: decision.ruleName || "",
    decisionDataType: decision.decisionDataType || ValueDataType.ALPHABETICAL,
    howToSetTheDecision: decision.howToSetTheDecision || "",
    value: decision.value ?? "",
    effectiveFrom: decision.effectiveFrom || "",
    validUntil: decision.validUntil || "",
    toggleNone: !seededHasAny,
    conditionsThatEstablishesTheDecision: seededConditionsMap,
    checkClosed: false,
    terms: true,
  };

  let formik: ReturnType<typeof useFormik>;

  const baseSchema: Record<string, any> = {
    ruleName: string().required("El nombre de la regla es requerido"),
    value: lazy(() => {
      const strategy = strategyFormFactoryHandlerManager(
        formik.values.howToSetTheDecision as any,
      );
      return strategy(
        formik.values.value as any,
        formik.values.decisionDataType,
      ).schema;
    }),
    conditionsThatEstablishesTheDecision: lazy((_value, ctx) => {
      const parent = ctx.parent ?? {};
      const toggleNone =
        parent?.toggleNone &&
        Object.keys(parent.conditionsThatEstablishesTheDecision || {}).length > 0;

      if (toggleNone) return object().shape({});
      return object().shape({});
    }),
  };

  if (textValues.terms) {
    baseSchema.effectiveFrom = date().required("La fecha de inicio es requerida");
    baseSchema.validUntil = date().when(
      "checkClosed",
      (_checkClosed, schema, { parent }) => {
        const checkClosed = parent?.checkClosed;
        return checkClosed
          ? schema
              .required("La fecha de finalización es requerida")
              .test(
                "is-after-startDate",
                "La fecha de finalización debe ser mayor o igual a la fecha de inicio",
                function (validUntil) {
                  const effectiveFrom = this.parent.effectiveFrom;
                  if (!effectiveFrom || !validUntil) return true;
                  return new Date(validUntil) >= new Date(effectiveFrom);
                },
              )
          : schema.notRequired();
      },
    );
  }

  const validationSchema: Schema<any> = object(baseSchema);

  formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      // 🔹 FIXED: Build grouped conditions directly from formik values
      const mappedConditions = Object.entries(
        values.conditionsThatEstablishesTheDecision,
      )
        .filter(([_, v]) => hasContent(v))
        .map(([name, v]) => {
          const tpl = incomingConditions.find(
            (c) => c.conditionName === name,
          ) ?? { conditionName: name };
          return { ...tpl, value: v };
        });

      const updatedDecision: IRuleDecision = {
        ...decision,
        ruleName: values.ruleName,
        decisionDataType: values.decisionDataType,
        howToSetTheDecision: values.howToSetTheDecision as any,
        value: values.value,
        effectiveFrom: values.effectiveFrom,
        validUntil: values.validUntil,
        conditionGroups: {
          ConditionGroupId:
            decision.conditionGroups[0]?.ConditionGroupId ?? "group-primary",
          conditionsThatEstablishesTheDecision: values.toggleNone
            ? []
            : mappedConditions,
        },
      };

      console.log("🚀 Built grouped decision:", updatedDecision);
      onSubmitEvent!(updatedDecision);
    },
  }) as any;

  const handleToggleNoneChange = (isNoneSelected: boolean) => {
    formik.setFieldValue("toggleNone", isNoneSelected);
    incomingConditions.forEach((condition) => {
      if (isNoneSelected) {
        formik.setFieldValue(
          `conditionsThatEstablishesTheDecision.${condition.conditionName}`,
          undefined,
        );
      } else {
        if (
          formik.values.conditionsThatEstablishesTheDecision[
            condition.conditionName
          ] === undefined
        ) {
          const def =
            condition.howToSetTheCondition ===
            EValueHowToSetUp.LIST_OF_VALUES_MULTI
              ? []
              : "";
          formik.setFieldValue(
            `conditionsThatEstablishesTheDecision.${condition.conditionName}`,
            def,
          );
        }
      }
    });
  };

  return { formik, handleToggleNoneChange };
}

export { useRulesFormUtilsWithGroup };
