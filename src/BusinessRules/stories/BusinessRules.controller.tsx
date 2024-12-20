import { useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { BusinessRules } from "..";
import { IRulesFormTextValues } from "../Form/types";

interface IBusinessRulesController {
  controls?: boolean;
  initialDecisions: IRuleDecision[];
  textValues: IRulesFormTextValues;
  decisionTemplate: IRuleDecision;
  loading?: boolean;
}

const BusinessRulesController = ({
  controls,
  initialDecisions,
  textValues,
  decisionTemplate,
  loading = false,
}: IBusinessRulesController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<IRuleDecision[]>(initialDecisions);

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
          decisionId: `Decisión ${decisions.length + 1}`,
          conditions: decisionTemplate.conditionThatEstablishesTheDecision!.map(
            (conditionTemplate, index) => ({
              ...conditionTemplate,
              value:
                dataDecision.conditionThatEstablishesTheDecision![index]
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

  useEffect(() => {
    // console.log("Updated decisions:", JSON.stringify(decisions, null, 2));
  }, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prevDecisions) =>
      prevDecisions.filter((decision) => decision.decisionId !== id),
    );
  };

  return (
    <BusinessRules
      controls={controls}
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

export { BusinessRulesController };
export type { IBusinessRulesController };
