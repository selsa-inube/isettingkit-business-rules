import { IValue } from "@isettingkit/input";
import { ValueReturnType } from "../types/ValueDataStrategy";

const rangeHandler = (d: IValue): ValueReturnType => ({
  from: (d.from as string) ?? "",
  to: (d.to as string) ?? "",
});

export { rangeHandler };
