import { IValue } from "@isettingkit/input";
import { ValueReturnType } from "../types/ValueDataStrategy";

const lessThanHandler = (d: IValue): ValueReturnType =>
  d.value as ValueReturnType;

export { lessThanHandler };
