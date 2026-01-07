/* eslint-disable @typescript-eslint/no-explicit-any */
import { TSchemaNode } from "./TSchemaNode";

interface IStepSchema<TData> {
  id: string;
  name: string;
  nodes: Array<TSchemaNode<TData, any>>;
  onBack?: (ctx: { stepId: string }) => void;
}

export type { IStepSchema };