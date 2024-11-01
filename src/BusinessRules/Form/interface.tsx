import { useEffect, useState } from "react";
import { FormikValues } from "formik";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";

import {
  DecisionConditionRenderer,
  IInputStatus,
  IRuleDecision,
  IValue,
} from "@isettingkit/input";
import { ReasonForChange } from "./ReasonForChange";
import { ToggleOption } from "./ToggleOption";

import { Term } from "./Term";

import { Button } from "@inubekit/button";
import { findNestedError, IRangeMessages } from "./utils";

interface IRulesFormUI {
  id: string;
  formik: FormikValues;
  decision: IRuleDecision;
  onCancel: () => void;
  onChangeCondition: (value: IValue, nameCondition: string) => void;
  onChangeDecision: (value: IValue, nameDecision: string) => void;
  onEndChange: (value: string) => void;
  onStartChange: (value: string) => void;
  onSubmit: () => void;
  textValues: {
    cancel: string;
    change: string;
    changePlaceholder: string;
    confirm: string;
    criteria: string;
    factsThatConditionIt: string;
    none: string;
    rangeMax: (label: string) => string;
    rangeMin: (label: string) => string;
    reasonForChange: string;
    selectOption: string;
    selectOptions: string;
    termEnd: string;
    terms: string;
    termStart: string;
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
    onCancel,
    onSubmit,
  } = props;
  const [checkNone, setCheckNone] = useState(false);
  const [checkDisabledConfirm, setCheckDisabledConfirm] = useState(true);
  useEffect(() => {
    console.log("Updated formik.errors in RulesFormUI:", formik.errors);
  }, [formik.errors]);
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

  // const getFieldState = (fieldName: string) => {
  //   const error = formik.errors[fieldName] ? findNestedError(formik.errors[fieldName]) : null;
  //   return error ? "invalid" : "pending";
  // };

  // const getErrorMessage = (fieldName: string | number) => {
  //   return findNestedError(formik.errors[fieldName] || {});
  // };
  const getFieldStatus = (fieldName: string) => {
    const error = findNestedError(formik.errors[fieldName] || {});
    if (typeof error === "string") {
      return error ? "invalid" : "pending";
    }
    return error as IRangeMessages;
  };

  const getFieldMessage = (fieldName: string) => {
    const error = findNestedError(formik.errors[fieldName] || {});
    if (typeof error === "string") {
      return error;
    }
    return error as IRangeMessages;
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
            status={getFieldStatus(decision.decision.name) as IInputStatus}
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
          <Text>{textValues.factsThatConditionIt}</Text>
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
                    message={getFieldMessage(condition.name) as string | object}
                    status={getFieldStatus(condition.name) as IInputStatus}
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
      <Divider dashed />
      <Stack direction="row" justifyContent="end" gap="16px">
        <Button appearance="gray" onClick={onCancel}>
          {textValues.cancel}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={checkDisabledConfirm || !formik.isValid}
          type="submit"
        >
          {textValues.confirm}
        </Button>
      </Stack>
    </Stack>
  );
};

export { RulesFormUI };
