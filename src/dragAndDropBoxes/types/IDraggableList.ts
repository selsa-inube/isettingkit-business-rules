import { IClientLabel } from "./IClientLabel";

interface IDraggableList {
  legend: string;
  initialItems: IClientLabel[];
  group: string;
  highlightFirst?: boolean;
}

export type { IDraggableList };
