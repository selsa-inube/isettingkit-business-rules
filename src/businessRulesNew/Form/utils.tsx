/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { string, date, object, lazy, Schema } from "yup";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { strategyFormFactoryHandlerManager } from "./helpers/utils";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
import { IUseRulesFormUtils } from "../types/Forms/IUseRulesFormUtils";
import { IRulesForm } from "../types/Forms/IRulesForm";
import { getConditionsByGroupNew } from "../helper/utils/getConditionsByGroup";

const getWrapperValue = (wrapper: any) =>
  wrapper && typeof wrapper === "object" && "value" in wrapper
    ? wrapper.value
    : wrapper;

const hasMeaningfulValue = (v: any): boolean => {
  const val = getWrapperValue(v);
  if (val === null || val === undefined) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (typeof val === "number") return !Number.isNaN(val);
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "object") return Object.keys(val).length > 0;
  return true;
};

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

  // 👉 Build record: group → conditionName → FULL condition object ({...cond, value})
  const initialConditionsRecord: Record<string, Record<string, any>> =
    Object.fromEntries(
      Object.entries(grouped).map(([groupKey, list]) => {
        const perCondition: Record<string, any> = {};

        (list as any[]).forEach((cond) => {
          const name = cond.conditionName as string;

          const hasExplicitValue =
            cond.value !== undefined &&
            cond.value !== null &&
            cond.value !== "";

          const defaultValue =
            cond.howToSetTheCondition === EValueHowToSetUp.LIST_OF_VALUES_MULTI
              ? []
              : "";

          perCondition[name] = {
            ...cond,
            value: hasExplicitValue ? cond.value : defaultValue,
          };
        });

        return [groupKey, perCondition];
      }),
    );

  // 👉 Build conditionGroups from that record (only primitives in .value)
  const initialConditionGroups = Object.entries(grouped).map(
    ([groupKey, list]) => {
      const valueRecord = initialConditionsRecord[groupKey] || {};
      const mappedList = (list as any[]).map((cond) => {
        const name = cond.conditionName as string;
        const wrapper = valueRecord[name];
        const valueForCond =
          wrapper && typeof wrapper === "object" && "value" in wrapper
            ? wrapper.value
            : cond.value;

        return {
          ...cond,
          value: valueForCond,
        };
      });

      return {
        ConditionGroupId: groupKey,
        conditionsThatEstablishesTheDecision: mappedList,
      };
    },
  );

  const initialValues = {
    ruleName: decision.ruleName || "",
    decisionDataType: decision.decisionDataType || ValueDataType.ALPHABETICAL,
    howToSetTheDecision: decision.howToSetTheDecision || "",
    value: decision.value || "",
    effectiveFrom: decision.effectiveFrom || "",
    validUntil: decision.validUntil || "",
    toggleNone: true,
    conditionsThatEstablishesTheDecision:
      initialConditionsRecord as Record<string, Record<string, any>>,
    checkClosed: false,
    terms: true,
    conditionGroups: initialConditionGroups,
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
          const wrapper =
            parent?.conditionsThatEstablishesTheDecision?.[groupKey]?.[
              condition.conditionName
            ];
          const conditionValue = getWrapperValue(wrapper);

          if (conditionValue !== undefined) {
            const strat = strategyFormFactoryHandlerManager(
              condition.howToSetTheCondition as EValueHowToSetUp,
            );
            perCond[condition.conditionName] = strat(
              conditionValue as any,
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
          return Object.values(value as Record<string, any>).some(
            (groupRec) =>
              groupRec &&
              typeof groupRec === "object" &&
              Object.values(groupRec).some((wrapper: any) =>
                hasMeaningfulValue(wrapper),
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
          const groupWrappers =
            values.conditionsThatEstablishesTheDecision?.[groupKey] || {};

          const mapped = (list as any[])
            .map((cond) => {
              const name = cond.conditionName;
              const wrapper = groupWrappers[name];
              const cv = getWrapperValue(wrapper);

              return {
                ...cond,
                value: cv,
              };
            })
            .filter((cond) => hasMeaningfulValue(cond.value));

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
        formik.setFieldValue(
          path,
          {
            ...cond,
            value: defaultValue,
          },
          false,
        );
      }
    });
  };

  return { formik, handleToggleNoneChange };
}

export { useRulesFormUtils };
