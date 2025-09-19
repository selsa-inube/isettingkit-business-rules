import { useRulesFormUtils } from "./utils";
import { RulesFormUI } from "./interface";
import { IRulesForm } from "../types/Forms/IRulesForm";
import { getConditionsByGroup } from "../helper/utils/getConditionsByGroup";
import { filterByGroup } from "../helper/utils/filterByGroup";

const RulesForm = (props: IRulesForm) => {
  const { decision, onSubmitEvent, textValues, onCancel } = props;

  const { formik, handleToggleNoneChange } = useRulesFormUtils({
    decision,
    onSubmitEvent,
    textValues,
  });
  
  const conditionsByGroup = getConditionsByGroup(decision);
  const visibleConditionsByGroup = filterByGroup(
    conditionsByGroup,
    (c:any) => !c.hidden
  );

  const normalizedDecision = {
    ruleName: decision.ruleName,
    labelName: decision.labelName,
    howToSetTheCondition: decision.howToSetTheDecision,
    decisionDataType: decision.decisionDataType,
    listOfPossibleValues: decision.listOfPossibleValues,
  };

  // const visibleConditions =
  //   decision.conditionsThatEstablishesTheDecision?.filter(
  //     (condition) => !condition.hidden,
  //   ) || [];

      const visibleConditions =
    visibleConditionsByGroup["group-primary"] ?? [];

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

  return (
    <RulesFormUI
      formik={formik}
      onCancel={onCancel!}
      textValues={textValues}
      decision={decision}
      visibleConditions={visibleConditions}
      visibleConditionsByGroup={visibleConditionsByGroup}
      normalizedDecision={normalizedDecision}
      handleToggleNoneChange={handleToggleNoneChange}
      handleConditionToggleChange={handleConditionToggleChange}
      showConditionsError={showConditionsError}
      termStartStatus={termStartStatus}
      termEndStatus={termEndStatus}
    />
  );
};

export { RulesForm };
