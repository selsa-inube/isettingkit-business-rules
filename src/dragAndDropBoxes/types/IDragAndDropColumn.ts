import { IClientLabel } from "./IClientLabel";

interface IDragAndDropColumn {
  emptyMessage?: string;
  highlightFirst?: boolean;
  items: IClientLabel[];
  legend: string;
}

export type { IDragAndDropColumn };
