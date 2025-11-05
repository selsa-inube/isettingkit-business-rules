/* eslint-disable @typescript-eslint/no-explicit-any */

const readFromConditionGroups = (values: any, groupKey: string, originalName: string) => {
  const groups: any[] = values?.conditionGroups;
  if (!Array.isArray(groups)) return undefined;
  const g = groups.find((x) => x?.ConditionGroupId === groupKey);
  if (!g?.conditionsThatEstablishesTheDecision) return undefined;
  const c = g.conditionsThatEstablishesTheDecision.find(
    (x: any) => x?.conditionName === originalName
  );
  return c?.value;
};

 export { readFromConditionGroups };