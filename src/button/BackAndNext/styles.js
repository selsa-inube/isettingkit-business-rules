import styled from "styled-components";

const StyledSendButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: white;
  box-shadow:
    0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  max-width: 140px;
  width: 100%;
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
