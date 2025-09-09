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

const StyledCard = styled.div`
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.1);
`;

const StyledConditionContainer = styled.div`
  & > div {
    border-radius: 8px;
    border: 1px solid
      ${({ theme }) =>
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }
`;

const StyledEmptyCardContainer = styled.div`
  & > div {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
    justify-content: center;
  }
  min-height: 350px;
  width: 100%;
  height: 100%;
  padding-bottom: 12px;
  cursor: pointer;
`;

const StyledFadeInStack = styled.div`
  width: 100%;
  height: 100%;
  & > div {
    animation: ${fadeIn} 600ms ease-out;
  }
`;

const StyledGridContainer = styled.div`
  & > div > div {
    border-radius: 8px;
    box-sizing: border-box;
  }
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

export {
  StyledCard,
  StyledConditionContainer,
  StyledEmptyCardContainer,
  StyledFadeInStack,
  StyledGridContainer,
  StyledScrollContainer,
};
