/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Button, Text, Fieldset, Tabs, Icon } from "@inubekit/inubekit";
import { DecisionConditionRenderNew } from "@isettingkit/input";
import { StyledConditionFieldContainer } from "./styles";
import { Term } from "./Term";
import { IRulesFormUI } from "../types/Forms/IRulesFormUI";
import { MdCached, MdInfo, MdOutlineDelete } from "react-icons/md";

const RulesFormUI = (props: IRulesFormUI) => {
  const {
    activeTab,
    conditionsErrorText,
    currentConditions,
    formik,
    normalizedDecision,
    onCancel,
    // onClearCondition,
    // onEndBlur,
    onRedefineCurrentTab,
    // onStartBlur,
    onTabChange,
    showConditionsError,
    tabs,
    termEndStatus,
    termStartStatus,
    textValues,
  } = props;

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
            <Tabs
              onChange={onTabChange!}
              tabs={tabs!}
              selectedTab={activeTab!}
            />
            <Stack justifyContent="flex-end" alignItems="center">
              <Icon icon={<MdInfo />} appearance="help" />
              <Button
                iconBefore={<MdCached />}
                variant="none"
                appearance="gray"
                onClick={onRedefineCurrentTab}
              >
                Redefinir la condición
              </Button>
            </Stack>

            <Stack direction="column" gap="20px">
              {currentConditions?.map((condition: any) => (
                <Stack
                  key={condition.conditionName}
                  gap="16px"
                  alignItems="center"
                >
                  <StyledConditionFieldContainer>
                    <DecisionConditionRenderNew
                      condition={condition}
                      formik={formik}
                    />
                  </StyledConditionFieldContainer>
                  <Icon
                    icon={<MdOutlineDelete />}
                    appearance="danger"
                    cursorHover
                    // onClick={() => onClearCondition(condition.conditionName)}
                  />
                </Stack>
              ))}
            </Stack>

            {showConditionsError && (
              <Text type="label" size="medium" appearance="danger">
                {conditionsErrorText ??
                  "Existen errores en el formulario, por favor revísalos."}
              </Text>
            )}
          </Stack>
        </Fieldset>

        <Fieldset legend="Vigencia" spacing="wide">
          {textValues.terms && (
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
              // onHandleStartBlur={onStartBlur}
              // onHandleEndBlur={onEndBlur}
              onCheckClosedChange={(isClosed) => {
                formik.setFieldValue("checkClosed", isClosed);
                if (isClosed) formik.setFieldValue("validUntil", "");
              }}
              checkedClosed={formik.values.checkClosed}
            />
          )}
        </Fieldset>

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
