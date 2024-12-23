import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { RenderCardParams } from "../types";
import { StyledFadeInStack } from "../../../BusinessRules/styles";
import { BusinessRuleCard } from "../../../BusinessRules/Cards/BusinessRuleCard";
import { BusinessRuleView } from "../../../BusinessRules/BusinessRuleView";

function renderDecisionCard({
  decision,
  controls,
  handleOpenModal,
  handleDelete,
  textValues,
}: RenderCardParams): JSX.Element | null {
  if (!decision) return null;

  return (
    <StyledFadeInStack key={decision.decisionId}>
      <Stack direction="column" gap="4px" width="100%" padding="0 0 12px 0">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {decision.decisionId}
        </Text>
        <BusinessRuleCard
          id={decision.decisionId!}
          handleDelete={() => handleDelete(decision.decisionId!)}
          handleView={() => handleOpenModal(decision)}
          controls={controls}
        >
          <BusinessRuleView decision={decision} textValues={textValues} />
        </BusinessRuleCard>
      </Stack>
    </StyledFadeInStack>
  );
}

export { renderDecisionCard };
