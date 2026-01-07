import { ILayout } from "./ILayout";
import { INodeBase } from "./INodeBase";
import { IPath } from "./IPath";

interface IEntriesGridNode<TData, TEntry> extends INodeBase<TData> {
  entries: IPath<TData>;
  keyOf: (entry: TEntry) => string;
  labelOf: (entry: TEntry) => string;
  layout?: ILayout;
  type: "entriesGrid";
  valueOf: (entry: TEntry) => string;
}

export type { IEntriesGridNode };