import { IDragAndDropColumn } from "./IDragAndDropColumn";

interface IDragAndDropBoxes {
  group?: string;
  left: IDragAndDropColumn;
  right: IDragAndDropColumn;
}

export type { IDragAndDropBoxes };
