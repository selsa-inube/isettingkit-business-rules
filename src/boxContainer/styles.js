import styled from "styled-components";
import { tokensBoxContainer } from "./tokens";

const StyledFlex = styled.div`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  align-content: ${({ $alignContent }) => $alignContent};
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => $wrap};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  gap: ${({ $gap }) => $gap};
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
  box-sizing: ${({ $boxSizing }) => $boxSizing};
  background: ${({ $backgroundColor, theme }) =>
    theme?.boxContainer?.[$backgroundColor].background?.color ??
    tokensBoxContainer[$backgroundColor].background.color};
  border: ${({ $borderColor, theme }) =>
    `1px solid ${theme?.boxContainer?.[$borderColor].border?.color ?? tokensBoxContainer[$borderColor].border.color}`};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  overflow-y: ${({ $overflowY }) => $overflowY};
  overflow-x: ${({ $overflowX }) => $overflowX};
  box-shadow: ${({ theme, $boxShadow }) =>
    $boxShadow &&
    `1px 1px 4px 2px ${theme?.boxContainer?.[$boxShadow].border?.color ?? tokensBoxContainer[$boxShadow].border.color}`};
  min-height: ${({ $minHeight }) => $minHeight};
  max-height: ${({ $maxHeight }) => $maxHeight};
  max-width: ${({ $maxWidth }) => $maxWidth};
  min-width: ${({ $minWidth }) => $minWidth};
`;

export { StyledFlex };
