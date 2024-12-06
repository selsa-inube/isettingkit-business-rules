import { ICondition, IRuleDecision } from "@isettingkit/input";
import { ValueHowToSetUp, ValueReturnType } from "./types/ValueDataStrategy";
import { fallbackHandler, handlers } from "./utils/strategyFactory";

function getValueData(
  element: IRuleDecision["decision"] | ICondition | undefined,
): ValueReturnType {
  const valueData = element?.value;
  const isObject =
    typeof valueData === "object" &&
    valueData !== null &&
    !Array.isArray(valueData);

  const handler =
    handlers[element?.valueUse as ValueHowToSetUp] || fallbackHandler;
  return (
    (isObject && handler(valueData)) ||
    (valueData as ValueReturnType) ||
    undefined
  );
}

export { getValueData };
