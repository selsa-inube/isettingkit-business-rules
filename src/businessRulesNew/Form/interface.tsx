/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Stack,
  Button,
  Text,
  Fieldset,
  Tabs,
  Icon,
} from "@inubekit/inubekit";
import { DecisionConditionRenderNew } from "@isettingkit/input";
import { StyledConditionFieldContainer } from "./styles";
import { Term } from "./Term";
import { IRulesFormUI } from "../types/Forms/IRulesFormUI";
import { useState } from "react";
import { MdCached, MdInfo, MdOutlineDelete } from "react-icons/md";

const tabs = [
  { id: "mainCondition",        label: "Condición principal",    isDisabled: false },
  { id: "alternateCondition-1", label: "Condición alterna N° 01", isDisabled: false },
  { id: "alternateCondition-2", label: "Condición alterna N° 02", isDisabled: false },
];

const TAB_TO_GROUP: Record<string, string> = {
  "mainCondition": "group-primary",
  "alternateCondition-1": "aditional-group-1",
  "alternateCondition-2": "aditional-group-2",
};


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
    visibleConditionsByGroup
  } = props;

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleTabChange = (id: string) => setActiveTab(id);

  const groupKey = TAB_TO_GROUP[activeTab] ?? "group-primary";
  const currentConditions = visibleConditionsByGroup[groupKey] ?? [];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap="24px" width="100%">
        <Fieldset legend="Decisión N° 01" spacing="wide">
          <Stack justifyContent="center" width="-webkit-fill-available">
            {DecisionConditionRenderNew({
              condition: normalizedDecision,
              formik,
              isDecision: true,
            })}
          </Stack>
        </Fieldset>
        <Fieldset legend="Condiciones a evaluar" spacing="wide">
          <Stack direction="column" gap="20px" width="100%">
            <Tabs onChange={handleTabChange} tabs={tabs} selectedTab={activeTab} />
            <Stack justifyContent="flex-end" alignItems="center">
              <Icon icon={<MdInfo />} appearance="help" />
              <Button iconBefore={<MdCached />} variant="none" appearance="gray" onClick={() => { }}>
                Redefinir la condición
              </Button>
            </Stack>
            <Stack direction="column" gap="20px">


              {currentConditions?.map((condition) => (
                <Stack key={condition.conditionName} gap="16px" alignItems="center">
                  <StyledConditionFieldContainer>
                    <DecisionConditionRenderNew condition={condition as any} formik={formik} />
                  </StyledConditionFieldContainer>
                  <Icon
                    icon={<MdOutlineDelete />}
                    appearance="danger"
                    cursorHover
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
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
