import { BusinessRuleCard } from "../../../BusinessRules/Cards/BusinessRuleCard";
import { BusinessRuleView } from "../../../BusinessRules/BusinessRuleView";
import { IRenderCard } from "../../../BusinessRules/types/helper";

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
