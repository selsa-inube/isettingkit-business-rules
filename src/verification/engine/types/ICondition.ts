interface ICondition<TData> {
  (data: TData): boolean;
}

export type { ICondition };