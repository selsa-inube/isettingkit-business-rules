import { IValue } from "@isettingkit/input";
import { ValueReturnType } from "../types/ValueDataStrategy";

const equalHandler = (d: IValue): ValueReturnType => d.value as ValueReturnType;

export { equalHandler };
