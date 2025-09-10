import styled from "styled-components";
import { tokens } from "../tokens";

const StyledListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledOptionList = styled.li`
  & > div {
    border: 1px solid
      ${({ theme, $active }) =>
        $active
          ? theme?.border?.selected?.color || tokens.border.selected.color
          : theme?.border?.clear?.color || tokens.border.clear.color};
  }
`;

export { StyledListContainer, StyledOptionList };
