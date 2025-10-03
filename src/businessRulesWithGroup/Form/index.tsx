/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRulesFormUtilsWithGroup } from "./utils";
import { RulesFormUI } from "./interface";
import { IRulesForm } from "../types/Forms/IRulesForm";

const RulesFormWithGroup = (props: IRulesForm) => {
  const { decision, onSubmitEvent, textValues, onCancel } = props;

  const { formik, handleToggleNoneChange } = useRulesFormUtilsWithGroup({
    decision,
    onSubmitEvent,
    textValues,
  });

  const normalizedDecision = {
    ruleName: decision.ruleName,
    labelName: decision.labelName,
    howToSetTheCondition: decision.howToSetTheDecision,
    decisionDataType: decision.decisionDataType,
    listOfPossibleValues: decision.listOfPossibleValues,
  };

  const visibleConditions =
    decision.conditionGroups?.conditionsThatEstablishesTheDecision?.filter(
      (condition: { hidden: any }) => !condition.hidden,
    ) || [];

  const showConditionsError =
    Boolean(formik.errors.conditionsThatEstablishesTheDecision) &&
    formik.submitCount > 0;

  const termStartStatus = formik.touched.effectiveFrom
    ? formik.errors.effectiveFrom
      ? "invalid"
      : "valid"
    : undefined;

  const termEndStatus = formik.touched.validUntil
    ? formik.errors.validUntil
      ? "invalid"
      : "valid"
    : undefined;

  const handleConditionToggleChange =
    (conditionName: string, isMulti: boolean) => (checked: boolean) => {
      if (!checked) {
        formik.setFieldValue(
          `conditionsThatEstablishesTheDecision.${conditionName}`,
          undefined,
        );
        formik.setFieldTouched(
          `conditionsThatEstablishesTheDecision.${conditionName}`,
          false,
          false,
        );
      } else {
        const defaultValue = isMulti ? [] : "";
        formik.setFieldValue(
          `conditionsThatEstablishesTheDecision.${conditionName}`,
          defaultValue,
        );
      }
    };
  console.log("decision", decision, formik);
  console.log("visibleConditions", visibleConditions);
  return (
    <RulesFormUI
      formik={formik}
      onCancel={onCancel!}
      textValues={textValues}
      decision={decision}
      visibleConditions={visibleConditions}
      normalizedDecision={normalizedDecision}
      handleToggleNoneChange={handleToggleNoneChange}
      handleConditionToggleChange={handleConditionToggleChange}
      showConditionsError={showConditionsError}
      termStartStatus={termStartStatus}
      termEndStatus={termEndStatus}
    />
  );
};

export { RulesFormWithGroup };
