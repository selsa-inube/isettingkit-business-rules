import { IDragAndDropColumn } from "./IDragAndDropColumn";

interface IDragAndDropBoxes {
  group?: string;
  left: IDragAndDropColumn;
  right: IDragAndDropColumn;
  onMove?: (payload: {
    item: string;
    from: "left" | "right";
    to: "left" | "right";
  }) => void;
  locked?: boolean;
}

export type { IDragAndDropBoxes };
