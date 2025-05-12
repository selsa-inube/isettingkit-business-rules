import { MdAdd } from "react-icons/md";
import { Icon, Text, Stack } from "@inubekit/inubekit";

import {
  StyledEmptyCardContainer,
  StyledFadeInStack,
} from "../../../BusinessRules/styles";
import { BusinessRuleCard } from "../../../BusinessRules/Cards/BusinessRuleCard";
import { IRenderCard } from "../../../BusinessRules/types/helper";

function renderAddCard(props: IRenderCard) {
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
        <Stack direction="column" gap="4px" width="100%" height="100%">
          <Text type="title" size="medium" appearance="gray" weight="bold">
            Nueva decisión
          </Text>
          <StyledEmptyCardContainer
            onClick={() => (handleOpenModal ? handleOpenModal() : null)}
          >
            <BusinessRuleCard
              id={`add-decision-${index}`}
              handleDelete={() => {}}
              handleView={() => (handleOpenModal ? handleOpenModal() : null)}
              controls={false}
            >
              <Stack direction="column" gap="12px" alignItems="center">
                <Icon appearance="gray" icon={<MdAdd />} size="35px" />
                <Text appearance="gray" type="body" size="large">
                  {title}
                </Text>
              </Stack>
            </BusinessRuleCard>
          </StyledEmptyCardContainer>
        </Stack>
      )}
    </StyledFadeInStack>
  );
}

export { renderAddCard };
