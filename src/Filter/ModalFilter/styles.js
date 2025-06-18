import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  width: ${({ $smallScreen }) => ($smallScreen ? "auto" : "450px")};
  height: auto;
  border-radius: 8px;
  padding: 24px;
  gap: 24px;
  box-sizing: border-box;
`;

export { StyledModal };
