import { IRuleDecision } from "@isettingkit/input";

const revertSortedDataSampleSwitchPlaces = (
  dataDecision: IRuleDecision,
  originalDecision: IRuleDecision,
): IRuleDecision => {
  const conditionToRestore = {
    conditionName: dataDecision.ruleName || "",
    labelName: dataDecision.labelName || "",
    conditionDataType: dataDecision.decisionDataType || "alphabetical",
    value: dataDecision.value || "",
    howToSetTheCondition: dataDecision.howToSetTheDecision || "EqualTo",
    switchPlaces: true,
    hidden: false,
  };

  return {
    ...originalDecision,
    conditionsThatEstablishesTheDecision:
      originalDecision.conditionsThatEstablishesTheDecision!.map((condition) =>
        condition.hidden ? { ...conditionToRestore } : condition,
      ),
  };
};

export { revertSortedDataSampleSwitchPlaces };
