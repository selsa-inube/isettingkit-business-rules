import { IValue } from "@isettingkit/input";
import { ValueReturnType } from "../types/ValueDataStrategy";

const listOfValuesHandler = (d: IValue): ValueReturnType =>
  d.value as ValueReturnType;

export { listOfValuesHandler };
