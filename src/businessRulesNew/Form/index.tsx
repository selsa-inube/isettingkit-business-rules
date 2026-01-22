/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRulesFormUtils } from "./utils";
import { RulesFormUI } from "./interface";
import { IRulesForm } from "../types/Forms/IRulesForm";
import { getConditionsByGroupNew } from "../helper/utils/getConditionsByGroup";
import { filterByGroup } from "../helper/utils/filterByGroup";
import React from "react";
import { buildEsConditionSentence } from "../utils/buildEsConditionSentence";
import { normalizeHowToSet } from "../utils/normalizeHowToSet";
import { timeUnitHandle } from "../utils/timeUnitHandle";
import { ITab } from "@inubekit/inubekit";
import { IRulesFormExtra } from "../types/Forms/IRulesFormExtra";
import { labelForGroup } from "../utils/labelForGroup";
import { defaultForHowToSet } from "../utils/defaultForHowToSet";
import { readFromConditionGroups } from "../utils/readFromConditionGroups";
import { readScopedRecord } from "../utils/readScopedRecord";

const RulesForm = (props: IRulesForm & IRulesFormExtra) => {
  const {
    decision,
    onSubmitEvent,
    textValues,
    onCancel,
    onRemoveCondition,
    onRestoreConditions,
    fullTemplate,
  } = props;

  const { formik, handleToggleNoneChange } = useRulesFormUtils({
    decision,
    onSubmitEvent,
    textValues,
  });

  const sourceForGroups = fullTemplate ?? decision;
  const conditionsByGroupFull: { [key: string]: any[] } =
    getConditionsByGroupNew(sourceForGroups);

  const conditionsByGroupVisible = getConditionsByGroupNew(decision);
  const visibleConditionsByGroup = filterByGroup(
    conditionsByGroupVisible,
    (condition: any) => !condition.hidden,
  );

  const groupKeys = Object.keys(visibleConditionsByGroup);

  const primaryGroupKey =
    groupKeys.includes("group-primary") && groupKeys.length > 0
      ? "group-primary"
      : groupKeys[0];

  const orderedGroupKeys =
    primaryGroupKey != null
      ? [
          ...groupKeys.filter((key) => key === primaryGroupKey),
          ...groupKeys.filter((key) => key !== primaryGroupKey),
        ]
      : [];

  const tabIdByGroup: Record<string, string> = {};
  const groupByTabId: Record<string, string> = {};

  let altIndex = 1;
  const tabs: ITab[] = orderedGroupKeys.map((groupKey) => {
    const isPrimary = groupKey === primaryGroupKey;

    const tabId = isPrimary
      ? "mainCondition"
      : `alternateCondition-${altIndex++}`;

    tabIdByGroup[groupKey] = tabId;
    groupByTabId[tabId] = groupKey;

    return {
      id: tabId,
      label: isPrimary
        ? "Condición principal" // ✅ always this for the primary group
        : labelForGroup(groupKey, Number(tabId.split("-").at(-1))),
      isDisabled: false,
    };
  });


  const [activeTab, setActiveTab] = React.useState<string>(
    tabs[0]?.id ?? "mainCondition",
  );
  const handleTabChange = (id: string) => setActiveTab(id);

  const activeGroupKey =
    groupByTabId[activeTab] ??
    primaryGroupKey ??
    "group-primary";

  React.useEffect(() => {
    const rec = (formik.values as any)?.conditionsThatEstablishesTheDecision;

    let hasAnyValue = false;
    if (rec && typeof rec === "object") {
      hasAnyValue = Object.values(rec).some(
        (group: any) =>
          group &&
          typeof group === "object" &&
          Object.keys(group as any).length > 0,
      );
    }

    if (hasAnyValue) return;

    const groupedFromDecision: { [key: string]: any[] } =
      getConditionsByGroupNew(decision);

    if (
      !groupedFromDecision ||
      Object.keys(groupedFromDecision).length === 0
    ) {
      return;
    }

    const nextRec = Object.fromEntries(
      Object.entries(groupedFromDecision).map(([groupKey, list]) => {
        const valueByCondition = Object.fromEntries(
          (list as any[]).map((c) => {
            const how = normalizeHowToSet(c.howToSetTheCondition);
            const fallback = c.value ?? defaultForHowToSet(how);
            return [c.conditionName, fallback];
          }),
        );
        return [groupKey, valueByCondition];
      }),
    );

    formik.setFieldValue(
      "conditionsThatEstablishesTheDecision",
      nextRec,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decision]);

  React.useEffect(() => {
    const rec = (formik.values as any)?.conditionsThatEstablishesTheDecision;
    if (!rec || typeof rec !== "object") return;

    const metaByGroup: Record<string, any[]> =
      getConditionsByGroupNew(sourceForGroups);

    const conditionGroups = Object.entries(rec).map(
      ([groupKey, valueRecord]) => {
        const metaList = metaByGroup[groupKey] || [];

        const list = Object.keys(valueRecord as any).map((condName) => {
          const wrapper = (valueRecord as any)[condName];
          const meta =
            metaList.find((m: any) => m.conditionName === condName) || {};

          const how = normalizeHowToSet(
            (meta as any).howToSetTheCondition ?? wrapper?.howToSetTheCondition,
          );

          const fallback = (meta as any).value ?? defaultForHowToSet(how);

          const valueFromWrapper =
            wrapper && typeof wrapper === "object" && "value" in wrapper
              ? wrapper.value
              : wrapper;

          return {
            ...meta,
            ...(typeof wrapper === "object" && !Array.isArray(wrapper)
              ? wrapper
              : {}),
            conditionName: condName,
            value:
              valueFromWrapper !== undefined ? valueFromWrapper : fallback,
          };
        });

        return {
          ConditionGroupId: groupKey,
          conditionsThatEstablishesTheDecision: list,
        };
      },
    );

    const prev = (formik.values as any).conditionGroups;
    const nextJSON = JSON.stringify(conditionGroups);
    const prevJSON = JSON.stringify(prev ?? []);
    if (nextJSON !== prevJSON) {
      formik.setFieldValue("conditionGroups", conditionGroups, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values?.conditionsThatEstablishesTheDecision, sourceForGroups]);

  const visibleConditionsByGroupWithSentences: { [key: string]: any[] } =
    React.useMemo(() => {
      const keys = Object.keys(visibleConditionsByGroup);

      const ordered =
        primaryGroupKey != null
          ? [
              ...keys.filter((k) => k === primaryGroupKey),
              ...keys.filter((k) => k !== primaryGroupKey),
            ]
          : keys;

      const entries = ordered.map((g) => {
        const list = visibleConditionsByGroup[g] ?? [];

        const decorated = list.map((c: any, idx: number) => {
          const isFirstInGroup = idx === 0;

          const how = normalizeHowToSet(c.howToSetTheCondition);
          const sentence = buildEsConditionSentence({
            label: c.labelName || "",
            howToSet: how,
            isFirst: isFirstInGroup,
          });
          const unitAfter = c.timeUnit
            ? timeUnitHandle("", c.timeUnit, true).trim()
            : "";

          const scopedName = `${g}.${c.conditionName}`;

          const vFromArray = readFromConditionGroups(
            formik.values,
            g,
            c.conditionName,
          );
          const vFromRecord = readScopedRecord(
            formik.values,
            g,
            c.conditionName,
          );
          const currentVal =
            vFromArray !== undefined ? vFromArray : vFromRecord;
          const ensuredVal =
            currentVal !== undefined
              ? currentVal
              : defaultForHowToSet(how);

          return {
            ...c,
            __originalConditionName: c.conditionName,
            __groupKey: g,
            __howToSet: how,
            __scopedName: scopedName,
            conditionName: c.conditionName,
            groupKey: g,
            labelName: sentence,
            __unitAfterInput: unitAfter,
            value: ensuredVal,
          };
        });

        return [g, decorated] as const;
      });

      return Object.fromEntries(entries);
    }, [visibleConditionsByGroup, formik.values, primaryGroupKey]);

  const currentConditions =
    visibleConditionsByGroupWithSentences[activeGroupKey] ?? [];

  const visibleConditions =
    visibleConditionsByGroupWithSentences[primaryGroupKey ?? "group-primary"] ??
    [];

  const normalizedDecision = {
    decisionDataType: decision.decisionDataType,
    howToSetTheCondition: decision.howToSetTheDecision,
    labelName: decision.labelName,
    listOfPossibleValues: decision.listOfPossibleValues,
    ruleName: decision.ruleName,
    timeUnit: decision.timeUnit
      ? timeUnitHandle("", decision.timeUnit, true).trim()
      : "",
  };

  const startDirty = formik.submitCount > 0 || !!formik.touched.effectiveFrom;
  const endDirty = formik.submitCount > 0 || !!formik.touched.validUntil;

  const termStartStatus = startDirty
    ? formik.errors.effectiveFrom
      ? "invalid"
      : "valid"
    : undefined;

  const termEndStatus = endDirty
    ? formik.errors.validUntil
      ? "invalid"
      : "valid"
    : undefined;

  const firstConditionError: string | undefined = React.useMemo(() => {
    const raw = formik.errors.conditionsThatEstablishesTheDecision as any;
    if (!raw) return undefined;
    if (typeof raw === "string") return raw;
    const dfs = (obj: unknown): string | undefined => {
      if (!obj) return undefined;
      if (typeof obj === "string") return obj;
      if (Array.isArray(obj)) {
        for (const v of obj) {
          const r = dfs(v);
          if (r) return r;
        }
      } else if (typeof obj === "object") {
        for (const v of Object.values(obj as Record<string, unknown>)) {
          const r = dfs(v);
          if (r) return r;
        }
      }
      return undefined;
    };
    return dfs(raw);
  }, [formik.errors.conditionsThatEstablishesTheDecision]);

  const showConditionsError = formik.submitCount > 0 && !!firstConditionError;

  const getDefaultValueFor = (condition: any) => {
    const how =
      condition?.__howToSet ??
      normalizeHowToSet(condition?.howToSetTheCondition);
    return defaultForHowToSet(how);
  };

  const setBothShapes = (groupKey: string, originalName: string, val: any) => {
    const basePath = `conditionsThatEstablishesTheDecision.${groupKey}.${originalName}`;
    const currentWrapper =
      (formik.values as any)?.conditionsThatEstablishesTheDecision?.[groupKey]?.[
        originalName
      ];

    if (
      currentWrapper &&
      typeof currentWrapper === "object" &&
      !Array.isArray(currentWrapper)
    ) {
      formik.setFieldValue(`${basePath}.value`, val, false);
    } else {
      formik.setFieldValue(basePath, val, false);
    }

    const groups: any[] = (formik.values as any)?.conditionGroups;
    if (Array.isArray(groups)) {
      const gi = groups.findIndex((g) => g?.ConditionGroupId === groupKey);
      if (gi >= 0) {
        const ci =
          groups[gi].conditionsThatEstablishesTheDecision?.findIndex(
            (c: any) => c?.conditionName === originalName,
          );
        if (ci >= 0) {
          const clone = JSON.parse(JSON.stringify(groups));
          clone[gi].conditionsThatEstablishesTheDecision[ci].value = val;
          formik.setFieldValue("conditionGroups", clone, false);
        }
      }
    }
  };

  const handleClearCondition = (scopedConditionName: string) => {
    const [groupKey, ...rest] = scopedConditionName.split(".");
    const originalName = rest.join(".");
    const meta = Object.values(conditionsByGroupFull)
      .flat()
      .find((c: any) => c.conditionName === originalName);
    const defaultVal = getDefaultValueFor(meta || {});
    setBothShapes(groupKey, originalName, defaultVal);
    formik.setFieldTouched(
      `conditionsThatEstablishesTheDecision.${groupKey}.${originalName}`,
      false,
      false,
    );
  };

  const handleRedefineCurrentTab = () => {
    const rawCurrent = (conditionsByGroupFull[activeGroupKey] ?? []) as any[];
    rawCurrent.forEach((cond: any) => {
      const how = normalizeHowToSet(cond?.howToSetTheCondition);
      const val = defaultForHowToSet(how);
      setBothShapes(activeGroupKey, cond.conditionName, val);
    });
  };

  const [showRedefineConfirm, setShowRedefineConfirm] =
    React.useState(false);
  const openRedefineConfirm = () => setShowRedefineConfirm(true);
  const closeRedefineConfirm = () => setShowRedefineConfirm(false);

  const confirmRedefine = () => {
    handleRedefineCurrentTab();
    const allNamesInTab = (conditionsByGroupFull[activeGroupKey] ?? []).map(
      (condition: any) => `${activeGroupKey}.${condition.conditionName}`,
    );
    onRestoreConditions?.(allNamesInTab);
    setShowRedefineConfirm(false);
  };

  const handleRemoveCondition = (scopedConditionName: string) => {
    handleClearCondition(scopedConditionName);
    onRemoveCondition?.(scopedConditionName);
  };

  return (
    <RulesFormUI
      activeTab={activeTab}
      conditionsErrorText={firstConditionError}
      currentConditions={currentConditions}
      decision={decision}
      formik={formik}
      normalizedDecision={normalizedDecision}
      onCancel={onCancel!}
      onRedefineCurrentTab={handleRedefineCurrentTab}
      onTabChange={handleTabChange}
      onClearCondition={handleRemoveCondition}
      showConditionsError={showConditionsError}
      tabs={tabs}
      termEndStatus={termEndStatus}
      termStartStatus={termStartStatus}
      textValues={textValues}
      visibleConditions={visibleConditions}
      visibleConditionsByGroup={visibleConditionsByGroupWithSentences}
      handleToggleNoneChange={handleToggleNoneChange}
      portalId="redefine-confirm-portal"
      showRedefineConfirm={showRedefineConfirm}
      onOpenRedefineConfirm={openRedefineConfirm}
      onCloseRedefineConfirm={closeRedefineConfirm}
      onConfirmRedefine={confirmRedefine}
    />
  );
};

export { RulesForm };
