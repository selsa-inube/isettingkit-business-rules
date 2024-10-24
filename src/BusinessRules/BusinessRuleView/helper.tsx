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

  const valueData = element.value || element.possibleValue;

  if (!valueData) {
    return undefined;
  }

  const isValueObject = (
    data: string | number | string[] | IValue,
  ): data is IValue => typeof data === "object" && data !== null;

  if (isValueObject(valueData)) {
    switch (element.howToSetUp) {
      case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
        return valueData.listSelected;

      case ValueHowToSetUp.LIST_OF_VALUES:
        return valueData.listSelected ?? valueData.list;

      case ValueHowToSetUp.RANGE:
        return {
          rangeFrom: valueData.rangeFrom,
          rangeTo: valueData.rangeTo,
        };

      default:
        return valueData.value;
    }
  }
  return valueData;
};

export { getValueData };
