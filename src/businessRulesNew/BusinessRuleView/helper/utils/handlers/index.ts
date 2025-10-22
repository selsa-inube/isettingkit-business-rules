import { listOfValuesHandler } from "../../strategies/listOfValuesStrategy";
import { listOfValuesMultiHandler } from "../../strategies/multiListOfValuesStrategy";
import { rangeHandler } from "../../strategies/rangeStrategy";
import { greaterThanHandler } from "../../strategies/greaterThan";
import { lessThanHandler } from "../../strategies/lessThan";
import { equalHandler } from "../../strategies/equalTo";
import { EValueHowToSetUp } from "../../../../../businessRules/enums/EValueHowToSetUp";
import { IValueHandler } from "../../../../../businessRules/types/BusinessRuleView/helpers/IValueHandler";

const handlersNew: Partial<Record<EValueHowToSetUp, IValueHandler>> = {
  [EValueHowToSetUp.LIST_OF_VALUES]: listOfValuesHandler,
  [EValueHowToSetUp.LIST_OF_VALUES_MULTI]: listOfValuesMultiHandler,
  [EValueHowToSetUp.RANGE]: rangeHandler,
  [EValueHowToSetUp.GREATER_THAN]: greaterThanHandler,
  [EValueHowToSetUp.LESS_THAN]: lessThanHandler,
  [EValueHowToSetUp.EQUAL]: equalHandler,
};

export { handlersNew };
