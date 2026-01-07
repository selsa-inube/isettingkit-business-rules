interface IPathFn<TData> {
  (data: TData): unknown;
}

export type { IPathFn };