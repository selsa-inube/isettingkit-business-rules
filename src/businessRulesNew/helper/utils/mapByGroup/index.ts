const mapByGroup = <T, R>(
  obj: Record<string, T[]>,
  fn: (c: T, idx: number, arr: T[], group: string) => R
): Record<string, R[]> =>
  Object.fromEntries(
    Object.entries(obj).map(([group, arr]) => [
      group,
      arr.map((c, i, a) => fn(c, i, a, group)),
    ])
  );

export { mapByGroup };