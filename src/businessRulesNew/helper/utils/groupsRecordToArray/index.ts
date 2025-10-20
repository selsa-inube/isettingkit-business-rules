/* eslint-disable @typescript-eslint/no-explicit-any */
import { uniqByConditionName } from "../uniqByConditionName";

const groupsRecordToArrayNew = (record: Record<string, any[]>) =>
  Object.entries(record).map(([ConditionGroupId, list]) => ({
    ConditionGroupId,
    conditionsThatEstablishesTheDecision: uniqByConditionName(list),
  }));

export {groupsRecordToArrayNew};