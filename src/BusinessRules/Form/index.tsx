import { useFormik } from "formik";
import { useState } from "react";

import { RulesFormUI } from "./interface";
import { IRulesFormTextValues } from "./types";
import { ValueValidationSchema } from "./utils";
import { IRuleDecision, IValue } from "@isettingkit/input";

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
  const handleFieldChange = (
    fieldName: string,
    value: string | number | IValue | string[],
  ) => {
    formik.setFieldValue(fieldName, value);
    formik.validateField(fieldName);
  };

  const onCondition = (
    value: string | number | string[] | IValue | Date,
    nameCondition: string,
  ) => {
    const processedValue = value instanceof Date ? value.toISOString() : value;

    setDataDecision((DataDecisionRule) => {
      if (!DataDecisionRule.conditions) {
        return DataDecisionRule;
      }

      const updatedConditions = DataDecisionRule.conditions.map((condition) => {
        if (condition.name === nameCondition) {
          return { ...condition, value: processedValue };
        }
        return condition;
      });

      return {
        ...DataDecisionRule,
        conditions: updatedConditions,
      };
    });

    handleFieldChange(nameCondition, processedValue);
  };

  const onDecision = (value: string | number | string[] | IValue | Date) => {
    // if (
    //   typeof value === "object" &&
    //   (value instanceof Date || "someProperty" in value)
    // ) {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "value", value),
    );
    // } else {
    //   console.warn("Invalid type for value:", value);
    // }
  };

  const onEndChange = (value: string) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "endDate", value),
    );
  };

  const onStartChange = (value: string) => {
    setDataDecision((prevDataDecision) =>
      updateDataDecision(prevDataDecision, "startDate", value),
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
    value: string | number | string[] | IValue | Date,
  ) => {
    return {
      ...prevDataDecision,
      ...prevDataDecision.decision!,
      [field]: value,
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
