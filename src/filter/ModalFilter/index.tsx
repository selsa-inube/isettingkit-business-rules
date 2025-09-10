import { createPortal } from "react-dom";
import { MdClear, MdOutlineFilterAltOff } from "react-icons/md";
import {
  Blanket,
  Button,
  Divider,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";

import { StyledModal } from "./styles";
import { IFilterModal } from "../types/IFilterModal";

const FilterModal = (props: IFilterModal) => {
  const {
    actionButtonLabel,
    cancelButtonLabel,
    children,
    loading,
    onClick,
    onCloseModal,
    portalId,
    title,
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" gap="16px">
          <Stack alignContent="center" justifyContent="space-between">
            <Text appearance="dark" size="small" type="headline">
              {title}
            </Text>
            <Stack alignItems="center">
              <Text>Cerrar</Text>
              <Icon
                appearance="dark"
                icon={<MdClear />}
                onClick={onCloseModal}
                cursorHover
              />
            </Stack>
          </Stack>
          <Divider />
        </Stack>
        {children}
        <Stack gap="20px" justifyContent="flex-end">
          <Button
            appearance="gray"
            onClick={onCloseModal}
            iconBefore={<MdOutlineFilterAltOff />}
            spacing="wide"
            variant="outlined"
          >
            {cancelButtonLabel}
          </Button>
          <Button
            appearance="primary"
            loading={loading}
            onClick={onClick}
            spacing="wide"
            variant="filled"
          >
            {actionButtonLabel}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};

export { FilterModal };
