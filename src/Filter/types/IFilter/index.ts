import { IFilterTag } from "../IFilterTag";

interface IFilter {
  appliedFilters?: IFilterTag[];
  onClear: () => void;
  onClick: () => void;
  titleClearFilter: string;
  titleFilter: string;
}
export type { IFilter };
