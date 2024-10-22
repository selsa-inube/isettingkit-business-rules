import { useState } from "react";
import { FormikValues } from "formik";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";

import { IRuleDecision, IValue } from "@isettingkit/input";
import { ReasonForChange } from "./ReasonForChange";
import { ToggleOption } from "./ToggleOption";

import { Term } from "./Term";
import { DecisionConditionRenderer } from "@isettingkit/input";

interface IRulesFormUI {
  formik: FormikValues;
  decision: IRuleDecision;
  onCancel: () => void;
  onChangeCondition: (value: IValue, nameCondition: string) => void;
  onChangeDecision: (value: IValue, nameDecision: string) => void;
  onEndChange: (value: string) => void;
  onStartChange: (value: string) => void;
  onSubmit: () => void;
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

const RulesFormUI = (props: IRulesFormUI) => {
  const {
    decision,
    formik,
    onChangeCondition,
    onChangeDecision,
    onStartChange,
    onEndChange,
    textValues,
  } = props;
  const [checkNone, setCheckNone] = useState(false);
  const [, setCheckDisabledConfirm] = useState(true);

  const handleToggleNone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNone(e.target.checked);
  };

  const handleReasonForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCheckDisabledConfirm(false);
    } else {
      setCheckDisabledConfirm(true);
    }
  };

  const getFieldState = (formik: FormikValues, fieldName: string) => {
    if (formik.errors[fieldName]) return "invalid";
    return "pending";
  };

  return (
    <Stack direction="column" gap="24px">
      <Stack direction="column" gap="16">
        <Text weight="bold" size="medium">
          {textValues.criteria}
        </Text>
        {decision.decision && (
          <DecisionConditionRenderer
            element={decision.decision}
            onDecision={onChangeDecision}
            valueData={formik.values[decision.decision.name]}
            message={formik.errors[decision.decision.name]}
            status={getFieldState(formik, decision.decision.name)}
            textValues={{
              selectOptions: "Select an option",
              selectOption: "Option selected",
              rangeMin: (label: string) => `Minimum ${label}`,
              rangeMax: (label: string) => `Maximum ${label}`,
            }}
          />
        )}
      </Stack>
      <Divider dashed />
      <Stack direction="column">
        <Stack direction="row" gap="16px" justifyContent="space-between">
          <Text>{textValues.FactsThatConditionIt}</Text>
          <Toggle
            id="toogleNone"
            onChange={handleToggleNone}
            checked={checkNone}
            size="small"
          >
            <Text size="medium" type="label" weight="bold">
              {textValues.none}
            </Text>
          </Toggle>
        </Stack>
        {decision.conditions &&
          decision.conditions.map((condition) => (
            <Stack key={condition.name} direction="column">
              <ToggleOption
                checked={!checkNone}
                handleToggleChange={(e) => {
                  if (!e.target.checked) {
                    onChangeCondition(
                      {
                        value: "",
                        rangeTo: 0,
                        rangeFrom: 0,
                        list: condition.possibleValue!.list,
                      },
                      condition.name,
                    );
                  }
                }}
                id={condition.name.replace(" ", "")}
                labelToggle={condition.name.split(/(?=[A-Z])/).join(" ")}
                name={condition.name.replace(" ", "")}
              >
                {
                  <DecisionConditionRenderer
                    element={condition}
                    onDecision={onChangeCondition}
                    valueData={formik.values[condition.name]}
                    message={formik.errors[condition.name]}
                    status={getFieldState(formik, condition.name)}
                    textValues={{
                      selectOptions: "Select an option",
                      selectOption: "Option selected",
                      rangeMin: (label: string) => `Minimum ${label}`,
                      rangeMax: (label: string) => `Maximum ${label}`,
                    }}
                  />
                }
              </ToggleOption>
            </Stack>
          ))}
      </Stack>
      <Divider dashed />
      <Stack direction="column">
        <ReasonForChange
          label={textValues.reasonForChange}
          labelText={textValues.change}
          onHandleChange={handleReasonForChange}
          placeholder={textValues.changePlaceholder}
          required={true}
        />
      </Stack>
      <Divider dashed />
      <Stack direction="column">
        {decision.decision && (
          <Term
            onHandleStartChange={(e) => onStartChange(e.target.value)}
            onHandleEndChange={(e) => onEndChange(e.target.value)}
            labelStart={textValues.termStart}
            labelEnd={textValues.termEnd}
            checkedClosed={decision.decision.endDate ? true : false}
            valueStart={decision.decision.startDate!.toLocaleDateString(
              "en-CA",
            )}
            valueEnd={
              decision.decision.endDate?.toLocaleDateString("en-CA") || ""
            }
          />
        )}
      </Stack>
    </Stack>
  );
};

export { RulesFormUI };
