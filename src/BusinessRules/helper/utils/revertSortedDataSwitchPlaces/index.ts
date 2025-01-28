import { IRuleDecision } from "@isettingkit/input";

const revertSortedDataSwitchPlaces = (decisions: IRuleDecision[]) =>
  decisions.map((decision) => {
    const hiddenCondition = decision.conditionThatEstablishesTheDecision?.find(
      (condition) => condition.hidden,
    );

    if (hiddenCondition) {
      return {
        ...decision,
        ruleName: decision.ruleName,
        labelName: decision.labelName,
        decisionDataType: decision.decisionDataType,
        value: decision.value,
        howToSetTheDecision: decision.howToSetTheDecision,
        conditionThatEstablishesTheDecision:
          decision.conditionThatEstablishesTheDecision!.map((condition) =>
            condition.hidden
              ? { ...hiddenCondition, hidden: false }
              : condition,
          ),
      };
    }

    return decision;
  });

export { revertSortedDataSwitchPlaces };
