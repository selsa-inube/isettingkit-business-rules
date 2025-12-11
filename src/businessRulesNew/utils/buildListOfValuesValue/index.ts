/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";

const buildListOfValuesValue = (decision: IRuleDecision) => {
  const allOptions = decision.listOfPossibleValues?.list ?? [];
  const rawValue = decision.value;

  const selectedValues = Array.isArray(rawValue) ? rawValue : [rawValue];

  const list = allOptions
    .filter((option: any) => selectedValues.includes(option.value))
    .map((option: any, index: number) => ({
      id: option.id ?? `value-${index + 1}`,
      label: option.label,
      value: option.label,
    }));

  return { list: list[0]?.label ?? ""};
};

export { buildListOfValuesValue };