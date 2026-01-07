function safeStringify(value: unknown, space = 2) {
  const seen = new WeakSet<object>();

  try {
    return JSON.stringify(
      value,
      (_key, v) => {
        if (typeof v === "object" && v !== null) {
          if (seen.has(v)) return "[Circular]";
          seen.add(v);
        }
        return v;
      },
      space,
    );
  } catch {
    return String(value);
  }
}

export { safeStringify };