import { IRuleDecision } from "@isettingkit/input";

const sortDisplayDataSampleSwitchPlaces = (decision: IRuleDecision) => {
  const data: IRuleDecision = { ...decision };
  const conditionToDisplay = data.conditionThatEstablishesTheDecision?.find(
    (condition) => condition.switchPlaces,
  );

  if (conditionToDisplay) {
    return {
      ...data,
      ruleName: conditionToDisplay.conditionName,
      labelName: conditionToDisplay.labelName,
      decisionDataType: conditionToDisplay.conditionDataType,
      value: conditionToDisplay.value,
      howToSetTheDecision: conditionToDisplay.howToSetTheCondition,
      conditionThatEstablishesTheDecision:
        data.conditionThatEstablishesTheDecision!.map((condition) =>
          condition.conditionName === conditionToDisplay.conditionName
            ? { ...condition, hidden: true }
            : condition,
        ),
    };
  }

  return data;
};

export { sortDisplayDataSampleSwitchPlaces };
