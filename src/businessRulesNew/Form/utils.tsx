/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { string, date, object, lazy, Schema } from "yup";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { strategyFormFactoryHandlerManager } from "./helpers/utils";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
import { IUseRulesFormUtils } from "../types/Forms/IUseRulesFormUtils";
import { IRulesForm } from "../types/Forms/IRulesForm";
import { getConditionsByGroupNew } from "../helper/utils/getConditionsByGroup";

function useRulesFormUtils({
  decision,
  onSubmitEvent,
  textValues,
}: IUseRulesFormUtils & { textValues: IRulesForm["textValues"] }) {
  const grouped = getConditionsByGroupNew(decision) || {};

  const iterateGrouped = () =>
    Object.entries(grouped).flatMap(([g, list]) =>
      (list as any[]).map((cond) => ({ group: g, cond })),
    );

  const emptyGroupedRecord = Object.fromEntries(
    Object.keys(grouped).map((g) => [g, {} as Record<string, any>]),
  );

  const initialValues = {
    ruleName: decision.ruleName || "",
    decisionDataType: decision.decisionDataType || ValueDataType.ALPHABETICAL,
    howToSetTheDecision: decision.howToSetTheDecision || "",
    value: decision.value || "",
    effectiveFrom: decision.effectiveFrom || "",
    validUntil: decision.validUntil || "",
    toggleNone: true,
    conditionsThatEstablishesTheDecision: emptyGroupedRecord as Record<
      string,
      Record<string, any>
    >,
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
      const haveAnyGroupKeys =
        parent &&
        parent.conditionsThatEstablishesTheDecision &&
        typeof parent.conditionsThatEstablishesTheDecision === "object" &&
        Object.keys(parent.conditionsThatEstablishesTheDecision).length > 0;

      const toggleNone = parent?.toggleNone && haveAnyGroupKeys;
      if (toggleNone) return object().shape({});

      const perGroupSchemas: Record<string, Schema<any>> = {};
      for (const [groupKey, conditionList] of Object.entries(grouped)) {
        const perCond: Record<string, Schema<any>> = {};
        (conditionList as any[]).forEach((condition) => {
          const conditionValue =
            parent?.conditionsThatEstablishesTheDecision?.[groupKey]?.[
              condition.conditionName
            ];

          if (conditionValue !== undefined) {
            const strat = strategyFormFactoryHandlerManager(
              condition.howToSetTheCondition as EValueHowToSetUp,
            );
            perCond[condition.conditionName] = strat(
              condition.value as any,
              condition.conditionDataType,
            ).schema;
          }
        });

        perGroupSchemas[groupKey] = object(perCond);
      }

      return object(perGroupSchemas).test(
        "at-least-one-condition",
        "Debe existir al menos una condición para que la decisión se valide correctamente.",
        (value) => {
          if (!value || typeof value !== "object") return false;
          return Object.values(value as Record<string, any>).some((groupRec) =>
            groupRec &&
            typeof groupRec === "object" &&
            Object.values(groupRec).some(
              (v) => v !== undefined && v !== null && v !== "",
            ),
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
      const updatedGrouped = Object.fromEntries(
        Object.entries(grouped).map(([groupKey, list]) => {
          const filtered = (list as any[]).filter((cond) => {
            const cv =
              values.conditionsThatEstablishesTheDecision?.[groupKey]?.[
                cond.conditionName
              ];
            return cv !== undefined && cv !== null && cv !== "";
          });

          const mapped = filtered.map((cond) => ({
            ...cond,
            value:
              values.conditionsThatEstablishesTheDecision?.[groupKey]?.[
                cond.conditionName
              ],
          }));

          return [groupKey, mapped];
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

    iterateGrouped().forEach(({ group, cond }) => {
      const path = `conditionsThatEstablishesTheDecision.${group}.${cond.conditionName}`;
      if (isNoneSelected) {
        formik.setFieldValue(path, undefined);
      } else {
        const defaultValue =
          cond.howToSetTheCondition === EValueHowToSetUp.LIST_OF_VALUES_MULTI
            ? []
            : "";
        formik.setFieldValue(path, defaultValue);
      }
    });
  };

  return { formik, handleToggleNoneChange };
}

export { useRulesFormUtils };
