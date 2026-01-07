function safeArrayToText(arr: unknown[]) {
  return arr
    .map((x) => {
      if (x === null || x === undefined) return "";
      if (typeof x === "string") return x;
      if (typeof x === "number" || typeof x === "boolean") return String(x);
      try {
        return JSON.stringify(x);
      } catch {
        return String(x);
      }
    })
    .filter(Boolean)
    .join(", ");
}

export { safeArrayToText };