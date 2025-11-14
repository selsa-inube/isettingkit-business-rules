/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "../getConditionsByGroup";
import { groupsRecordToArrayNew } from "../groupsRecordToArray";

const normalizeDecisionToNewShape = (decision: any) => {
  const groups = getConditionsByGroupNew(decision);
  return {
    ...decision,
    conditionGroups: groupsRecordToArrayNew(groups), // UI-only
    conditionsThatEstablishesTheDecision: groups,    // preserve full structure
  };
};

export {normalizeDecisionToNewShape};