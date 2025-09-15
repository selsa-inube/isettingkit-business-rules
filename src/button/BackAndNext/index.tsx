import {
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";
import { StyledSendButton } from "./styles";

import { Button, IButton } from "@inubekit/inubekit";
import { IBackAndNextButton } from "../types/IBackAndNextButton";

const BackAndNextButton = (props: IBackAndNextButton) => {
  const { handleBack, handleNext, textValues } = props;
  return (
    <StyledSendButton>
      <Button
        {...props}
        iconBefore={<MdOutlineArrowCircleLeft />}
        variant="none"
        onClick={handleBack}
        children={textValues.back}
      />
      <Button
        {...props}
        iconBefore={<MdOutlineArrowCircleRight />}
        variant="none"
        onClick={handleNext}
        children={textValues.next}
      />
    </StyledSendButton>
  );
};

export { BackAndNextButton };
export type { IButton };
