/* eslint-disable @typescript-eslint/no-explicit-any */

import { defaultStrategy } from "../strategies/defaultStrategy";
import { strategyFormFactoryHandlerManager } from "../utils";

const typeData = (element: any) => {
  if (!element || typeof element !== "object") {
    console.warn("typeData: Invalid element", element);
    return defaultStrategy;
  }
  if (
    "value" in element &&
    "valueUse" in element &&
    element.value !== undefined
  ) {
    const strategy = strategyFormFactoryHandlerManager(element.valueUse);
    if (strategy) {
      return strategy(
        element.value,
        "dataType" in element ? element.dataType : undefined,
      );
    }
  }
  console.warn("typeData: Default strategy applied for", element);
  return defaultStrategy(element.value || "");
};

export { typeData };
