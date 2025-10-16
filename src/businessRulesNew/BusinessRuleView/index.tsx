/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { IBusinessRuleView } from "../types/BusinessRuleView";
import { BusinessRuleViewUI } from "./interface";
import { strategyFactoryHandlerManager } from "./helper";
import { getConditionsByGroup } from "../helper/utils/getConditionsByGroup";
import { filterByGroup } from "../helper/utils/filterByGroup";

type TTab = { id: string; label: string; isDisabled?: boolean };

const labelForGroup = (groupKey: string, indexAlt: number) => {
  if (groupKey === "group-primary") return "Condición principal";
  return `Condición alterna N° ${String(indexAlt).padStart(2, "0")}`;
};

const BusinessRuleViewNew = (props: IBusinessRuleView) => {
  const {
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
          value: String(decision!.effectiveFrom),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManager({
          labelName: textValues?.effectiveFrom,
          value: String(decision!.effectiveFrom),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;

  const validUntilRenderer = hasValidUntil
    ? {
        element: {
          labelName: textValues?.validUntil,
          value:
            decision!.validUntil instanceof Date
              ? decision!.validUntil.toISOString()
              : decision!.validUntil,
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManager({
          labelName: textValues?.validUntil,
          value:
            decision!.validUntil instanceof Date
              ? decision!.validUntil.toISOString()
              : decision!.validUntil,
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;

  const decisionMapper: Partial<IRuleDecision> | null = decision
    ? {
        labelName: decision.labelName || "",
        decisionDataType:
          decision.decisionDataType || ValueDataType.ALPHABETICAL,
        value: strategyFactoryHandlerManager(decision),
        howToSetTheDecision:
          decision.howToSetTheDecision || ValueHowToSetUp.EQUAL,
      }
    : null;

  const byGroup = decision ? getConditionsByGroup(decision) : {};
  const visibleByGroup = filterByGroup(byGroup, (c: any) => !c.hidden);

  const groupKeys = Object.keys(visibleByGroup);
  const orderedGroupKeys = [
    ...groupKeys.filter((k) => k === "group-primary"),
    ...groupKeys.filter((k) => k !== "group-primary"),
  ];

  const tabIdByGroup: Record<string, string> = {};
  const groupByTabId: Record<string, string> = {};

  let altIndex = 1;
  const tabs: TTab[] = orderedGroupKeys.map((groupKey) => {
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
  const activeGroupKey = groupByTabId[activeTab] ?? "group-primary";

  const currentConditions = (visibleByGroup[activeGroupKey] ?? []) as any[];
  const hasMultipleGroups = orderedGroupKeys.length > 1;

  const skeleton = Array.from({ length: 5 });
  const loadingValidation = Boolean(
    !loading && decision && textValues && decisionMapper,
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
