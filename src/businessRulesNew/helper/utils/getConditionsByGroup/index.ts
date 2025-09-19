import { IRuleDecision } from "@isettingkit/input";

const getConditionsByGroup = (
  decision: IRuleDecision
) =>
  decision.conditionsThatEstablishesTheDecision ?? {};


export { getConditionsByGroup };