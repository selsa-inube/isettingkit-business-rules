import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { Blanket, useMediaQuery } from "@inubekit/inubekit";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/inubekit";
import { StyledContainer, StyledModal } from "./styles";
import { IModalRules } from "../types/IModalRules";

const ModalRules = (props: IModalRules) => {
  const { children, portalId, onCloseModal, title } = props;
  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }
  const smallScreen = useMediaQuery("(max-width: 400px)");

  return createPortal(
    <StyledContainer $smallScreen={smallScreen}>
      <Blanket>
        <StyledModal>
          <Stack direction="column" gap="24px">
            <Stack direction="column" gap="24px">
              <Stack alignItems="center" justifyContent="space-between">
                <Text type="title" size="large" appearance="dark" weight="bold">
                  {title}
                </Text>
                <MdClear size="24px" cursor="pointer" onClick={onCloseModal} />
              </Stack>
            </Stack>

            {children}
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node,
  );
};

export { ModalRules };
