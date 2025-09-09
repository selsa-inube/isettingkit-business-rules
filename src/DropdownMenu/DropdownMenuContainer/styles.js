import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledDropdownContainer = styled.div`
  & > div {
    background: ${({ $background, theme }) =>
      $background
        ? `${theme?.palette?.neutral?.N20 || inube.palette.neutral.N20}`
        : `${theme?.palette?.neutral?.N0 || inube.palette.neutral.N0}`};
  }
  height: 90vh;
`;

export { StyledDropdownContainer };
