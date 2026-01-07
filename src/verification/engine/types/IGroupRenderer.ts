/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRenderCtx } from "./IRenderCtx";
import { TSchemaNode } from "./TSchemaNode";

interface IGroupRenderer<TData> {
  ctx: IRenderCtx<TData>;
  node: Extract<TSchemaNode<TData, any>, { type: "group" }>;
  renderNode: (node: TSchemaNode<TData, any>, ctx: IRenderCtx<TData>) => React.ReactNode;
}

export type { IGroupRenderer };