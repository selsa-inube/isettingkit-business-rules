import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 4px 0px 2px;
  gap: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral.N30 ?? inube.palette.neutral.N30};
  cursor: pointer;
`;

export { StyledContainer };
