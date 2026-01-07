import { IRenderCtx } from "./IRenderCtx";
import { TSchemaNode } from "./TSchemaNode";

interface IEntriesGridRenderer<TData, TEntry> {
  ctx: IRenderCtx<TData>;
  node: Extract<TSchemaNode<TData, TEntry>, { type: "entriesGrid" }>;
}

export type { IEntriesGridRenderer };