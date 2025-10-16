import { Stack } from "@inubekit/inubekit";
import { DraggableList } from "./DraggableList";
import type { IDragAndDropBoxes } from "./types/IDragAndDropBoxes";

const DragAndDropBoxes = (props: IDragAndDropBoxes) => {
  const { group = "clients", left, right, onMove, locked = false } = props;

  const handleMove = (payload: {
    item: string;
    from: "left" | "right";
    to: "left" | "right";
  }) => {
    if (locked) return;
    onMove?.(payload);
  };

  return (
    <Stack
      justifyContent="space-between"
      alignItems="start"
      width="100%"
      gap="40px"
    >
      <DraggableList
        group={group}
        highlightFirst={left.highlightFirst}
        id="left"
        initialItems={left.items}
        legend={left.legend}
        onMove={handleMove}
        locked={locked}
        emptyMessage={left.emptyMessage}
      />
      <DraggableList
        group={group}
        highlightFirst={right.highlightFirst}
        id="right"
        initialItems={right.items}
        legend={right.legend}
        onMove={handleMove}
        locked={locked}
        emptyMessage={right.emptyMessage}
      />
    </Stack>
  );
};

export { DragAndDropBoxes };
