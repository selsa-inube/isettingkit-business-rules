import { BusinessRuleCard } from "../../../BusinessRules/Cards/BusinessRuleCard";
import { RenderCardParams } from "../types";
import { BusinessRuleView } from "../../../BusinessRules/BusinessRuleView";

function renderLoadingCard({
  index,
  handleOpenModal,
}: RenderCardParams): JSX.Element {
  return (
    <BusinessRuleCard
      key={`loading-card-${index}`}
      id={`loading-card-${index}`}
      handleDelete={() => {}}
      handleView={() => (handleOpenModal ? handleOpenModal() : null)}
      controls={false}
    >
      <BusinessRuleView loading />
    </BusinessRuleCard>
  );
}

export { renderLoadingCard };
