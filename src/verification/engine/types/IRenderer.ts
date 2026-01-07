/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRenderCtx } from "./IRenderCtx";
import { TSchemaNode } from "./TSchemaNode";

interface IRenderer<TData> {
  (node: TSchemaNode<TData, any>, ctx: IRenderCtx<TData>): React.ReactNode;
}

export type { IRenderer };