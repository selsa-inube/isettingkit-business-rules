import styled from "styled-components";

const StyledSendButton = styled.div`
  & > button {
    height: 66px;
    min-width: 66px;
    border-radius: 16px;
    padding: 12px 16px;

    & > div > div {
      flex-direction: column;
      & > figure > svg {
        width: 20px;
        height: 20px;
      }
      & > p {
        font-weight: 400;
      }
    }
  }
`;

export { StyledSendButton };
