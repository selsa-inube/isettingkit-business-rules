import React from "react";
import { DragAndDropBoxes } from "..";

type TSide = "left" | "right";

interface IDragAndDropBoxesController {
  group?: string;
  left: {
    highlightFirst?: boolean;
    items: string[];
    legend: string;
    emptyMessage?: string;
  };
  right: {
    highlightFirst?: boolean;
    items: string[];
    legend: string;
    emptyMessage?: string;
  };
  onMove?: (payload: { item: string; from: TSide; to: TSide }) => void;
  locked?: boolean;
  targetInsertMode?: "append" | "prepend";
}

const DragAndDropBoxesController = (props: IDragAndDropBoxesController) => {
  const {
    group = "clients",
    left,
    onMove,
    right,
    targetInsertMode = "append",
    locked = false,
  } = props;

  const [leftItems, setLeftItems] = React.useState<string[]>(left.items);
  const [rightItems, setRightItems] = React.useState<string[]>(right.items);

  const removeFrom = React.useCallback((arr: string[], item: string) => {
    const idx = arr.indexOf(item);
    if (idx === -1) return arr;
    const copy = arr.slice();
    copy.splice(idx, 1);
    return copy;
  }, []);

  const insertInto = React.useCallback(
    (arr: string[], item: string) => {
      if (targetInsertMode === "prepend") return [item, ...arr];
      return [...arr, item];
    },
    [targetInsertMode],
  );

  const handleMove = React.useCallback(
    (payload: { item: string; from: TSide; to: TSide }) => {
      if (locked) return;
      const { item, from, to } = payload;

      if (from === "left" && to === "right") {
        setLeftItems((prev) => removeFrom(prev, item));
        setRightItems((prev) => insertInto(prev, item));
      } else if (from === "right" && to === "left") {
        setRightItems((prev) => removeFrom(prev, item));
        setLeftItems((prev) => insertInto(prev, item));
      }

      onMove?.(payload);
      console.log(`Moved "${item}" from ${from} -> ${to}`);
    },
    [insertInto, onMove, removeFrom, locked],
  );

  const leftProps = {
    highlightFirst: left.highlightFirst,
    items: leftItems,
    legend: left.legend,
    emptyMessage: left.emptyMessage,
  };
  const rightProps = {
    highlightFirst: right.highlightFirst,
    items: rightItems,
    legend: right.legend,
    emptyMessage: right.emptyMessage,
  };

  return (
    <DragAndDropBoxes
      group={group}
      left={leftProps}
      onMove={handleMove}
      right={rightProps}
      locked={locked}
    />
  );
};

export { DragAndDropBoxesController };
