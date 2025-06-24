import { StyledBox } from "./styles";

interface IBox {
  children?: React.ReactNode;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
}

function Box(props: IBox) {
  const {
    children,
    padding = "16px",
    margin,
    borderRadius = "8px",
    width,
    height,
  } = props;
  return (
    <StyledBox
      $padding={padding}
      $margin={margin}
      $borderRadius={borderRadius}
      $width={width}
      $height={height}
    >
      {children}
    </StyledBox>
  );
}

export { Box };
export type { IBox };
