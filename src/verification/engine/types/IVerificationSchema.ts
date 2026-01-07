import { IStepSchema } from "./IStepSchema";

interface IVerificationSchema<TData> {
  steps: IStepSchema<TData>[];
}

export type { IVerificationSchema };