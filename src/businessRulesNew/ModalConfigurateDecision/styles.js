import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledMain = styled.div`
  border: 1px solid ${inube.palette.neutral.N40};
  border-radius: 8px;
  padding: 16px;
`;

const StyledModal = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  max-height: 90vh;
  width: ${({ $size }) => ($size ? $size : "600px")};
  max-width: 60rem;
  border-radius: 8px;
  transition: overflow-y 0.3s ease-in-out;
  & > div {
    padding: 24px;
  }
`;
const StyledConditionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    padding: 8px 0px;
    min-height: auto;
  }
`;

export { StyledMain, StyledModal, StyledConditionsContainer };
