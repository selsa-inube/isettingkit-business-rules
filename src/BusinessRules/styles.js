import { inube } from "@inubekit/inubekit";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledFadeInStack = styled.div`
  width: 100%;
  height: 100%;
  & > div {
    animation: ${fadeIn} 600ms ease-out;
  }
`;

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

const StyledScrollContainer = styled.div`
  & > div {
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
  }
`;

const StyledGridContainer = styled.div`
  & > div > div {
    border-radius: 8px;
    border: 1px solid ${inube.palette.neutral.N30};
    box-sizing: border-box;
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.1);
  }
`;

const StyledEmptyCardContainer = styled.div`
  & > div {
    background-color: ${inube.palette.neutral.N10};
    justify-content: center;
  }
  min-height: 350px;
  width: 100%;
  height: 100%;
  padding-bottom: 12px;
`;

const StyledConditionContainer = styled.div`
  & > div {
    border-radius: 8px;
    border: 1px solid ${inube.palette.neutral.N30};
  }
`;

export {
  StyledConditionContainer,
  StyledCard,
  StyledEmptyCardContainer,
  StyledFadeInStack,
  StyledScrollContainer,
  StyledGridContainer,
};
