import React from "react";
import { Fieldset, Text } from "@inubekit/inubekit";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { BorderStack } from "../../filter/BorderStack";
import { IDraggableList } from "../types/IDraggableList";
import { IClientLabel } from "../types/IClientLabel";
import { StyledListContainer, StyledOptionList } from "./styles";

const BUS_EVENT = "dnd:draggingLabel";

const DraggableList = (props: IDraggableList) => {
  const {
    emptyMessage,
    id,
    group,
    legend,
    initialItems,
    highlightFirst,
    onMove,
  } = props;

  const [parentRef, items] = useDragAndDrop<HTMLUListElement, IClientLabel>(
    initialItems,
    { group },
  );

  const [draggingLabel, setDraggingLabel] = React.useState<IClientLabel | null>(
    null,
  );

  const prevItemsRef = React.useRef<IClientLabel[]>(initialItems);

  React.useEffect(() => {
    const listener = (draggableEvent: Event) => {
      const detail =
        (draggableEvent as CustomEvent<IClientLabel | null>).detail ?? null;
      setDraggingLabel(detail);
    };
    window.addEventListener(BUS_EVENT, listener as EventListener);
    return () =>
      window.removeEventListener(BUS_EVENT, listener as EventListener);
  }, []);

  const emitDragging = React.useCallback((label: IClientLabel | null) => {
    window.dispatchEvent(
      new CustomEvent<IClientLabel | null>(BUS_EVENT, { detail: label }),
    );
  }, []);

  const handlePointerDownCapture = (
    ev: React.PointerEvent<HTMLUListElement>,
  ) => {
    const target = ev.target as HTMLElement | null;
    const li = target?.closest?.("li.dnd-item") as HTMLLIElement | null;
    const label = (li?.getAttribute("data-label") as IClientLabel) || null;
    if (label) {
      setDraggingLabel(label);
      emitDragging(label);
    }
  };

  const clearDragging = React.useCallback(() => {
    setDraggingLabel(null);
    emitDragging(null);
  }, [emitDragging]);

  React.useEffect(() => {
    const onClear = () => clearDragging();
    window.addEventListener("pointerup", onClear);
    window.addEventListener("blur", onClear);
    return () => {
      window.removeEventListener("pointerup", onClear);
      window.removeEventListener("blur", onClear);
    };
  }, [clearDragging]);

  React.useEffect(() => {
    const prev = prevItemsRef.current;

    if (items.length !== prev.length) {
      if (items.length === prev.length + 1) {
        const prevSet = new Set(prev);
        const added = items.find((x) => !prevSet.has(x)) || null;

        if (added) {
          const from = id === "left" ? "right" : "left";
          onMove?.({ item: added, from, to: id });
        }
      }
    }

    prevItemsRef.current = items;
  }, [items, id, onMove]);

  const isEmpty = items.length === 0;

  return (
    <Fieldset
      legend={legend}
      width="100%"
      height="-webkit-fill-available"
      spacing="wide"
    >
      <StyledListContainer
        ref={parentRef}
        onPointerDownCapture={handlePointerDownCapture}
        onPointerUpCapture={clearDragging}
        onPointerCancelCapture={clearDragging}
        $isEmpty={isEmpty}
      >
        {isEmpty ? (
          <BorderStack
            background
            borderRadius="8px"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Text type="label" size="medium" appearance="gray" padding="12px">
              {emptyMessage || "No hay elementos en esta lista"}
            </Text>
          </BorderStack>
        ) : (
          items.map((label, idx) => {
            const isDragging = draggingLabel === label;
            const isFirst = Boolean(highlightFirst && idx === 0);
            return (
              <StyledOptionList
                key={label}
                className={`dnd-item${isDragging ? " is-dragging" : ""}`}
                data-label={label}
                data-first={isFirst || undefined}
                $active={isDragging}
              >
                <BorderStack border borderRadius="8px" width="100%">
                  <Text
                    type="title"
                    appearance={isDragging ? "primary" : "dark"}
                    weight={isDragging ? "bold" : "normal"}
                    size="medium"
                    padding="6px 12px"
                  >
                    {label}
                  </Text>
                </BorderStack>
              </StyledOptionList>
            );
          })
        )}
      </StyledListContainer>
    </Fieldset>
  );
};

export { DraggableList };
