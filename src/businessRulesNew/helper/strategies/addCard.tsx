import { MdAdd } from "react-icons/md";
import { Icon, Text, Stack } from "@inubekit/inubekit";

import {
  StyledEmptyCardContainer,
  StyledFadeInStack,
} from "../../../businessRules/styles";
import { IRenderCard } from "../../../businessRules/types/helper";
import { BorderStack } from "../../../Filter/BorderStack";

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
        <StyledEmptyCardContainer
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
        </StyledEmptyCardContainer>
      )}
    </StyledFadeInStack>
  );
};

export { renderAddCard };
