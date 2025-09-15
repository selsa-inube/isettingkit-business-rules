/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Stack,
  Button,
  Toggle,
  Text,
  Fieldset,
  Tabs,
} from "@inubekit/inubekit";
import { DecisionConditionRender } from "@isettingkit/input";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { ToggleOption } from "./ToggleOption";
import { Term } from "./Term";
import { IRulesFormUI } from "../types/Forms/IRulesFormUI";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
import { useEffect, useState } from "react";

const tabs = [
  {
    id: "mainCondition",
    label: "Condición principal",
    isDisabled: false,
  },
  {
    id: "alternateCondition-1",
    label: "Condición alterna N° 01",
    isDisabled: false,
  },
  {
    id: "alternateCondition-2",
    label: "Condición  alterna N° 02",
    isDisabled: false,
  },
];

const RulesFormUI = (props: IRulesFormUI) => {
  const {
    formik,
    textValues,
    onCancel,
    visibleConditions,
    normalizedDecision,
    handleToggleNoneChange,
    handleConditionToggleChange,
    showConditionsError,
    termStartStatus,
    termEndStatus,
  } = props;

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleTabChange = (id: string) => setActiveTab(id);
  const component = location.pathname.split("/").pop();
  useEffect(() => {
    setActiveTab(tabs[0].id);
  }, [component]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap="24px" width="100%">
        <Fieldset legend="Decisión N° 01" spacing="wide">
          {DecisionConditionRender({
            condition: normalizedDecision,
            formik,
            isDecision: true,
          })}
        </Fieldset>
        <Fieldset legend="Condiciones a evaluar" spacing="wide">
          <Tabs
            onChange={handleTabChange}
            tabs={tabs}
            selectedTab={activeTab}
          />
          <StyledConditionContainer>
            <StyledScrollContainer>
              <Stack
                direction="column"
                padding="6px 12px"
                gap="16px"
                height="272px"
              >
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  gap="64px"
                >
                  <Text
                    type="title"
                    size="small"
                    weight="bold"
                    appearance="gray"
                  >
                    {textValues.factsThatConditionIt}
                  </Text>
                  <Toggle
                    id="toggleNone"
                    onChange={() =>
                      handleToggleNoneChange(!formik.values.toggleNone)
                    }
                    checked={formik.values.toggleNone}
                    size="small"
                  >
                    <Text as="span" size="medium" type="label" weight="bold">
                      {textValues.none}
                    </Text>
                  </Toggle>
                </Stack>

                <Stack direction="column" gap="20px">
                  {visibleConditions?.map((condition) => (
                    <ToggleOption
                      key={condition.conditionName}
                      id={`toggle-${condition.conditionName}`}
                      name={`toggle.${condition.conditionName}`}
                      labelToggle={condition.labelName}
                      checked={
                        !formik.values.toggleNone &&
                        formik.values.conditionsThatEstablishesTheDecision[
                          condition.conditionName
                        ] !== undefined
                      }
                      handleToggleChange={(e) =>
                        handleConditionToggleChange(
                          condition.conditionName,
                          condition.howToSetTheCondition ===
                            EValueHowToSetUp.LIST_OF_VALUES_MULTI,
                        )(e.target.checked)
                      }
                    >
                      {DecisionConditionRender({ condition, formik } as any)}
                    </ToggleOption>
                  ))}
                </Stack>
              </Stack>
            </StyledScrollContainer>
          </StyledConditionContainer>
        </Fieldset>

        <Fieldset legend="Vigencia" spacing="wide">
          {textValues.terms && (
            <>
              <Term
                labelStart={textValues.termStart}
                labelEnd={textValues.termEnd}
                valueStart={formik.values.effectiveFrom}
                valueEnd={formik.values.validUntil}
                messageStart={formik.errors.effectiveFrom}
                messageEnd={formik.errors.validUntil}
                statusStart={termStartStatus}
                statusEnd={termEndStatus}
                onHandleStartChange={(e) =>
                  formik.setFieldValue("effectiveFrom", e.target.value)
                }
                onHandleEndChange={(e) =>
                  formik.setFieldValue("validUntil", e.target.value)
                }
                onCheckClosedChange={(isClosed) => {
                  formik.setFieldValue("checkClosed", isClosed);
                  if (isClosed) {
                    formik.setFieldValue("validUntil", "");
                  }
                }}
                checkedClosed={formik.values.checkClosed}
              />
            </>
          )}
        </Fieldset>
        {showConditionsError && (
          <Text type="label" size="medium" appearance="danger">
            {typeof formik.errors.conditionsThatEstablishesTheDecision ===
            "string"
              ? formik.errors.conditionsThatEstablishesTheDecision
              : "Existen errores en el formulario, por favor revísalos."}
          </Text>
        )}

        <Stack direction="row" justifyContent="end" gap="16px">
          <Button appearance="gray" onClick={onCancel} variant="outlined">
            {textValues.cancel}
          </Button>
          <Button type="submit">{textValues.confirm}</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { RulesFormUI };
