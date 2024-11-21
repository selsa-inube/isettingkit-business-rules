import { useFormik } from "formik";
import { useState } from "react";
import { RulesFormUI } from "./interface";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { ValueValidationSchema } from "./utils";
import { IRulesFormTextValues } from "./types";

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
  const [dataDecision, setDataDecision] = useState(decision);
  const [checkNone, setCheckNone] = useState(true);
  const [activeConditions, setActiveConditions] = useState<string[]>([]);
  const [hasErrors, setHasErrors] = useState(false);

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

    setDataDecision((dataDecisionRule) => {
      if (!dataDecisionRule.conditions) {
        return dataDecisionRule;
      }

      const updatedConditions = dataDecisionRule.conditions.map((condition) => {
        if (condition.name === nameCondition) {
          return { ...condition, value: processedValue };
        }
        return condition;
      });

      return {
        ...dataDecisionRule,
        conditions: updatedConditions,
      };
    });

    handleFieldChange(nameCondition, processedValue);
  };

  const handleToggleChange = (conditionName: string, isChecked: boolean) => {
    setActiveConditions((prev) => {
      if (isChecked) {
        return [...prev, conditionName];
      }
      return prev.filter((name) => name !== conditionName);
    });
  };

  const onDecision = (value: string | number | string[] | IValue | Date) => {
    // if (
    //   typeof value === "object" &&
    //   (value instanceof Date || "someProperty" in value)
    // ) {
    setDataDecision((prevdataDecision) =>
      updatedataDecision(prevdataDecision, "value", value),
    );
    // } else {
    //   console.warn("Invalid type for value:", value);
    // }
  };

  const onEndChange = (value: string) => {
    setDataDecision((prevdataDecision) =>
      updatedataDecision(prevdataDecision, "endDate", value),
    );
  };

  const onStartChange = (value: string) => {
    setDataDecision((prevdataDecision) =>
      updatedataDecision(prevdataDecision, "startDate", value),
    );
  };

  const { validationSchema, initialValues } = ValueValidationSchema(
    dataDecision,
    checkNone
      ? decision.conditions?.filter((condition) =>
          activeConditions.includes(condition.name),
        )
      : decision.conditions,
    checkNone,
  );

  validationSchema
    .validate(initialValues, { abortEarly: false })
    .then(() => {
      setHasErrors(false);
      console.log("Validation passed");
    })
    .catch((err) => {
      console.log("Validation failed:", err.errors);
      setHasErrors(true);
    });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {
      onSubmitEvent(dataDecision);
    },
  });

  const updatedataDecision = (
    prevdataDecision: IRuleDecision,
    field: string,
    value: string | number | string[] | IValue | Date,
  ) => {
    return {
      ...prevdataDecision,
      ...prevdataDecision.decision!,
      [field]: value,
    };
  };

  return (
    <RulesFormUI
      id={id}
      formik={formik}
      decision={dataDecision}
      onCancel={onCancel}
      onSubmit={() => onSubmitEvent(dataDecision)}
      onChangeCondition={onCondition}
      onChangeDecision={onDecision}
      onStartChange={onStartChange}
      onEndChange={onEndChange}
      textValues={textValues}
      checkNone={checkNone}
      setCheckNone={setCheckNone}
      handleToggleChange={handleToggleChange}
      hasErrors={hasErrors}
    />
  );
};

export { RulesForm };
export type { IRulesForm };
