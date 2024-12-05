import { ValueHowToSetUp } from "@isettingkit/input";
import { ListOfValuesStrategy } from "../strategies/ListOfValuesStrategy";
import { ListOfValuesMultiStrategy } from "../strategies/ListOfValuesMultiStrategy";
import { RangeStrategy } from "../strategies/RangeStrategy";
import { ComparisonStrategy } from "../strategies/ComparisonStrategy";
import { DefaultStrategy } from "../strategies/DefaultStrategy";

const strategies = {
  [ValueHowToSetUp.LIST_OF_VALUES]: ListOfValuesStrategy,
  [ValueHowToSetUp.LIST_OF_VALUES_MULTI]: ListOfValuesMultiStrategy,
  [ValueHowToSetUp.RANGE]: RangeStrategy,
  [ValueHowToSetUp.GREATER_THAN]: ComparisonStrategy,
  [ValueHowToSetUp.LESS_THAN]: ComparisonStrategy,
  [ValueHowToSetUp.EQUAL]: ComparisonStrategy,
};

const getStrategy = (type: keyof typeof strategies) => {
  return strategies[type] || DefaultStrategy;
};

export { getStrategy };
