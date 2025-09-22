const filterByGroup = <T>(
  obj: Record<string, T[]>,
  pred: (c: T) => boolean
): Record<string, T[]> =>
  Object.fromEntries(
    Object.entries(obj).map(([group, arr]) => [group, arr.filter(pred)])
  );

export { filterByGroup };