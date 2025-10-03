import { IValue } from "@isettingkit/input";

const parseRangeFromString = (
  value: string | number | string[] | IValue | undefined,
) => {
  if (typeof value !== "string") return value;

  const parts = value.split(";").map((part) => part.trim());

  const result: { from?: number; to?: number } = {};

  for (const part of parts) {
    if (part.startsWith(">")) {
      const num = parseFloat(part.slice(1));
      if (!isNaN(num)) result.from = num;
    } else if (part.startsWith("<")) {
      const num = parseFloat(part.slice(1));
      if (!isNaN(num)) result.to = num;
    }
  }

  return result.from !== undefined || result.to !== undefined ? result : value;
};

export { parseRangeFromString };
