const flatFromGroups = <T>(obj: Record<string, T[]>): T[] =>
  Object.values(obj).flat();

export { flatFromGroups };