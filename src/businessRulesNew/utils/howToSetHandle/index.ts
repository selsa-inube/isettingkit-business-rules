import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";

const howToSetHandle = (value: unknown | number, howToSetTheCondition: string) => {
  if (value === undefined || value === null) return "";
  const norm =
    Array.isArray(value)
      ? value.join(", ")
      : typeof value === "object" && value !== null
      ? JSON.stringify(value)
      : String(value ?? "");
  switch (howToSetTheCondition) {
    case EValueHowToSetUp.LESS_THAN:
      return `Menor a ${norm}`;
    case EValueHowToSetUp.GREATER_THAN:
      return `Mayor a ${norm}`;
    case EValueHowToSetUp.LIST_OF_VALUES:
      return value;
    case EValueHowToSetUp.LIST_OF_VALUES_MULTI:
      return value;
    default:
      return String(norm);
  }
};

export { howToSetHandle };