import { BusinessRuleCardNew } from "../../../businessRulesNew/Cards/BusinessRuleCard";
import { IRenderCard } from "../../../businessRules/types/helper";
import { BusinessRuleViewNew } from "../../../businessRulesNew/BusinessRuleView";

const renderLoadingCard = (props: IRenderCard) => {
  const { index, handleOpenModal } = props;
  return (
    <BusinessRuleCardNew
      key={`loading-card-${index}`}
      id={`loading-card-${index}`}
      handleDelete={() => {}}
      handleView={() => (handleOpenModal ? handleOpenModal() : null)}
      controls={false}
    >
      <BusinessRuleViewNew loading />
    </BusinessRuleCardNew>
  );
};

export { renderLoadingCard };
