/* eslint-disable @typescript-eslint/no-explicit-any */
import { DecisionConditionRender, ValueHowToSetUp } from "@isettingkit/input";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";
import { Term } from "./Term";
import { Toggle } from "@inubekit/toggle";
import { Text } from "@inubekit/text";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { ToggleOption } from "./ToggleOption";
import { useRulesFormUtils } from "./utils";
import { IRulesForm } from "./types";

const RulesForm = (props: IRulesForm) => {
  const { decision, onSubmitEvent, textValues, onCancel } = props;
  const { formik, handleToggleNoneChange } = useRulesFormUtils({
    decision,
    onSubmitEvent,
  });

  const normalizedDecision = {
    ruleName: decision.ruleName,
    labelName: decision.labelName,
    howToSetTheCondition: decision.howToSetTheDecision,
    decisionDataType: decision.decisionDataType,
    listOfPossibleValues: decision.listOfPossibleValues,
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap="24px">
        {DecisionConditionRender({
          condition: normalizedDecision,
          formik,
          isDecision: true,
        } as any)}
        <Divider dashed />
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
                <Text type="title" size="small" weight="bold" appearance="gray">
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
                  <Text size="medium" type="label" weight="bold">
                    {textValues.none}
                  </Text>
                </Toggle>
              </Stack>
              <Stack direction="column" gap="20px">
                {decision.conditionThatEstablishesTheDecision?.map(
                  (condition) => {
                    if (condition.hidden) return null;
                    return (
                      <ToggleOption
                        key={condition.conditionName}
                        id={`toggle-${condition.conditionName}`}
                        name={`toggle.${condition.conditionName}`}
                        labelToggle={condition.labelName}
                        checked={
                          !formik.values.toggleNone &&
                          formik.values.conditionThatEstablishesTheDecision[
                            condition.conditionName
                          ] !== undefined
                        }
                        handleToggleChange={(e) => {
                          const isChecked = e.target.checked;
                          if (!isChecked) {
                            formik.setFieldValue(
                              `conditionThatEstablishesTheDecision.${condition.conditionName}`,
                              undefined,
                            );
                            formik.setFieldTouched(
                              `conditionThatEstablishesTheDecision.${condition.conditionName}`,
                              false,
                              false,
                            );
                          } else {
                            const defaultValue =
                              condition.howToSetTheCondition ===
                              ValueHowToSetUp.LIST_OF_VALUES_MULTI
                                ? []
                                : "";
                            formik.setFieldValue(
                              `conditionThatEstablishesTheDecision.${condition.conditionName}`,
                              defaultValue,
                            );
                          }
                        }}
                      >
                        {DecisionConditionRender({ condition, formik } as any)}
                      </ToggleOption>
                    );
                  },
                )}
              </Stack>
            </Stack>
          </StyledScrollContainer>
        </StyledConditionContainer>
        <Divider dashed />
        <Term
          labelStart={textValues.termStart}
          labelEnd={textValues.termEnd}
          valueStart={formik.values.effectiveFrom}
          valueEnd={formik.values.validUntil}
          messageStart={formik.errors.effectiveFrom}
          messageEnd={formik.errors.validUntil}
          statusStart={
            formik.touched.effectiveFrom
              ? formik.errors.effectiveFrom
                ? "invalid"
                : "valid"
              : undefined
          }
          statusEnd={
            formik.touched.validUntil
              ? formik.errors.validUntil
                ? "invalid"
                : "valid"
              : undefined
          }
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
        <Divider />
        {formik.errors.conditionThatEstablishesTheDecision &&
          formik.submitCount > 0 && (
            <Text type="label" size="medium" appearance="danger">
              {String(formik.errors.conditionThatEstablishesTheDecision)}
            </Text>
          )}
        <Stack direction="row" justifyContent="end" gap="16px">
          <Button appearance="gray" onClick={onCancel}>
            {textValues.cancel}
          </Button>
          <Button type="submit">{textValues.confirm}</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { RulesForm };
export type { IRulesForm };
