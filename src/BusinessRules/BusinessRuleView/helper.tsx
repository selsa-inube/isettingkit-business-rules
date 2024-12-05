/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const valueData: any = element.value;

  if (!valueData) {
    return undefined;
  }

  const isValueObject = (
    data: string | number | string[] | IValue,
  ): data is IValue => typeof data === "object" && data !== null;

  if (isValueObject(valueData)) {
    switch (element.valueUse) {
      case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
        return valueData as any;

      case ValueHowToSetUp.LIST_OF_VALUES:
        return valueData as any;

      case ValueHowToSetUp.RANGE:
        return {
          from: valueData.from,
          to: valueData.to,
        } as any;

      case ValueHowToSetUp.GREATER_THAN:
      case ValueHowToSetUp.LESS_THAN:
      case ValueHowToSetUp.EQUAL:
        return valueData.value as any;

      default:
        return valueData.value as any;
    }
  }
  return valueData as any;
};

export { getValueData };
