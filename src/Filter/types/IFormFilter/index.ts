import { ICheckpickerField } from "../ICheckpickerField";

interface IFormFilter {
  fields: Array<ICheckpickerField & { icon?: JSX.Element }>;
  onChange: (name: string, values: string) => void;
}

export type { IFormFilter };
