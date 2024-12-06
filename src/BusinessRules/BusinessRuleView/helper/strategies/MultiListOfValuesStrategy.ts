import { IValue } from "@isettingkit/input";
import { ValueReturnType } from "../types/ValueDataStrategy";

const listOfValuesMultiHandler = (d: IValue): ValueReturnType =>
  d.value as ValueReturnType;

export { listOfValuesMultiHandler };
