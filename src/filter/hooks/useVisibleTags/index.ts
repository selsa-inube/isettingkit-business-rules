import { useEffect, useRef, useState } from "react";
import { IFilterTag } from "../../../filter/types/IFilterTag";

const useVisibleTags = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  tags: IFilterTag[],
) => {
  const [visible, setVisible] = useState<typeof tags>([]);
  const [hidden, setHidden] = useState<typeof tags>([]);
  const [showOverflowIndicator, setShowOverflowIndicator] = useState(false);

  const measurementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !measurementRef.current) return;

    const container = containerRef.current;
    const measurer = measurementRef.current;

    const recalculate = () => {
      const containerWidth = container.clientWidth;
      const children = Array.from(
        measurer.querySelectorAll<HTMLDivElement>('[data-filter-tag="true"]'),
      );

      const ellipsisWidth = 48;
      let total = 0;
      const visibleTags: typeof tags = [];
      const hiddenTags: typeof tags = [];

      for (let i = 0; i < tags.length; i++) {
        const width = children[i]?.offsetWidth ?? 0;

        if (total + width + ellipsisWidth <= containerWidth) {
          visibleTags.push(tags[i]);
          total += width;
        } else {
          hiddenTags.push(tags[i]);
        }
      }

      setVisible(visibleTags);
      setHidden(hiddenTags);
      setShowOverflowIndicator(hiddenTags.length > 0);
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(recalculate);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [tags, containerRef]);

  return { visible, hidden, showOverflowIndicator, measurementRef };
};

export { useVisibleTags };
