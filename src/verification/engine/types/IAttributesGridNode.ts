import { IAttributesGridItem } from "./IAttributesGridItem";
import { ILayout } from "./ILayout";
import { INodeBase } from "./INodeBase";

interface IAttributesGridNode<TData> extends INodeBase<TData> {
  items: IAttributesGridItem<TData>[];
  layout?: ILayout;
  type: "attributesGrid";
}

export type { IAttributesGridNode };