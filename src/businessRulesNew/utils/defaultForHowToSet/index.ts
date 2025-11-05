import { ValueHowToSetUp } from "@isettingkit/input";

const defaultForHowToSet = (how: string) => {
  switch (how) {
    case ValueHowToSetUp.LIST_OF_VALUES_MULTI:
      return [];
    case ValueHowToSetUp.RANGE:
      return "";
    case ValueHowToSetUp.EQUAL:
    case ValueHowToSetUp.GREATER_THAN:
    case ValueHowToSetUp.LESS_THAN:
    case ValueHowToSetUp.LIST_OF_VALUES:
    default:
      return "";
  }
};

 export { defaultForHowToSet };