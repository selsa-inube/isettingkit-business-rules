/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { IBusinessRuleView } from "../types/BusinessRuleView";
import { BusinessRuleViewUI } from "./interface";
import { strategyFactoryHandlerManagerNew } from "./helper";
import { getConditionsByGroupNew } from "../helper/utils/getConditionsByGroup";
import { filterByGroup } from "../helper/utils/filterByGroup";
import { timeUnitHandle } from "../utils/timeUnitHandle";
import { howToSetHandle } from "../utils/howToSetHandle";
import { formatDateEsShort } from "../utils/formatDateEsShort";
import { conditionHasValue } from "../utils/conditionHasValue";
import { ITab } from "@inubekit/inubekit";
import { labelForGroup } from "../utils/labelForGroup";
import { buildListOfValuesValue } from "../utils/buildListOfValuesValue";

const BusinessRuleViewNew = (props: IBusinessRuleView) => {
  const {
    cardTitle = true,
    decision,
    loading = false,
    textValues,
    position,
    isOpen = false,
    onToggle,
    onEdit,
    onDelete,
    controls = true,
  } = props;

  const hasEffectiveFrom = Boolean(decision?.effectiveFrom);
  const hasValidUntil = Boolean(decision?.validUntil);

  const effectiveFromRenderer = hasEffectiveFrom
    ? {
        element: {
          labelName: textValues?.effectiveFrom,
          value: formatDateEsShort(decision!.effectiveFrom),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManagerNew({
          labelName: textValues?.effectiveFrom,
          value: formatDateEsShort(decision!.effectiveFrom),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;

  const validUntilRenderer = hasValidUntil
    ? {
        element: {
          labelName: textValues?.validUntil,
          value: formatDateEsShort(decision!.validUntil),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManagerNew({
          labelName: textValues?.validUntil,
          value: formatDateEsShort(decision!.validUntil),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;


  const resolvedHowToSet =
  decision?.howToSetTheDecision || ValueHowToSetUp.EQUAL;

const mappedDecisionValue =
  decision &&
  (resolvedHowToSet === "ListOfValues" ||
    resolvedHowToSet === "ListOfValuesMulti")
    ? buildListOfValuesValue(decision as IRuleDecision).list
    : strategyFactoryHandlerManagerNew(decision as IRuleDecision);

  const decisionMapper: Partial<IRuleDecision> | null = decision
    ? {
        labelName: cardTitle ? decision.labelName || "" : "",
        decisionDataType:
          decision.decisionDataType || ValueDataType.ALPHABETICAL,
        value: mappedDecisionValue,
        howToSetTheDecision: resolvedHowToSet,
        validUntil: decision.validUntil,
      }
    : null;

  const rawByGroup = React.useMemo(
    () => (decision ? getConditionsByGroupNew(decision) : {}),
    [decision]
  );

  const naturalKeys: string[] =
    ((decision as any)?.conditionGroups as any[] | undefined)
      ?.map((g) => g?.ConditionGroupId)
      ?.filter(Boolean) || Object.keys(rawByGroup);

  const primaryKey = naturalKeys[0] || "group-primary";

  const normalizedByGroup: Record<string, any[]> = React.useMemo(() => {
    const out: Record<string, any[]> = {};
    const incomingPrimary = rawByGroup[primaryKey] || [];
    const existingPrimary = rawByGroup["group-primary"] || [];

    out["group-primary"] =
      primaryKey === "group-primary"
        ? existingPrimary
        : [...incomingPrimary, ...existingPrimary];

    for (const k of naturalKeys) {
      if (!k || k === primaryKey) continue;
      if (k === "group-primary") continue;
      if (rawByGroup[k]) out[k] = rawByGroup[k];
    }

    for (const k of Object.keys(rawByGroup)) {
      if (k === "group-primary" || k === primaryKey) continue;
      if (!(k in out)) out[k] = rawByGroup[k];
    }

    return out;
  }, [rawByGroup, primaryKey, naturalKeys]);

  const processedConditionsForDisplay = React.useMemo(() => {
    const result: Record<string, any[]> = {};

    Object.keys(normalizedByGroup).forEach((groupKey) => {
      const groupConditions = normalizedByGroup[groupKey];

      if (groupConditions && Array.isArray(groupConditions)) {
        result[groupKey] = groupConditions.map((condition) => {
          let newLabel = condition.labelName;
          if (condition.timeUnit && condition.labelName) {
            newLabel = timeUnitHandle(condition.labelName, condition.timeUnit);
          }

          let newValue = condition.value;
          if (
            condition?.howToSetTheCondition !== undefined &&
            condition?.howToSetTheCondition !== null &&
            condition?.value !== undefined &&
            condition?.value !== null && condition?.value !== ""
          ) {
            newValue = howToSetHandle(
              condition.value,
              condition.howToSetTheCondition
            );
          }

          return {
            ...condition,
            labelName: newLabel,
            value: newValue,
          };
        });
      } else {
        result[groupKey] = groupConditions;
      }
    });

    return result;
  }, [normalizedByGroup]);

  const visibleByGroup = filterByGroup(
    processedConditionsForDisplay,
    (c: any) => !c.hidden
  );

  const nonEmptyByGroup: Record<string, any[]> = React.useMemo(() => {
    const entries: [string, any[]][] = Object.entries(visibleByGroup).map(
      ([g, list]) =>
        [g, (list as any[]).filter(conditionHasValue)] as [string, any[]]
    );
    const pruned: Record<string, any[]> = {};
    for (const [g, list] of entries) {
      if (list.length > 0) pruned[g] = list;
    }
    return pruned;
  }, [visibleByGroup]);

  const orderedGroupKeys = React.useMemo(() => {
    const keys = Object.keys(nonEmptyByGroup);
    return keys.includes("group-primary")
      ? ["group-primary", ...keys.filter((k) => k !== "group-primary")]
      : keys;
  }, [nonEmptyByGroup]);

  const tabIdByGroup: Record<string, string> = {};
  const groupByTabId: Record<string, string> = {};

  let altIndex = 1;
  const tabs: ITab[] = orderedGroupKeys.map((groupKey) => {
    const tabId =
      groupKey === "group-primary"
        ? "mainCondition"
        : `alternateCondition-${altIndex++}`;
    tabIdByGroup[groupKey] = tabId;
    groupByTabId[tabId] = groupKey;
    return {
      id: tabId,
      label:
        groupKey === "group-primary"
          ? labelForGroup(groupKey, 0)
          : labelForGroup(groupKey, Number(tabId.split("-").at(-1))),
      isDisabled: false,
    };
  });

  const [activeTab, setActiveTab] = React.useState<string>(
    tabs[0]?.id ?? "mainCondition"
  );
  const handleTabChange = (id: string) => setActiveTab(id);

  const activeGroupKey =
    groupByTabId[activeTab] ?? orderedGroupKeys[0] ?? "group-primary";

  const currentConditions = (nonEmptyByGroup[activeGroupKey] ?? []) as any[];
  const hasMultipleGroups = orderedGroupKeys.length > 1;

  const skeleton = Array.from({ length: 5 });
  const loadingValidation = Boolean(
    !loading && decision && textValues && decisionMapper
  );

  const conditionsAlignment =
    currentConditions.length < 2 ? "start" : "space-between";
  const tagLabel = `N° ${String((position ?? 0) + 1).padStart(2, "0")}`;

  return (
    <BusinessRuleViewUI
      conditionsAlignment={conditionsAlignment}
      controls={controls}
      decision={decision}
      decisionMapper={decisionMapper}
      loading={loadingValidation}
      skeleton={skeleton}
      textValues={textValues}
      tagLabel={tagLabel}
      isOpen={isOpen}
      onToggle={onToggle}
      hasEffectiveFrom={hasEffectiveFrom}
      hasValidUntil={hasValidUntil}
      effectiveFromRenderer={effectiveFromRenderer}
      validUntilRenderer={validUntilRenderer}
      onEdit={onEdit}
      onDelete={onDelete}
      tabs={tabs}
      selectedTab={activeTab}
      onTabChange={handleTabChange}
      currentConditions={currentConditions}
      hasMultipleGroups={hasMultipleGroups}
    />
  );
};

export { BusinessRuleViewNew };
