/* eslint-disable @typescript-eslint/no-explicit-any */
const readScopedRecord = (values: any, groupKey: string, originalName: string) =>
  values?.conditionsThatEstablishesTheDecision?.[groupKey]?.[originalName];

export { readScopedRecord };