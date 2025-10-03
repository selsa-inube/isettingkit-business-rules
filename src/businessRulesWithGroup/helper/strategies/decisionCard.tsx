import { Text, Stack } from "@inubekit/inubekit";
import { StyledFadeInStack } from "../../../businessRules/styles";
import { BusinessRuleCard } from "../../../businessRules/Cards/BusinessRuleCard";
import { IRenderCard } from "../../../businessRules/types/helper";
import { BusinessRuleViewWithGroup } from "../../../businessRulesWithGroup/BusinessRuleView";

const renderDecisionCard = (props: IRenderCard) => {
  const { decision, controls, handleOpenModal, handleDelete, textValues } =
    props;
  if (!decision) return null;

  return (
    <StyledFadeInStack key={decision.decisionId}>
      <Stack direction="column" gap="4px" width="100%" padding="0 0 12px 0">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {decision.decisionId}
        </Text>
        <BusinessRuleCard
          id={decision.decisionId!}
          handleDelete={() =>
            handleDelete ? handleDelete(decision.decisionId!) : null
          }
          handleView={() =>
            handleOpenModal ? handleOpenModal(decision) : null
          }
          controls={controls}
        >
          <BusinessRuleViewWithGroup
            decision={decision}
            textValues={textValues}
          />
        </BusinessRuleCard>
      </Stack>
    </StyledFadeInStack>
  );
};

export { renderDecisionCard };
