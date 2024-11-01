import { useFormik } from "formik";
import { useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";

import { RulesFormUI } from "./interface";
import { IRulesFormTextValues } from "./types";
import { ValueValidationSchema } from "./utils";

interface IRulesForm {
  id: string;
  decision: IRuleDecision;
  onCloseModal: () => void;
  onCancel: () => void;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
  textValues: IRulesFormTextValues;
}

const RulesForm = (prop: IRulesForm) => {
  const { id, decision, onCancel, onSubmitEvent, textValues } = prop;
  const [DataDecision, setDataDecision] = useState(decision);
  const handleFieldChange = (fieldName: string, value: IValue) => {
    formik.setFieldValue(fieldName, value);
    formik.validateField(fieldName);
  };
  const onCondition = (value: IValue, nameCondition: string) => {
    setDataDecision((DataDecisionRule) => {
      const conditions = DataDecisionRule?.conditions?.map((condition) => {
        if (condition.name === nameCondition) {
          return { ...condition, value };
        }
        return condition;
      });
      handleFieldChange(nameCondition, value);
      return { ...DataDecisionRule, conditions };
    });
  };

  const onDecision = (value: IValue) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "value", value),
    );
  };

  const onEndChange = (value: string) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "endDate", new Date(value)),
    );
  };

  const onStartChange = (value: string) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "startDate", new Date(value)),
    );
  };

  const { validationSchema, initialValues } =
    ValueValidationSchema(DataDecision);

  validationSchema
    .validate(initialValues, { abortEarly: false })
    .then(() => console.log("Validation passed"))
    .catch((err) => console.log("Validation failed:", err.errors));

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {
      onSubmitEvent(DataDecision);
    },
  });

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

  return (
    <RulesFormUI
      id={id}
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
