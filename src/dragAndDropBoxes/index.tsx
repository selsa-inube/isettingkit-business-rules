// DragAndDropBoxes.tsx (unchanged except it still works with the new behavior)
import { Stack } from "@inubekit/inubekit";
import { DraggableList } from "./DraggableList";
import type { IDragAndDropBoxes } from "./types/IDragAndDropBoxes";

const DragAndDropBoxes = (props: IDragAndDropBoxes) => {
  const { group = "clients", left, right } = props;

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
        initialItems={left.items}
        legend={left.legend}
      />
      <DraggableList
        group={group}
        highlightFirst={right.highlightFirst}
        initialItems={right.items}
        legend={right.legend}
      />
    </Stack>
  );
};

export { DragAndDropBoxes };
