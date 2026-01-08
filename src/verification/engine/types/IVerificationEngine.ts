import { IVerificationSchema } from "./IVerificationSchema";

interface IVerificationEngine<TData> {
  data: TData;
  isMobile: boolean;
  isTablet: boolean;
  onBackStep?: (stepId: number) => void;
  schema?: IVerificationSchema<TData>;
}

export type { IVerificationEngine };