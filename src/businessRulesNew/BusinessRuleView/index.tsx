/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const visibleConditions = Object.values(visibleByGroup).flat();

  const skeleton = Array.from({ length: 5 });
  const loadingValidation = Boolean(
    !loading && decision && textValues && decisionMapper
  );

  const conditionsAlignment =
    visibleConditions.length < 2 ? "start" : "space-between";
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
      visibleConditions={visibleConditions}
      tagLabel={tagLabel}
      isOpen={isOpen}
      onToggle={onToggle}
      hasEffectiveFrom={hasEffectiveFrom}
      hasValidUntil={hasValidUntil}
      effectiveFromRenderer={effectiveFromRenderer}
      validUntilRenderer={validUntilRenderer}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export { BusinessRuleViewNew };
