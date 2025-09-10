import { Link } from "react-router-dom";
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

const StyledHeaderOptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  outline: none;
  cursor: pointer;
`;

const StyledHeaderTitleButton = styled.div`
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
`;

const StyledHeaderTitleLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const StyledItemLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
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

const StyledLinksColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > a:last-child ${StyledMenuItem} {
    border-radius: 0 0 8px 8px;
  }
`;

export {
  StyledBoxContainer,
  StyledHeaderOptionContainer,
  StyledHeaderTitleButton,
  StyledHeaderTitleLink,
  StyledItemLink,
  StyledLinksColumn,
  StyledMainOptionContainer,
  StyledMenuItem,
};
