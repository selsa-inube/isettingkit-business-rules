/* eslint-disable @typescript-eslint/no-explicit-any */
import { INodeBase } from "./INodeBase";
import { TSchemaNode } from "./TSchemaNode";

interface  IGroupNode<TData> extends INodeBase<TData> {
  children: Array<TSchemaNode<TData, any>>;
  type: "group";
}

export type { IGroupNode };