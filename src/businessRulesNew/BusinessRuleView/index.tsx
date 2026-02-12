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
    editionMode = "versioned",
    withEditOption = true,
  } = props;

  const enhancedDecision = React.useMemo(() => {
    if (!decision) return null;

    const { howToSetTheDecision, decisionDataType, value } = decision;

    const isPercentageRangeDecision =
      howToSetTheDecision === ValueHowToSetUp.RANGE &&
      decisionDataType === ValueDataType.PERCENTAGE &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "from" in value &&
      "to" in value;

    if (!isPercentageRangeDecision) {
      return decision;
    }

    const { from, to } = value as {
      from: number | string;
      to: number | string;
    };

    const fromStr = String(from).trim();
    const toStr = String(to).trim();

    return {
      ...decision,
      i18nValue: `De ${fromStr}% a ${toStr}%`,
    } as IRuleDecision & { i18nValue: string };
  }, [decision]);

  const decisionToUse = enhancedDecision ?? decision;

  const hasEffectiveFrom = Boolean(decisionToUse?.effectiveFrom);
  const hasValidUntil = Boolean(decisionToUse?.validUntil);

  const effectiveFromRenderer = hasEffectiveFrom
    ? {
        element: {
          labelName: textValues?.effectiveFrom,
          value: formatDateEsShort(decisionToUse!.effectiveFrom),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManagerNew({
          labelName: textValues?.effectiveFrom,
          value: formatDateEsShort(decisionToUse!.effectiveFrom),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;

  const validUntilRenderer = hasValidUntil
    ? {
        element: {
          labelName: textValues?.validUntil,
          value: formatDateEsShort(decisionToUse!.validUntil),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManagerNew({
          labelName: textValues?.validUntil,
          value: formatDateEsShort(decisionToUse!.validUntil),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;

  const resolvedHowToSet =
    decisionToUse?.howToSetTheDecision || ValueHowToSetUp.EQUAL;

  const isRangeWithSameEnds =
    resolvedHowToSet === ValueHowToSetUp.RANGE &&
    decisionToUse &&
    decisionToUse.value &&
    typeof decisionToUse.value === "object" &&
    "from" in (decisionToUse.value as any) &&
    "to" in (decisionToUse.value as any) &&
    (decisionToUse.value as any).from === (decisionToUse.value as any).to;

  const isListOfValues =
    resolvedHowToSet === ValueHowToSetUp.LIST_OF_VALUES ||
    resolvedHowToSet === ValueHowToSetUp.LIST_OF_VALUES_MULTI;

  const mappedDecisionValue =
    decisionToUse &&
    (isListOfValues
      ? buildListOfValuesValue(decisionToUse as IRuleDecision).list
      : (() => {
          const i18nValue = (decisionToUse as any).i18nValue as
            | string
            | undefined;

          if (isRangeWithSameEnds) {
            const { from } = decisionToUse.value as { from: any; to: any };

            const formattedSingleValue = strategyFactoryHandlerManagerNew({
              ...(decisionToUse as IRuleDecision),
              howToSetTheDecision: ValueHowToSetUp.EQUAL,
              value: from,
            } as IRuleDecision);

            const suffix =
              decisionToUse.decisionDataType === ValueDataType.PERCENTAGE
                ? "%"
                : "";

            return `Del ${formattedSingleValue}${suffix}`.trim();
          }

          const rawValue = strategyFactoryHandlerManagerNew(
            decisionToUse as IRuleDecision,
          );

          let baseValue = i18nValue ?? rawValue;

          if (
            decisionToUse?.decisionDataType === ValueDataType.PERCENTAGE &&
            typeof baseValue === "string" &&
            !baseValue.includes("%")
          ) {
            baseValue = `${baseValue}%`;
          }

          if (
            decisionToUse?.decisionDataType === ValueDataType.PERCENTAGE &&
            typeof baseValue === "number"
          ) {
            baseValue = `${baseValue}%`;
          }
          return baseValue;
        })());

  const decisionMapper: Partial<IRuleDecision> | null = decisionToUse
    ? {
        labelName: cardTitle ? decisionToUse.labelName || "" : "",
        decisionDataType:
          decisionToUse.decisionDataType || ValueDataType.ALPHABETICAL,
        value: mappedDecisionValue,
        howToSetTheDecision:
          (decisionToUse as any).i18nValue || isRangeWithSameEnds
            ? ValueHowToSetUp.EQUAL
            : resolvedHowToSet,
        validUntil: decisionToUse.validUntil,
      }
    : null;

  const rawByGroup = React.useMemo(
    () => (decisionToUse ? getConditionsByGroupNew(decisionToUse) : {}),
    [decisionToUse],
  );

  const naturalKeys: string[] =
    ((decisionToUse as any)?.conditionGroups as any[] | undefined)
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

          const isPercentageRangeCondition =
            condition?.howToSetTheCondition === ValueHowToSetUp.RANGE &&
            condition?.conditionDataType === ValueDataType.PERCENTAGE &&
            condition?.value &&
            typeof condition.value === "object" &&
            !Array.isArray(condition.value) &&
            "from" in condition.value &&
            "to" in condition.value;

          if (isPercentageRangeCondition) {
            const { from, to } = condition.value as {
              from: number | string;
              to: number | string;
            };

            const fromStr = String(from).trim();
            const toStr = String(to).trim();

            newValue = `De ${fromStr}% a ${toStr}%`;

            return {
              ...condition,
              labelName: newLabel,
              value: newValue,
              howToSetTheCondition: ValueHowToSetUp.EQUAL,
            };
          }

          const isPercentageGreaterThanCondition =
            condition?.howToSetTheCondition === ValueHowToSetUp.GREATER_THAN &&
            condition?.conditionDataType === ValueDataType.PERCENTAGE &&
            condition?.value !== undefined &&
            condition?.value !== null &&
            condition?.value !== "";

          if (isPercentageGreaterThanCondition) {
            const raw = condition.value as number | string;
            const valueStr = String(raw).trim();

            newValue = `Mayor a ${valueStr}%`;

            return {
              ...condition,
              labelName: newLabel,
              value: newValue,
              howToSetTheCondition: ValueHowToSetUp.EQUAL,
            };
          }

          const isPercentageLessThanCondition =
            condition?.howToSetTheCondition === ValueHowToSetUp.LESS_THAN &&
            condition?.conditionDataType === ValueDataType.PERCENTAGE &&
            condition?.value !== undefined &&
            condition?.value !== null &&
            condition?.value !== "";

          if (isPercentageLessThanCondition) {
            const raw = condition.value as number | string;
            const valueStr = String(raw).trim();

            newValue = `Menor a ${valueStr}%`;

            return {
              ...condition,
              labelName: newLabel,
              value: newValue,
              howToSetTheCondition: ValueHowToSetUp.EQUAL,
            };
          }

          if (
            condition?.howToSetTheCondition !== undefined &&
            condition?.howToSetTheCondition !== null &&
            condition?.value !== undefined &&
            condition?.value !== null &&
            condition?.value !== ""
          ) {
            if (condition.i18nValue) {
              newValue = howToSetHandle(
                condition.i18nValue,
                condition.i18nValue
                  ? ValueHowToSetUp.EQUAL
                  : condition.howToSetTheCondition,
              );
            } else {
              newValue = howToSetHandle(
                condition.value,
                condition.howToSetTheCondition,
              );
            }
          }

          if (
            condition?.conditionDataType === ValueDataType.PERCENTAGE &&
            typeof newValue === "string" &&
            !newValue.includes("%")
          ) {
            newValue = `${newValue}%`;
          }

          return {
            ...condition,
            labelName: newLabel,
            value: newValue,
            howToSetTheCondition: condition.i18nValue
              ? ValueHowToSetUp.EQUAL
              : condition.howToSetTheCondition,
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
    (c: any) => !c.hidden,
  );

  const nonEmptyByGroup: Record<string, any[]> = React.useMemo(() => {
    const entries: [string, any[]][] = Object.entries(visibleByGroup).map(
      ([g, list]) =>
        [g, (list as any[]).filter(conditionHasValue)] as [string, any[]],
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
    tabs[0]?.id ?? "mainCondition",
  );
  const handleTabChange = (id: string) => setActiveTab(id);

  const activeGroupKey =
    groupByTabId[activeTab] ?? orderedGroupKeys[0] ?? "group-primary";

  const currentConditions = (nonEmptyByGroup[activeGroupKey] ?? []) as any[];
  const hasMultipleGroups = orderedGroupKeys.length > 1;

  const skeleton = Array.from({ length: 5 });
  const loadingValidation = Boolean(
    !loading && decisionToUse && textValues && decisionMapper,
  );

  const conditionsAlignment =
    currentConditions.length < 2 ? "start" : "space-between";
  const tagLabel = `N° ${String((position ?? 0) + 1).padStart(2, "0")}`;

  return (
    <BusinessRuleViewUI
      conditionsAlignment={conditionsAlignment}
      controls={controls}
      decision={decisionToUse}
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
      editionMode={editionMode}
      withEditOption={withEditOption}
    />
  );
};

export { BusinessRuleViewNew };
