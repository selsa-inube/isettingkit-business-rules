import styled from "styled-components";
import { tokens as InputTokens } from "../tokens";

const StyledOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  margin: 4px 0px;
  position: absolute;
  width: 100%;
  z-index: 1;
  border-radius: 4px;
  background: ${({ theme }) => {
    return (
      theme?.input?.option?.background?.regular ||
      InputTokens.option.background.regular
    );
  }};
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);

  max-height: ${({ $maxItems }) =>
    $maxItems ? `${$maxItems * 46}px` : "auto"};
  overflow-y: ${({ $maxItems, $totalOptions }) =>
    $maxItems && $totalOptions > $maxItems ? "auto" : "hidden"};

  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar,
  &:hover::-webkit-scrollbar-thumb {
    opacity: 1;
    pointer-events: auto;
  }

  & > li:hover {
    background: ${({ theme }) => {
      return (
        theme?.input?.option?.background?.hover ||
        InputTokens.option.background.hover
      );
    }};
  }
`;

export { StyledOptionList };
