import styled from "styled-components";
import { tokens } from "./tokens";

const StyledBoxContainer = styled.div`
  & > div {
    border: 1px solid
      ${({ theme, $active }) =>
        $active
          ? theme?.border?.expanded?.color || tokens.border.expanded.color
          : theme?.border?.contracted?.color || tokens.border.contracted.color};
  }
  &:hover {
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    background-color: ${({ theme, $disabled }) => {
      if (!$disabled) {
        return (
          theme?.menu?.item?.background?.hover || tokens.item.background.hover
        );
      }
    }};
  }
`;

const StyledMenuItem = styled.div`
  display: block;
  text-decoration: none;
  background-color: ${({ theme, $active }) =>
    $active
      ? theme?.menu?.item?.background?.active || tokens.item.background.active
      : theme?.menu?.item?.background?.inactive ||
        tokens.item.background.inactive};
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  &:hover {
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    background-color: ${({ $active, theme, $disabled }) => {
      if (!$disabled && !$active) {
        return (
          theme?.menu?.item?.background?.hover || tokens.item.background.hover
        );
      }
    }};
  }
`;

const StyledHeaderOptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  outline: none;
  cursor: pointer;
`;

const StyledMainOptionContainer = styled.div`
  & > div {
    border-bottom: 1px solid
      ${({ theme, $active }) =>
        $active
          ? theme?.border?.expanded?.color || tokens.border.expanded.color
          : theme?.border?.contracted?.color || tokens.border.contracted.color};
    border-radius: 8px 8px 0 0;
  }
`;

export {
  StyledBoxContainer,
  StyledHeaderOptionContainer,
  StyledMenuItem,
  StyledMainOptionContainer,
};
