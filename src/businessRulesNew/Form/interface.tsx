/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Stack,
  Button,
  Toggle,
  Text,
  Fieldset,
  Tabs,
  Icon,
} from "@inubekit/inubekit";
import { DecisionConditionRender, DecisionConditionRenderNew } from "@isettingkit/input";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { ToggleOption } from "./ToggleOption";
import { Term } from "./Term";
import { IRulesFormUI } from "../types/Forms/IRulesFormUI";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
import { useEffect, useState } from "react";
import { MdCached, MdInfo, MdOutlineDelete } from "react-icons/md";

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
          {DecisionConditionRenderNew({
            condition: normalizedDecision,
            formik,
            isDecision: true,
          })}
        </Fieldset>
        <Fieldset legend="Condiciones a evaluar" spacing="wide">
          <Stack direction="column" gap="20px" width="100%">
            <Tabs
              onChange={handleTabChange}
              tabs={tabs}
              selectedTab={activeTab}
            />
            <Stack justifyContent="flex-end" alignItems="center">
              <Icon  icon={<MdInfo />} appearance="help" />
              <Button iconBefore={<MdCached/>} variant="none" appearance="gray" onClick={()=> {}}>
                Redefinir la condición
              </Button>
            </Stack>
            <Stack direction="column" gap="20px">
              <Stack direction="column" gap="12px">
                {visibleConditions?.map((condition) => (DecisionConditionRenderNew({ condition, formik } as any)))}
                <Icon icon={<MdOutlineDelete />} appearance="danger" />
              </Stack>
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
