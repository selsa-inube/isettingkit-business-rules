import { isRecordOfArrays, uniqByConditionName } from "../uniqByConditionName";

/* eslint-disable @typescript-eslint/no-explicit-any */
const getConditionsByGroupNew = (raw: any): Record<string, any[]> => {
  if (!raw) return {};

  if (Array.isArray(raw.conditionGroups)) {
    const entries = raw.conditionGroups.map((g: any) => [
      g.ConditionGroupId,
      uniqByConditionName(
        Array.isArray(g.conditionsThatEstablishesTheDecision)
          ? g.conditionsThatEstablishesTheDecision
          : [],
      ),
    ]);
    return Object.fromEntries(entries);
  }

  if (isRecordOfArrays(raw.conditionsThatEstablishesTheDecision)) {
    const rec = raw.conditionsThatEstablishesTheDecision;
    return Object.fromEntries(
      Object.entries(rec).map(([k, v]) => [k, uniqByConditionName(v as any[])]),
    );
  }

  if (isRecordOfArrays(raw)) {
    return Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, uniqByConditionName(v as any[])]),
    );
  }

  return {};
};

export {getConditionsByGroupNew};