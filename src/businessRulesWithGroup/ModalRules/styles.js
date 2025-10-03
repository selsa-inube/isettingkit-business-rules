import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledContainer = styled.div`
  position: relative;
  & > div {
    padding: 24px 16px;
  }
`;

const StyledModal = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  max-width: 450px;
  max-height: 90vh;
  overflow-y: ${({ smallScreen }) => (smallScreen ? "hidden" : "auto")};
  border-radius: 8px;
  transition: overflow-y 0.3s ease-in-out;
  & > div {
    padding: 24px;
  }

  &:hover {
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1c7d0;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ebecf0;
    border-radius: 8px;
  }
`;

export { StyledContainer, StyledModal };
