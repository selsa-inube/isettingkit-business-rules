import {
  ICondition,
  IRuleDecision,
  IValue,
  ValueHowToSetUp,
} from "@isettingkit/input";

const getValueData = (
  element: IRuleDecision["decision"] | ICondition | undefined,
) => {
  if (!element) {
    return undefined;
  }

  const valueData = element.value;

  if (!valueData) {
    return undefined;
  }

  const isValueObject = (
    data: string | number | string[] | IValue,
  ): data is IValue => typeof data === "object" && data !== null;

  if (isValueObject(valueData)) {
    switch (element.valueUse) {
      case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
        return valueData;

      case ValueHowToSetUp.LIST_OF_VALUES:
        return valueData;

      case ValueHowToSetUp.RANGE:
        return {
          from: valueData.from,
          to: valueData.to,
        };

      default:
        return valueData.value;
    }
  }
  return valueData;
};

export { getValueData };
