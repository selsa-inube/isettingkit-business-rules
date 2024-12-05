/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultStrategy } from "./strategies/DefaultStrategy";
import { getStrategy } from "./utils";

const typeData = (element: any) => {
  if (!element || typeof element !== "object") {
    console.warn("typeData: Invalid element", element);
    return DefaultStrategy;
  }
  if (
    "value" in element &&
    "valueUse" in element &&
    element.value !== undefined
  ) {
    const strategy = getStrategy(element.valueUse);
    if (strategy) {
      return strategy(
        element.value,
        "dataType" in element ? element.dataType : undefined,
      );
    }
  }
  console.warn("typeData: Default strategy applied for", element);
  return DefaultStrategy(element.value || "");
};

export { typeData };
