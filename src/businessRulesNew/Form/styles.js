import { inube } from "@inubekit/inubekit";
import styled from "styled-components";

const StyledConditionContainer = styled.div`
  & > div {
    border-radius: 8px;
    border: 1px solid
      ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }
`;

const StyledScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
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
const StyledConditionFieldContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  & > div   {
    width: -webkit-fill-available;
  }

  & > div  > p {
    padding-right: 32px;
    text-wrap-mode: nowrap;
  }
  & > div > div  > p {
    // padding-right: 32px;
    text-wrap-mode: nowrap;
  }
`;

export { StyledConditionContainer, StyledConditionFieldContainer, StyledScrollContainer };
