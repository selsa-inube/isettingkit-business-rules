import { IVerificationSchema } from "./IVerificationSchema";

interface IVerificationEngine<TData> {
  data: TData;
  isMobile: boolean;
  isTablet: boolean;
  onBackStep?: (stepId: string) => void;
  schema?: IVerificationSchema<TData>;
}

export type { IVerificationEngine };