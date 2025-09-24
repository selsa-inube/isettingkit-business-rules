import {
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";
import { StyledSendButton } from "./styles";

import { Button, IButton } from "@inubekit/inubekit";
import { IBackAndNextButton } from "../types/IBackAndNextButton";

const BackAndNextButton = (props: IBackAndNextButton) => {
  const { handleBack, handleNext, disabledBack, disabledNext, textValues } =
    props;
  return (
    <StyledSendButton>
      <Button
        {...props}
        iconBefore={<MdOutlineArrowCircleLeft />}
        variant="none"
        onClick={handleBack}
        children={textValues.back}
        disabled={disabledBack}
      />
      <Button
        {...props}
        iconBefore={<MdOutlineArrowCircleRight />}
        variant="none"
        onClick={handleNext}
        children={textValues.next}
        disabled={disabledNext}
      />
    </StyledSendButton>
  );
};

export { BackAndNextButton };
export type { IButton };
