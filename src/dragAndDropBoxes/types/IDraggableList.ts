import { IClientLabel } from "./IClientLabel";
import { IListSide } from "./IListSide";

interface IDraggableList {
  emptyMessage?: string;
  id: IListSide;
  group: string;
  legend: string;
  initialItems: IClientLabel[];
  highlightFirst?: boolean;
  onMove?: (payload: { item: string; from: IListSide; to: IListSide }) => void;
  locked?: boolean;
}

export type { IDraggableList };
