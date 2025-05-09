import { listOfValuesHandler } from "../../strategies/listOfValuesStrategy";
import { listOfValuesMultiHandler } from "../../strategies/multiListOfValuesStrategy";
import { rangeHandler } from "../../strategies/rangeStrategy";
import { greaterThanHandler } from "../../strategies/greaterThan";
import { lessThanHandler } from "../../strategies/lessThan";
import { equalHandler } from "../../strategies/equalTo";
import { EValueHowToSetUp } from "../../../../../BusinessRules/enums/EValueHowToSetUp";
import { IValueHandler } from "../../../../../BusinessRules/types/BusinessRuleView/helpers/IValueHandler";

const handlers: Partial<Record<EValueHowToSetUp, IValueHandler>> = {
  [EValueHowToSetUp.LIST_OF_VALUES]: listOfValuesHandler,
  [EValueHowToSetUp.LIST_OF_VALUES_MULTI]: listOfValuesMultiHandler,
  [EValueHowToSetUp.RANGE]: rangeHandler,
  [EValueHowToSetUp.GREATER_THAN]: greaterThanHandler,
  [EValueHowToSetUp.LESS_THAN]: lessThanHandler,
  [EValueHowToSetUp.EQUAL]: equalHandler,
};

export { handlers };
