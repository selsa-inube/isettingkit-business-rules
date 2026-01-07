import { INodeBase } from "./INodeBase";
import { IPath } from "./IPath";

interface IJsonNode<TData> extends INodeBase<TData> {
  type: "json";
  value: IPath<TData>;
}

export type { IJsonNode };