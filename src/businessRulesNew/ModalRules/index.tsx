import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { Blanket, Divider } from "@inubekit/inubekit";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/inubekit";
import { StyledContainer, StyledModal } from "./styles";
import { IModalRules } from "../types/IModalRules";

const ModalRulesNew = (props: IModalRules) => {
  const { children, description, portalId, onCloseModal, title , size} = props;
  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <StyledContainer>
      <Blanket>
        <StyledModal $size={size}>
          <Stack direction="column" gap="24px">
            <Stack direction="column" gap="24px">
              <Stack alignItems="center" justifyContent="space-between">
                <Stack direction="column" gap="8px">
                  <Text
                    type="title"
                    size="medium"
                    appearance="dark"
                    weight="bold"
                  >
                    {title}
                  </Text>
                  <Text size="medium" appearance="gray">
                    {description}
                  </Text>
                </Stack>
                <MdClear size="24px" cursor="pointer" onClick={onCloseModal} />
              </Stack>
              <Divider dashed />
            </Stack>
            {children}
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledContainer>,
    node,
  );
};

export { ModalRulesNew };
