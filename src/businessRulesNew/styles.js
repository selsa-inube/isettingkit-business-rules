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

const StyledEmptyCardContainerNew = styled.div`
  & > div {
    box-shadow: 0px 2px 3px 0px
      ${({ theme }) =>
        theme?.palette?.neutralAlpha?.N30A || inube.palette.neutralAlpha.N30A};
    cursor: pointer;
  }
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
  StyledEmptyCardContainerNew,
  StyledFadeInStack,
  StyledGridContainer,
  StyledScrollContainer,
};
