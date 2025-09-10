import React from "react";
import { IBorderStack } from "../types/IBorderStack";
import { StyledBorderFlex } from "./styles";

const BorderStack = React.forwardRef<HTMLDivElement, IBorderStack>(
  (props, ref) => {
    const {
      children,
      wrap,
      direction = "column",
      justifyContent,
      alignItems,
      alignContent,
      height,
      width,
      gap,
      background,
      borderRadius,
      border,
      margin = "0px",
      padding = "0px",
      boxSizing,
      scroll = false,
    } = props;

    return (
      <StyledBorderFlex
        ref={ref}
        direction={direction}
        $justifyContent={justifyContent}
        $alignItems={alignItems}
        $alignContent={alignContent}
        height={height}
        width={width}
        wrap={wrap}
        $gap={gap}
        $background={background}
        $border={border}
        $margin={margin}
        $padding={padding}
        $borderRadius={borderRadius}
        $boxSizing={boxSizing}
        $scroll={scroll}
      >
        {children}
      </StyledBorderFlex>
    );
  },
);

BorderStack.displayName = "BorderStack";
export { BorderStack };
