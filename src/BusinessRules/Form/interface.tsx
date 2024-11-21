import { useEffect } from "react";
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

import { Button } from "@inubekit/button";
import { findNestedError, IRangeMessages } from "./utils";
import { ToggleOption } from "./ToggleOption";

import { Term } from "./Term";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";

interface IRulesFormUI {
  checkNone?: boolean;
  decision: IRuleDecision;
  id: string;
  formik: FormikValues;
  handleToggleChange: (conditionName: string, isChecked: boolean) => void;
  hasErrors: boolean;
  onCancel: () => void;
  onChangeCondition: (
    value: string | number | string[] | IValue | Date,
    nameCondition: string,
  ) => void;
  onChangeDecision: (
    value: string | number | string[] | IValue | Date,
    nameDecision: string,
  ) => void;
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
  setCheckNone: (value: boolean) => void;
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
    checkNone,
    setCheckNone,
    handleToggleChange,
    hasErrors,
  } = props;

  const mapper = {
    name: decision.name,
    dataType: decision.dataType,
    value: decision.value,
    valueUse: decision.valueUse,
    possibleValue: decision.possibleValue,
  };

  useEffect(() => {
    console.log("Updated formik.errors in RulesFormUI:", formik.errors);
  }, [formik.errors]);

  const handleToggleNone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNone(e.target.checked);
  };

  const getFieldStatus = (fieldName: string) => {
    const error = findNestedError(formik.errors[fieldName] || {});
    console.log(
      "getFieldStatus(error): ",
      findNestedError(formik.errors[fieldName]),
    );
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
    return error;
  };
  console.log(
    "getFieldMessage: ",
    getFieldStatus(decision.name),
    " - getFieldMessage: ",
    getFieldMessage(formik.errors[decision.name]),
  );
  return (
    <Stack direction="column" gap="24px">
      {decision && (
        <DecisionConditionRenderer
          element={mapper}
          onDecision={onChangeDecision}
          valueData={formik.values[decision.name]}
          message={formik.errors[decision.name]}
          status={getFieldStatus(decision.name) as IInputStatus}
          textValues={{
            selectOptions: "Select an option",
            selectOption: "Option selected",
            rangeMin: (label: string) => `Minimum ${label}`,
            rangeMax: (label: string) => `Maximum ${label}`,
          }}
        />
      )}
      <Divider dashed />
      <StyledConditionContainer>
        <StyledScrollContainer>
          <Stack
            direction="column"
            padding="6px 12px"
            gap="16px"
            height="272px"
          >
            <Stack direction="row" justifyContent="space-between">
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
            <Stack direction="column" gap="20px">
              {decision.conditions &&
                decision.conditions
                  .filter((condition) => !condition.hidden)
                  .map((condition) => (
                    <ToggleOption
                      key={condition.name}
                      checked={!checkNone}
                      handleToggleChange={(e) => {
                        const isChecked = e.target.checked;
                        handleToggleChange(condition.name, isChecked);
                        if (!isChecked) {
                          onChangeCondition(
                            {
                              value: "",
                              to: 0,
                              from: 0,
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
                      <DecisionConditionRenderer
                        element={condition}
                        onDecision={onChangeCondition}
                        valueData={formik.values[condition.name]}
                        message={
                          getFieldMessage(condition.name) as string | object
                        }
                        status={getFieldStatus(condition.name) as IInputStatus}
                        textValues={{
                          selectOptions: "Select an option",
                          selectOption: "Option selected",
                          rangeMin: (label: string) => `Minimum ${label}`,
                          rangeMax: (label: string) => `Maximum ${label}`,
                        }}
                        type="condition"
                      />
                    </ToggleOption>
                  ))}
            </Stack>
          </Stack>
        </StyledScrollContainer>
      </StyledConditionContainer>
      <Divider dashed />
      <Stack direction="column">
        {decision && (
          <Term
            onHandleStartChange={(e: { target: { value: string } }) =>
              onStartChange(e.target.value)
            }
            onHandleEndChange={(e: { target: { value: string } }) =>
              onEndChange(e.target.value)
            }
            labelStart={textValues.termStart}
            labelEnd={textValues.termEnd}
            checkedClosed={decision.endDate ? true : false}
            valueStart={String(decision.startDate)}
            valueEnd={String(decision.endDate) || ""}
            required
          />
        )}
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="end" gap="16px">
        <Button appearance="gray" onClick={onCancel}>
          {textValues.cancel}
        </Button>
        <Button
          onClick={onSubmit}
          // disabled={!formik.isValid}
          disabled={hasErrors}
          type="submit"
        >
          {textValues.confirm}
        </Button>
      </Stack>
    </Stack>
  );
};

export { RulesFormUI };
