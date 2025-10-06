import { IRuleDecision } from "@isettingkit/input";

const normalizeDecisionGroups = (
  decision: IRuleDecision,
  defaultGroupId = "group-primary",
): IRuleDecision => {
  const legacy = decision.conditionsThatEstablishesTheDecision ?? [];

  const groupId =
    decision.conditionGroups?.ConditionGroupId ?? defaultGroupId;

  const grouped = decision.conditionGroups?.conditionsThatEstablishesTheDecision ?? [];

  const merged =
    (grouped?.length ? grouped : legacy) ?? [];

  const { conditionsThatEstablishesTheDecision, ...rest } = decision as any;
  console.log('normalizeDecisions', decision.conditionGroups )
  return {
    ...rest,
    conditionGroups: {
      ConditionGroupId: groupId,
      conditionsThatEstablishesTheDecision: merged,
    },
  };
};

export { normalizeDecisionGroups };