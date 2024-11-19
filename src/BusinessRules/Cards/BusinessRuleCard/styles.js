import { inube } from "@inubekit/foundations";
import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 8px;
  border: 1px solid ${inube.palette.neutral.N30};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // height: 364px;
  // width: 332px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.1);
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
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

export { StyledCard, StyledContainer };
