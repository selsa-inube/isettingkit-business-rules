import { IPath } from "./IPath";
import { IRenderCtx } from "./IRenderCtx";

interface IAttributesGridItem<TData> {
  id: string;
  label: string;
  render?: (value: unknown, ctx: IRenderCtx<TData>) => React.ReactNode;
  value: IPath<TData>;
  withTag?: boolean;
}

export type { IAttributesGridItem };