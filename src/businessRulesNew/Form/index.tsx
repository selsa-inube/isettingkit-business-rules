/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRulesFormUtils } from "./utils";
import { RulesFormUI } from "./interface";
import { IRulesForm } from "../types/Forms/IRulesForm";
import { getConditionsByGroup } from "../helper/utils/getConditionsByGroup";
import { filterByGroup } from "../helper/utils/filterByGroup";
import React from "react";
import { IRuleDecision } from "@isettingkit/input";

type TTab = { id: string; label: string; isDisabled?: boolean };

type TRulesFormExtraProps = {
  onRemoveCondition?: (conditionName: string) => void;
  onRestoreConditions?: (conditionNames: string[]) => void;
  fullTemplate?: IRuleDecision;
};

const labelForGroup = (groupKey: string, indexAlt: number) => {
  if (groupKey === "group-primary") return "Condición principal";
  return `Condición alterna N° ${String(indexAlt).padStart(2, "0")}`;
};

const RulesForm = (props: IRulesForm & TRulesFormExtraProps) => {
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
    getConditionsByGroup(sourceForGroups);

  const conditionsByGroupVisible = getConditionsByGroup(decision);
  const visibleConditionsByGroup = filterByGroup(
    conditionsByGroupVisible,
    (condition: any) => !condition.hidden,
  );

  const groupKeys = Object.keys(visibleConditionsByGroup);
  const orderedGroupKeys = [
    ...groupKeys.filter((key) => key === "group-primary"),
    ...groupKeys.filter((key) => key !== "group-primary"),
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
  const currentConditions = visibleConditionsByGroup[activeGroupKey] ?? [];
  const visibleConditions = visibleConditionsByGroup["group-primary"] ?? [];

  const normalizedDecision = {
    decisionDataType: decision.decisionDataType,
    howToSetTheCondition: decision.howToSetTheDecision,
    labelName: decision.labelName,
    listOfPossibleValues: decision.listOfPossibleValues,
    ruleName: decision.ruleName,
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
    if (
      condition?.isMulti ||
      condition?.multiple ||
      condition?.valueUse === "Among"
    ) {
      return [];
    }
    return "";
  };

  const handleClearCondition = (conditionName: string) => {
    const all = Object.values(conditionsByGroupFull).flat() as any[];
    const cond = all.find((c) => c.conditionName === conditionName);
    const defaultVal = getDefaultValueFor(cond);
    formik.setFieldValue(
      `conditionsThatEstablishesTheDecision.${conditionName}`,
      defaultVal,
    );
    formik.setFieldTouched(
      `conditionsThatEstablishesTheDecision.${conditionName}`,
      false,
      false,
    );
  };

  const handleRedefineCurrentTab = () => {
    currentConditions.forEach((cond: any) => {
      const path = `conditionsThatEstablishesTheDecision.${cond.conditionName}`;
      formik.setFieldValue(path, getDefaultValueFor(cond));
      formik.setFieldTouched(path, false, false);
    });
  };

  const [showRedefineConfirm, setShowRedefineConfirm] = React.useState(false);
  const openRedefineConfirm = () => setShowRedefineConfirm(true);
  const closeRedefineConfirm = () => setShowRedefineConfirm(false);

  const confirmRedefine = () => {
    handleRedefineCurrentTab();
    const allNamesInTab = (conditionsByGroupFull[activeGroupKey] ?? []).map(
      (condition: any) => condition.conditionName,
    );
    onRestoreConditions?.(allNamesInTab);
    setShowRedefineConfirm(false);
  };

  const handleRemoveCondition = (conditionName: string) => {
    handleClearCondition(conditionName);
    onRemoveCondition?.(conditionName);
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
      visibleConditionsByGroup={visibleConditionsByGroup}
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
