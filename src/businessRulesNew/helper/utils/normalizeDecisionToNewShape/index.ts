/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroupNew } from "../getConditionsByGroup";
import { groupsRecordToArrayNew } from "../groupsRecordToArray";

const normalizeDecisionToNewShape = <T extends { [k: string]: any }>(
  decision: T,
): T => {
  const groups = getConditionsByGroupNew(decision);
  const normalized = {
    ...decision,
    conditionGroups: groupsRecordToArrayNew(groups),
  } as T;

  delete (normalized as any).conditionsThatEstablishesTheDecision;
  return normalized;
};

export {normalizeDecisionToNewShape};