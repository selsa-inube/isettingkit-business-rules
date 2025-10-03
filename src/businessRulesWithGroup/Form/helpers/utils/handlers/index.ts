import { listOfValuesStrategy } from "../../strategies/listOfValuesStrategy";
import { listOfValuesMultiStrategy } from "../../strategies/listOfValuesMultiStrategy";
import { rangeStrategy } from "../../strategies/rangeStrategy";
import { comparisonStrategy } from "../../strategies/comparisonStrategy";
import { EValueHowToSetUp } from "../../../../../businessRules/enums/EValueHowToSetUp";

const strategies = {
  [EValueHowToSetUp.LIST_OF_VALUES]: listOfValuesStrategy,
  [EValueHowToSetUp.LIST_OF_VALUES_MULTI]: listOfValuesMultiStrategy,
  [EValueHowToSetUp.RANGE]: rangeStrategy,
  [EValueHowToSetUp.GREATER_THAN]: comparisonStrategy,
  [EValueHowToSetUp.LESS_THAN]: comparisonStrategy,
  [EValueHowToSetUp.EQUAL]: comparisonStrategy,
};

export { strategies };
