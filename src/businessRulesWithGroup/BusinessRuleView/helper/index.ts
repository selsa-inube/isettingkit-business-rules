/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { fallbackHandler } from "./utils/handlers/fallbackHandler";
import { handlers } from "./utils/handlers";
import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";

const addPercentageUnit = (decision: IRuleDecision, processedValue: any) => {
  if (
    !decision ||
    decision.decisionDataType !== ValueDataType.PERCENTAGE ||
    processedValue == null
  ) {
    return processedValue;
  }

  if (typeof processedValue === "string" && processedValue.endsWith("%")) {
    return processedValue;
  }

  const strip = (v: any) =>
    typeof v === "string" ? v.replace(/%$/, "") : v;

  if (
    typeof processedValue === "number" ||
    typeof processedValue === "string"
  ) {
    const normalized = strip(processedValue);
    return `${normalized}%`;
  }

  if (
    typeof processedValue === "object" &&
    !Array.isArray(processedValue) &&
    "from" in processedValue &&
    "to" in processedValue
  ) {
    return {
      ...processedValue,
      from: `${strip(processedValue.from)}%`,
      to: `${strip(processedValue.to)}%`,
    };
  }

  return processedValue;
};

const strategyFactoryHandlerManager = (element: IRuleDecision) => {
  const valueData = element?.value;
  const isObject =
    typeof valueData === "object" &&
    valueData !== null &&
    !Array.isArray(valueData);

  const handler =
    handlers[element?.howToSetTheDecision as EValueHowToSetUp] ||
    fallbackHandler;

  const processed = (isObject && handler(valueData)) || valueData || undefined;

  return addPercentageUnit(element, processed);
};

export { strategyFactoryHandlerManager };
