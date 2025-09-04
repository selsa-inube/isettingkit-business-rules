import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { IBusinessRuleView } from "../types/BusinessRuleView";
import { BusinessRuleViewUI } from "./interface";
import { strategyFactoryHandlerManager } from "./helper";

const BusinessRuleViewNew = (props: IBusinessRuleView) => {
  const {
    decision,
    loading = false,
    textValues,
    position,
    isOpen = false,
    onToggle,
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
          value: String(decision!.validUntil),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        },
        valueData: strategyFactoryHandlerManager({
          labelName: textValues?.validUntil,
          value: String(decision!.validUntil),
          howToSetTheDecision: ValueHowToSetUp.EQUAL,
          decisionDataType: ValueDataType.DATE,
        }),
      }
    : null;

  const decisionMapper: IRuleDecision | null = decision
    ? {
        labelName: decision.labelName || "",
        decisionDataType: decision.decisionDataType || "alphabetical",
        value: strategyFactoryHandlerManager(decision),
        howToSetTheDecision: decision.howToSetTheDecision || "EqualTo",
      }
    : null;

  const visibleConditions =
    decision?.conditionsThatEstablishesTheDecision?.filter(
      (condition) => !condition.hidden,
    ) || [];
  const skeleton = Array.from({ length: 5 });
  const loadingValidation = Boolean(
    !loading && decision && textValues && decisionMapper,
  );

  const conditionsAlignment =
    visibleConditions!.length < 2 ? "start" : "space-between";
  const tagLabel = `N° ${String((position ?? 0) + 1).padStart(2, "0")}`;

  return (
    <BusinessRuleViewUI
      conditionsAlignment={conditionsAlignment}
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
    />
  );
};

export { BusinessRuleViewNew };
