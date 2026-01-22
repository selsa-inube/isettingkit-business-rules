import { Text, Stack } from "@inubekit/inubekit";
import { StyledFadeInStack } from "../../../businessRules/styles";
import { IRenderCard } from "../../../businessRules/types/helper";
import { BusinessRuleViewWithGroup } from "../../../businessRulesWithGroup/BusinessRuleView";
import { BusinessRuleCardWithGroup } from "../../../businessRulesWithGroup/Cards/BusinessRuleCard";

const renderDecisionCard = (props: IRenderCard) => {
  const { decision, controls, handleOpenModal, handleDelete, textValues, index } =
    props;
  if (!decision) return null;
  const titleDecision =
    typeof index === "number"
    ? `Decisión ${index + 1}`
    : decision.decisionId
  
  return (
    <StyledFadeInStack key={decision.decisionId}>
      <Stack direction="column" gap="4px" width="100%" padding="0 0 12px 0">
        <Text type="title" size="medium" appearance="gray" weight="bold">
          {titleDecision}
        </Text>
        <BusinessRuleCardWithGroup
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
        </BusinessRuleCardWithGroup>
      </Stack>
    </StyledFadeInStack>
  );
};

export { renderDecisionCard };
