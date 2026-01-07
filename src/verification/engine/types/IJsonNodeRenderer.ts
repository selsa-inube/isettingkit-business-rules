/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRenderCtx } from "./IRenderCtx";
import { TSchemaNode } from "./TSchemaNode";

interface IJsonNodeRenderer<TData> {
  ctx: IRenderCtx<TData>;
  node: Extract<TSchemaNode<TData, any>, { type: "json" }>;
}

export type { IJsonNodeRenderer };