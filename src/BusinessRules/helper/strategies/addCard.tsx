import { MdAdd } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { RenderCardParams } from "../types";
import {
  StyledEmptyCardContainer,
  StyledFadeInStack,
} from "../../../BusinessRules/styles";
import { BusinessRuleCard } from "../../../BusinessRules/Cards/BusinessRuleCard";

function renderAddCard({
  index,
  handleOpenModal,
}: RenderCardParams): JSX.Element {
  return (
    <StyledFadeInStack key={`add-decision-${index}`}>
      <Stack direction="column" gap="4px" width="100%" height="100%">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          Nueva decisión
        </Text>
        <StyledEmptyCardContainer onClick={() => handleOpenModal()}>
          <BusinessRuleCard
            id={`add-decision-${index}`}
            handleDelete={() => {}}
            handleView={() => handleOpenModal()}
            controls={false}
          >
            <Stack direction="column" gap="12px" alignItems="center">
              <Icon appearance="gray" icon={<MdAdd />} size="35px" />
              <Text appearance="gray" type="body" size="large">
                Agregar decisión
              </Text>
            </Stack>
          </BusinessRuleCard>
        </StyledEmptyCardContainer>
      </Stack>
    </StyledFadeInStack>
  );
}

export { renderAddCard };
