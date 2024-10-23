import { useState } from "react";
import { useFormik } from "formik";
import { RulesFormUI } from "./interface";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { ValueValidationSchema } from "@isettingkit/input";

interface IRulesForm {
  decision: IRuleDecision;
  onCloseModal: () => void;
  onCancel: () => void;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
  portalId: string;
  textValues: {
    selectOptions: string;
    selectOption: string;
    rangeMin: (label: string) => string;
    rangeMax: (label: string) => string;
    reasonForChange: string;
    change: string;
    changePlaceholder: string;
    termStart: string;
    termEnd: string;
    cancel: string;
    confirm: string;
    none: string;
    FactsThatConditionIt: string;
    criteria: string;
  };
}

const updateDataDecision = (
  prevDataDecision: IRuleDecision,
  field: string,
  value: IValue | Date,
) => {
  return {
    ...prevDataDecision,
    decision: { ...prevDataDecision.decision!, [field]: value },
  };
};

const RulesForm = (prop: IRulesForm) => {
  const { decision, onCancel, onSubmitEvent, textValues } = prop;
  const [DataDecision, setDataDecision] = useState(decision);
  const onCondition = (value: IValue, nameCondition: string) => {
    setDataDecision((DataDecisionRule) => {
      const conditions = DataDecisionRule?.conditions?.map((condition) => {
        if (condition.name === nameCondition) {
          return { ...condition, value };
        }
        return condition;
      });
      return { ...DataDecisionRule, conditions };
    });
  };
  const onDecision = (value: IValue) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "value", value),
    );
  };

  const onStartChange = (value: string) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "startDate", new Date(value)),
    );
  };

  const onEndChange = (value: string) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "endDate", new Date(value)),
    );
  };

  const { validationSchema, initialValues } =
    ValueValidationSchema(DataDecision);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: () => {
      onSubmitEvent(DataDecision);
    },
  });

  return (
    <RulesFormUI
      formik={formik}
      decision={DataDecision}
      onCancel={onCancel}
      onSubmit={() => onSubmitEvent(DataDecision)}
      onChangeCondition={onCondition}
      onChangeDecision={onDecision}
      onStartChange={onStartChange}
      onEndChange={onEndChange}
      textValues={textValues}
    />
  );
};

export { RulesForm };
export type { IRulesForm };
