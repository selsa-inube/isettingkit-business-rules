import { IAttributesGridNode } from "./IAttributesGridNode";
import { IEntriesGridNode } from "./IEntriesGridNode";
import { IGroupNode } from "./IGroupNode";
import { IJsonNode } from "./IJsonNode";

type TSchemaNode<TData, TEntry> =
  | IAttributesGridNode<TData>
  | IEntriesGridNode<TData, TEntry>
  | IGroupNode<TData>
  | IJsonNode<TData>;

export type { TSchemaNode };