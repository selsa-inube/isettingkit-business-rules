/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRenderCtx } from "./IRenderCtx";
import { TSchemaNode } from "./TSchemaNode";

interface IAttributesGridRenderer<TData> {
  ctx: IRenderCtx<TData>;
  node: Extract<TSchemaNode<TData, any>, { type: "attributesGrid" }>;
}

export type { IAttributesGridRenderer };