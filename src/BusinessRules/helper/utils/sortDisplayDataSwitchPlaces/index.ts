import { IRuleDecision } from "@isettingkit/input";

const sortDisplayDataSwitchPlaces = (decisions: IRuleDecision[]) =>
  decisions.map((decision) => {
    const conditionToDisplay =
      decision.conditionThatEstablishesTheDecision?.find(
        (condition) => condition.switchPlaces,
      );

    if (conditionToDisplay) {
      return {
        ...decision,
        ruleName: conditionToDisplay.conditionName,
        labelName: conditionToDisplay.labelName,
        decisionDataType: conditionToDisplay.conditionDataType,
        value: conditionToDisplay.value,
        howToSetTheDecision: conditionToDisplay.howToSetTheCondition,
        conditionThatEstablishesTheDecision:
          decision.conditionThatEstablishesTheDecision!.map((condition) =>
            condition.conditionName === conditionToDisplay.conditionName
              ? { ...condition, hidden: true }
              : condition,
          ),
      };
    }

    return decision;
  });

export { sortDisplayDataSwitchPlaces };
