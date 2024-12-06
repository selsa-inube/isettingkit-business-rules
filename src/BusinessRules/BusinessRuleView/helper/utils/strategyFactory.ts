import { listOfValuesHandler } from "../strategies/ListOfValuesStrategy";
import { listOfValuesMultiHandler } from "../strategies/MultiListOfValuesStrategy";
import { rangeHandler } from "../strategies/RangeStrategy";
import { greaterThanHandler } from "../strategies/greaterThan";
import { lessThanHandler } from "../strategies/lessThan";
import { equalHandler } from "../strategies/equal";
import {
  ValueHandler,
  ValueHowToSetUp,
  ValueReturnType,
} from "../types/ValueDataStrategy";

const fallbackHandler: ValueHandler = (d) => d.value as ValueReturnType;

const handlers: Partial<Record<ValueHowToSetUp, ValueHandler>> = {
  [ValueHowToSetUp.LIST_OF_VALUES]: listOfValuesHandler,
  [ValueHowToSetUp.LIST_OF_VALUES_MULTI]: listOfValuesMultiHandler,
  [ValueHowToSetUp.RANGE]: rangeHandler,
  [ValueHowToSetUp.GREATER_THAN]: greaterThanHandler,
  [ValueHowToSetUp.LESS_THAN]: lessThanHandler,
  [ValueHowToSetUp.EQUAL]: equalHandler,
};

export { handlers, fallbackHandler };
