import { ICheckpickerField } from "../ICheckpickerField";
import { IFilterTag } from "../IFilterTag";

interface IFormFilter {
  appliedFilters?: IFilterTag[];
  fields: Array<ICheckpickerField & { icon?: JSX.Element }>;
  onChange: (name: string, values: string) => void;
  noFiltersLabel?: string;
}

export type { IFormFilter };
