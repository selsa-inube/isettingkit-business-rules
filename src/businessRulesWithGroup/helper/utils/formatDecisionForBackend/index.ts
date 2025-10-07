/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { convertRangeToString } from "../convertRangeToString";

const formatDecisionForBackend = (props: {
  decision: IRuleDecision;
  fallbackId: string;
  template: IRuleDecision;
}) => {
  const { decision, fallbackId, template } = props;
  const formatValue = (val: any) => {
    if (
      typeof val === "object" &&
      val !== null &&
      "from" in val &&
      "to" in val
    ) {
      return convertRangeToString(val);
    }
    return val;
  };

  const formattedConditions: any =
    decision.conditionsThatEstablishesTheDecision
      ?.map((incomingCondition, index) => {
        const val = incomingCondition?.value;

        const isEmpty =
          val === undefined ||
          val === null ||
          (typeof val === "string" && val.trim() === "") ||
          (Array.isArray(val) && val.length === 0);

        if (isEmpty) return null;

        return {
          ...template.conditionsThatEstablishesTheDecision?.[index],
          ...incomingCondition,
          value: formatValue(val)
        };
      })
      .filter(Boolean) ?? [];
  return {
    ...template,
    ...decision,
    decisionId: fallbackId,
    value: formatValue(decision.value),
    conditionsThatEstablishesTheDecision: formattedConditions,
  };
};

export { formatDecisionForBackend };
