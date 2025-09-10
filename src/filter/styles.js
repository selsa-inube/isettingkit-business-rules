import styled from "styled-components";

const StyledBoxContainer = styled.div`
  & > div {
    width: 100%;
  }
`;

const StyledOptionContainer = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 1000;
  width: 170px;
`;

const StyledAppliedFilterContainer = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  height: 0;
  overflow: hidden;
`;

const StyledOverFlowIndicator = styled.div`
  cursor: pointer;
`;

export {
  StyledBoxContainer,
  StyledOptionContainer,
  StyledAppliedFilterContainer,
  StyledOverFlowIndicator,
};
