import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { IBusinessRuleView } from "../types/BusinessRuleView";
import { BusinessRuleViewUI } from "./interface";
import { strategyFactoryHandlerManager } from "./helper";

const BusinessRuleView = (props: IBusinessRuleView) => {
  const { decision, loading = false, textValues } = props;

  const hasEffectiveFrom = Boolean(decision?.effectiveFrom);
  const hasValidUntil = Boolean(decision?.validUntil);

  const decisionDateElement =
    hasEffectiveFrom && hasValidUntil
      ? {
          element: {
            labelName: textValues?.terms,
            value: String(decision!.effectiveFrom),
            howToSetTheDecision: ValueHowToSetUp.RANGE,
            decisionDataType: ValueDataType.DATE,
          },
          valueData: strategyFactoryHandlerManager({
            labelName: textValues?.terms,
            value: {
              from: String(decision!.effectiveFrom),
              to: String(decision!.validUntil),
            },
            howToSetTheDecision: ValueHowToSetUp.RANGE,
            decisionDataType: ValueDataType.DATE,
          }),
        }
      : hasEffectiveFrom && !hasValidUntil
        ? {
            element: {
              labelName: textValues?.terms,
              value: String(decision!.effectiveFrom),
              howToSetTheDecision: ValueHowToSetUp.EQUAL,
              decisionDataType: ValueDataType.DATE,
            },
            valueData: strategyFactoryHandlerManager({
              labelName: textValues?.terms,
              value: String(decision!.effectiveFrom),
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
  return (
    <BusinessRuleViewUI
      loading={loadingValidation}
      textValues={textValues}
      decision={decision}
      decisionMapper={decisionMapper}
      visibleConditions={visibleConditions}
      decisionDateElement={decisionDateElement}
      skeleton={skeleton}
    />
  );
};

export { BusinessRuleView };
