import { IValue } from "@isettingkit/input";

const rangeHandler = (data: IValue) => {
  return {
    from: (data.from as string) ?? "",
    to: (data.to as string) ?? "",
  };
};

export { rangeHandler };
