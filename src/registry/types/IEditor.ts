interface IEditor<TValue> {
  label?: string;
  onChange: (value: TValue) => void;
  required?: boolean;
  value: TValue;
}

export type { IEditor };