import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledBorderFlex = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  gap: ${({ gap }) => gap};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background: ${({ background, theme }) =>
    background
      ? `${theme?.palette?.neutral?.N10 || inube.palette.neutral.N10}`
      : `${theme?.palette?.neutral?.N0 || inube.palette.neutral.N0}`};
  border: ${({ border, theme }) =>
    border
      ? `1px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}`
      : "none"};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-sizing: ${({ boxSizing }) => boxSizing};
  overflow-y: ${({ scroll }) => (scroll ? "scroll" : "none")};
`;

export { StyledBorderFlex };
