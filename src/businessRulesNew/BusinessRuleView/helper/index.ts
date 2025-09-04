import { IRuleDecision } from "@isettingkit/input";
import { fallbackHandler } from "./utils/handlers/fallbackHandler";
import { handlers } from "./utils/handlers";
import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";

const strategyFactoryHandlerManager = (element: IRuleDecision) => {
  const valueData = element?.value;
  const isObject =
    typeof valueData === "object" &&
    valueData !== null &&
    !Array.isArray(valueData);

  const handler =
    handlers[element?.howToSetTheDecision as EValueHowToSetUp] ||
    fallbackHandler;
  return (isObject && handler(valueData)) || valueData || undefined;
};

export { strategyFactoryHandlerManager };
