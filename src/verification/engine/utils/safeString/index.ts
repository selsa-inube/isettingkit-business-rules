import { safeStringify } from "../safeStringify";

function safeString(value: unknown) {
  if (value === null || value === undefined) return "";

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item === null || item === undefined) return "";
        if (typeof item === "string") return item;
        if (typeof item === "number" || typeof item === "boolean") return String(item);

        return safeStringify(item, 0);
      })
      .filter((v) => Boolean(String(v).trim()))
      .join(", ");
  }

  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  return safeStringify(value, 2);
}

export { safeString };