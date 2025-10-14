import { IRuleDecision } from "@isettingkit/input";
import { fallbackHandler } from "./utils/handlers/fallbackHandler";
import { handlers } from "./utils/handlers";
import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";

const strategyFactoryHandlerManager = (element: IRuleDecision) => {
  const valueData = element?.value;

  if (
    typeof valueData === "string" &&
    valueData.startsWith("De ") &&
    valueData.includes(" a ")
  ) {
    const match = valueData.match(/De\s+(\d+)\s+a\s+(\d+)/);
    if (match) {
      const from = match[1];
      const to = match[2];
      return { from, to };
    }
    return valueData;
  }

  if (
    typeof valueData === "object" &&
    valueData !== null &&
    !Array.isArray(valueData)
  ) {
    const handler =
      handlers[element?.howToSetTheDecision as EValueHowToSetUp] ||
      fallbackHandler;
    return handler(valueData);
  }

  return valueData || undefined;
};

export { strategyFactoryHandlerManager };
