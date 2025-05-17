import { BusinessRuleCard } from "../../../businessRules/Cards/BusinessRuleCard";
import { BusinessRuleView } from "../../../businessRules/BusinessRuleView";
import { IRenderCard } from "../../../businessRules/types/helper";

function renderLoadingCard(props: IRenderCard) {
  const { index, handleOpenModal } = props;
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
