import { IValue } from "@isettingkit/input";
import { ValueReturnType } from "../types/ValueDataStrategy";

const greaterThanHandler = (d: IValue): ValueReturnType =>
  d.value as ValueReturnType;

export { greaterThanHandler };
