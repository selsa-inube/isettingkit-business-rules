import { ICondition, IRuleDecision, ValueHowToSetUp } from "@isettingkit/input";

const getValueData = (
  element: IRuleDecision["decision"] | ICondition | undefined,
) => {
  if (!element || !element.possibleValue) {
    return undefined;
  }

  switch (element.howToSetUp) {
    case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
      return element.possibleValue.listSelected;

    case ValueHowToSetUp.LIST_OF_VALUES:
      return element.possibleValue.listSelected ?? element.possibleValue.list;

    case ValueHowToSetUp.RANGE:
      return {
        rangeFrom: element.possibleValue.rangeFrom,
        rangeTo: element.possibleValue.rangeTo,
      };

    default:
      return element.possibleValue.value || element.value;
  }
};

export { getValueData };
