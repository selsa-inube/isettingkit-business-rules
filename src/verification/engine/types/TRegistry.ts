/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRenderer } from "./IRenderer";
import { TSchemaNode } from "./TSchemaNode";

type TRegistry<TData> = Record<TSchemaNode<TData, any>["type"], IRenderer<TData>>;

export type { TRegistry };