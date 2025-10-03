import { useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";
import { BusinessRulesWithGroup } from "..";

interface IBusinessRulesController {
  initialDecisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
}

const BusinessRulesWithLoadingController = ({
  initialDecisions,
  textValues,
  decisionTemplate,
}: IBusinessRulesController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<IRuleDecision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDecisions(initialDecisions);
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [initialDecisions]);

  const handleOpenModal = (decision: IRuleDecision | null = null) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const handleSubmitForm = (dataDecision: IRuleDecision) => {
    const isEditing = selectedDecision !== null;

    const newDecision = isEditing
      ? { ...selectedDecision, ...dataDecision }
      : {
          ...decisionTemplate,
          ...dataDecision,
          id: `Decisión ${decisions.length + 1}`,
          conditions:
            decisionTemplate.conditionsThatEstablishesTheDecision!.map(
              (conditionTemplate, index) => ({
                ...conditionTemplate,
                value:
                  dataDecision.conditionsThatEstablishesTheDecision![index]
                    ?.value || conditionTemplate.value,
              }),
            ),
        };

    setDecisions((prevDecisions) =>
      isEditing
        ? prevDecisions.map((decision) =>
            decision.businessRuleId === selectedDecision!.businessRuleId
              ? newDecision
              : decision,
          )
        : [...prevDecisions, newDecision],
    );

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setDecisions((prevDecisions) =>
      prevDecisions.filter((decision) => decision.businessRuleId !== id),
    );
  };

  return (
    <BusinessRulesWithGroup
      decisions={decisions}
      textValues={textValues}
      decisionTemplate={decisionTemplate}
      isModalOpen={isModalOpen}
      selectedDecision={selectedDecision}
      loading={loading}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleSubmitForm={handleSubmitForm}
      handleDelete={handleDelete}
    />
  );
};

export { BusinessRulesWithLoadingController };
export type { IBusinessRulesController };
