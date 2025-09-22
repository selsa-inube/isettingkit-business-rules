/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { string, date, object, lazy, Schema } from "yup";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { strategyFormFactoryHandlerManager } from "./helpers/utils";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
import { IUseRulesFormUtils } from "../types/Forms/IUseRulesFormUtils";
import { IRulesForm } from "../types/Forms/IRulesForm";
import { getConditionsByGroup } from "../helper/utils/getConditionsByGroup"; // << use the same helper you use elsewhere

function useRulesFormUtils({
  decision,
  onSubmitEvent,
  textValues,
}: IUseRulesFormUtils & { textValues: IRulesForm["textValues"] }) {
  // ---- helpers over grouped structure ----
  const grouped = getConditionsByGroup(decision) || {};
  const flattenConditions = (): any[] => Object.values(grouped).flat() as any[];

  const initialValues = {
    ruleName: decision.ruleName || "",
    decisionDataType: decision.decisionDataType || ValueDataType.ALPHABETICAL,
    howToSetTheDecision: decision.howToSetTheDecision || "",
    value: decision.value || "",
    effectiveFrom: decision.effectiveFrom || "",
    validUntil: decision.validUntil || "",
    toggleNone: true,
    // form stores condition values in a flat dictionary by conditionName
    conditionsThatEstablishesTheDecision: {} as Record<string, any>,
    checkClosed: false,
    terms: true,
  };

  // eslint-disable-next-line prefer-const
  let formik: ReturnType<typeof useFormik>;

  const baseSchema: any = {
    ruleName: string().required("El nombre de la decision es requerido"),

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

      // build schema from flattened conditions (visible or not — validation depends on user input)
      const allConds = flattenConditions();
      const conditionsSchema = allConds.reduce(
        (schema, condition) => {
          const conditionValue =
            formik.values.conditionsThatEstablishesTheDecision?.[
              condition.conditionName
            ];
          if (conditionValue !== undefined) {
            const strat = strategyFormFactoryHandlerManager(
              condition.howToSetTheCondition as EValueHowToSetUp,
            );
            schema[condition.conditionName] = strat(
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
        "Debe existir al menos una condición para que la decisión se valide correctamente.",
        (value) => {
          if (!value) return false;
          return Object.values(value).some(
            (v) => v !== undefined && v !== null && v !== "",
          );
        },
      );
    }),
  };

  if (textValues.terms) {
    baseSchema.effectiveFrom = date().required(
      "Se requiere la fecha de vigencia desde",
    );
    baseSchema.validUntil = date().when(
      "checkClosed",
      (_checkClosed, schema, { parent }) => {
        const checkClosed = parent?.checkClosed;
        return checkClosed
          ? schema
              .required("Se requiere la fecha de vigencia hasta")
              .test(
                "is-after-startDate",
                "La fecha válida para la vigencia hasta debe ser mayor o igual a la fecha de inicio",
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
      // rebuild grouped structure with only filled values
      const updatedGrouped = Object.fromEntries(
        Object.entries(grouped).map(([g, list]) => {
          const filtered = (list as any[]).filter((cond) => {
            const cv =
              values.conditionsThatEstablishesTheDecision?.[cond.conditionName];
            return cv !== undefined && cv !== null && cv !== "";
          });
          const mapped = filtered.map((cond) => ({
            ...cond,
            value:
              values.conditionsThatEstablishesTheDecision?.[cond.conditionName],
          }));
          return [g, mapped];
        }),
      );

      const updatedDecision: IRuleDecision = {
        ...decision,
        ruleName: values.ruleName,
        decisionDataType: values.decisionDataType,
        howToSetTheDecision: values.howToSetTheDecision as any,
        value: values.value,
        effectiveFrom: values.effectiveFrom,
        validUntil: values.validUntil,
        conditionsThatEstablishesTheDecision: updatedGrouped as any,
      };

      onSubmitEvent!(updatedDecision);
    },
  }) as any;

  const handleToggleNoneChange = (isNoneSelected: boolean) => {
    formik.setFieldValue("toggleNone", isNoneSelected);

    const allConds = flattenConditions();
    allConds.forEach((condition) => {
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
