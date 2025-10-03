interface ICondition<TValue = unknown> {
  field: string;
  operator: string;
  value: TValue;
}

export type { ICondition };