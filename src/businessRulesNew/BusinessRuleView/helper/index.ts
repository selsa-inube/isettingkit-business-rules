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
