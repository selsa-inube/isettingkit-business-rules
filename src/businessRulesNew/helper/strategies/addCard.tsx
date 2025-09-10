import { MdAdd } from "react-icons/md";
import { Icon, Text, Stack } from "@inubekit/inubekit";

import { IRenderCard } from "../../../businessRules/types/helper";
import { BorderStack } from "../../../filter/BorderStack";
import {
  StyledEmptyCardContainerNew,
  StyledFadeInStack,
} from "../../../businessRulesNew/styles";

const renderAddCard = (props: IRenderCard) => {
  const {
    customTitleContentAddCard,
    index,
    handleOpenModal,
    shouldRenderEmptyMessage,
  } = props;
  const title = customTitleContentAddCard
    ? customTitleContentAddCard
    : "Agregar decisión";
  return (
    <StyledFadeInStack key={`add-decision-${index}`}>
      {shouldRenderEmptyMessage ? null : (
        <StyledEmptyCardContainerNew
          onClick={() => (handleOpenModal ? handleOpenModal() : null)}
        >
          <BorderStack
            direction="column"
            gap="4px"
            width="100%"
            height="100%"
            background
            borderRadius="8px"
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              padding="16px"
            >
              <Text appearance="gray" type="label" size="large" weight="bold">
                {title}
              </Text>
              <Icon
                appearance="gray"
                icon={<MdAdd />}
                size="24px"
                cursorHover
              />
            </Stack>
          </BorderStack>
        </StyledEmptyCardContainerNew>
      )}
    </StyledFadeInStack>
  );
};

export { renderAddCard };
