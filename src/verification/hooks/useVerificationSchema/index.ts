import { useMemo } from "react";
import { IVerificationSchema } from "../../../verification/engine/types/IVerificationSchema";
import { buildDefaultSchema } from "../../../verification/schema/buildDefaultSchema";

function useVerificationSchema<TData>(data: TData, schema?: IVerificationSchema<TData>) {
  return useMemo(() => schema ?? buildDefaultSchema<TData>(data), [schema, data]);
}

export { useVerificationSchema };
