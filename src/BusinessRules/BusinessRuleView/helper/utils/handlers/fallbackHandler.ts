import { IValue } from "@isettingkit/input";

const fallbackHandler = (data: IValue) => {
  return data.value;
};

export { fallbackHandler };
