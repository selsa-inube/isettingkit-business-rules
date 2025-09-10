import { IClientLabel } from "./IClientLabel";

interface IDragAndDropColumn {
  highlightFirst?: boolean;
  items: IClientLabel[];
  legend: string;
}

export type { IDragAndDropColumn };
