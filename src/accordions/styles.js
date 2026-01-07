import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledContainer = styled.div`
  display: flex;
  padding: 12px 8px;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  align-items: stretch;
  width: 100%;
  height: auto;
  border: 1px solid
    ${({ theme }) =>
      theme.palette?.neutral?.N40 ?? inube.palette.neutral.N40};
`;

const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export { StyledContainer, StyledHead };
