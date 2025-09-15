import { StyledSendButton } from "./styles";

import { Button, IButton } from "@inubekit/inubekit";

const SendButton = (props: IButton) => {
  return (
    <StyledSendButton>
      <Button {...props} />
    </StyledSendButton>
  );
};

export { SendButton };
export type { IButton };
