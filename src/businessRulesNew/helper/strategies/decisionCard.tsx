import { Stack } from "@inubekit/inubekit";

import { StyledFadeInStack } from "../../../businessRules/styles";
import { IRenderCard } from "../../../businessRules/types/helper";
import { BusinessRuleCardNew } from "../../../businessRulesNew/Cards/BusinessRuleCard";
import { BusinessRuleViewNew } from "../../../businessRulesNew/BusinessRuleView";

const renderDecisionCard = (props: IRenderCard) => {
  const {
    decision,
    controls,
    handleOpenModal,
    handleDelete,
    textValues,
    index,
    isOpen,
    onToggle: handleToggle,
  } = props;
  if (!decision) return null;

  return (
    <StyledFadeInStack key={decision.decisionId}>
      <Stack direction="column" gap="4px" width="100%">
        <BusinessRuleCardNew
          id={decision.decisionId!}
          handleDelete={() =>
            handleDelete ? handleDelete(decision.decisionId!) : null
          }
          handleView={() =>
            handleOpenModal ? handleOpenModal(decision) : null
          }
          controls={controls}
        >
          <BusinessRuleViewNew
            decision={decision}
            textValues={textValues}
            position={index}
            isOpen={!!isOpen}
            onToggle={() => handleToggle?.(!isOpen)}
          />
        </BusinessRuleCardNew>
      </Stack>
    </StyledFadeInStack>
  );
};

export { renderDecisionCard };
