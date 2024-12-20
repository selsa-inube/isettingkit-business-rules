import { IRuleDecision } from "@isettingkit/input";
import { ValueHowToSetUp, ValueReturnType } from "./types/ValueDataStrategy";
import { fallbackHandler, handlers } from "./utils/strategyFactory";

function getValueData(element: IRuleDecision): ValueReturnType {
  const valueData = element?.value;
  const isObject =
    typeof valueData === "object" &&
    valueData !== null &&
    !Array.isArray(valueData);

  const handler =
    handlers[element?.howToSetTheDecision as ValueHowToSetUp] ||
    fallbackHandler;
  return (
    (isObject && handler(valueData)) ||
    (valueData as ValueReturnType) ||
    undefined
  );
}

export { getValueData };
