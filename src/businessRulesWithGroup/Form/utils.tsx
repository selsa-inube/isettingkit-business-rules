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

const extractConditionsFromFormik = (
  values: any,
  incomingConditions: Array<any>,
) => {
  console.log('incomingConditions: ',incomingConditions);
  const flatPairs =
    Object.entries(values?.conditionsThatEstablishesTheDecision ?? {})
      .filter(([, v]) => hasContent(v))
      .map(([conditionName, value]) => ({ conditionName, value }));

  let groupedPairs: Array<{ conditionName?: string; value: any }> = [];
  const cg = values?.conditionGroups?.conditionsThatEstablishesTheDecision;

  if (Array.isArray(cg)) {
    groupedPairs = cg
      .filter((c) => hasContent(c?.value))
      .map((c) => ({ conditionName: c?.conditionName, value: c?.value }));
  } else if (cg && typeof cg === "object") {
    groupedPairs = Object.entries(cg)
      .filter(([, v]) => hasContent(v))
      .map(([conditionName, value]) => ({ conditionName, value }));
  }

  const collected = flatPairs.length ? flatPairs : groupedPairs;

  const byName = new Map(
    (incomingConditions ?? []).map((c) => [c?.conditionName, c]),
  );

  return collected.map((c, idx) => {
    const name =
      c.conditionName ??
      incomingConditions?.[idx]?.conditionName ??
      undefined;

    const template =
      (name && byName.get(name)) ??
      incomingConditions?.[idx] ??
      {};

    return {
      ...template,
      ...(name ? { conditionName: name } : {}),
      value: c.value,
    };
  });
};

function useRulesFormUtilsWithGroup({
  decision,
  onSubmitEvent,
  textValues,
}: IUseRulesFormUtils & { textValues: IRulesForm["textValues"] }) {
  const incomingConditions =
    decision.conditionGroups[0]?.conditionsThatEstablishesTheDecision ?? [];

  const seededConditionsMap = incomingConditions.reduce((acc: { [x: string]: any; }, c: { value: any; conditionName: string | number; }) => {
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
    conditionGroups: {
      ConditionGroupId: decision.conditionGroups?.ConditionGroupId ?? "group-primary",
      conditionsThatEstablishesTheDecision: incomingConditions,
    },
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
    conditionsThatEstablishesTheDecision: object().shape({}),
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
      console.log('onSubmit: ',values, ' - ',decision.conditionGroups, ' - incoming ', incomingConditions);
      const ConditionGroupId =
        decision.conditionGroups?.ConditionGroupId ?? "group-primary";

      const grouped = values.toggleNone
        ? []
        : extractConditionsFromFormik(values, incomingConditions);

      const updatedDecision: IRuleDecision = {
        ...decision,
        ruleName: values.ruleName,
        decisionDataType: values.decisionDataType,
        howToSetTheDecision: values.howToSetTheDecision as any,
        value: values.value,
        effectiveFrom: values.effectiveFrom,
        validUntil: values.validUntil,
        conditionGroups: {
          ConditionGroupId,
          conditionsThatEstablishesTheDecision: grouped,
        },
      };
      onSubmitEvent!(updatedDecision);
    },
  }) as any;

  const handleToggleNoneChange = (isNoneSelected: boolean) => {
    formik.setFieldValue("toggleNone", isNoneSelected);

    incomingConditions.forEach((condition: any) => {
      if (isNoneSelected) {
        formik.setFieldValue(
          `conditionsThatEstablishesTheDecision.${condition.conditionName}`,
          undefined,
        );
      } else {
        const cur =
          formik.values.conditionsThatEstablishesTheDecision[condition.conditionName];
        if (cur === undefined) {
          const def =
            condition.howToSetTheCondition === EValueHowToSetUp.LIST_OF_VALUES_MULTI
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
