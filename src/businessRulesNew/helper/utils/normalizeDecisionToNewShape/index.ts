/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConditionsByGroup } from "../getConditionsByGroup";
import { groupsRecordToArray } from "../groupsRecordToArray";

const normalizeDecisionToNewShape = <T extends { [k: string]: any }>(
  decision: T,
): T => {
  const groups = getConditionsByGroup(decision);
  const normalized = {
    ...decision,
    conditionGroups: groupsRecordToArray(groups),
  } as T;

  delete (normalized as any).conditionsThatEstablishesTheDecision;
  return normalized;
};

export {normalizeDecisionToNewShape};