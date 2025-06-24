import styled from "styled-components";
import { box } from "./tokens";

const StyledBox = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme?.box?.border?.color || box.border.color};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  box-sizing: border-box;
`;

export { StyledBox };
