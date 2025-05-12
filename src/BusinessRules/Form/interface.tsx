/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Stack, Button, Toggle, Text } from "@inubekit/inubekit";
import { DecisionConditionRender } from "@isettingkit/input";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { ToggleOption } from "./ToggleOption";
import { Term } from "./Term";
import { IRulesFormUI } from "../types/Forms/IRulesFormUI";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";

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

        <Divider dashed />
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

        <Divider />

        {showConditionsError && (
          <Text type="label" size="medium" appearance="danger">
            {String(formik.errors.conditionsThatEstablishesTheDecision)}
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

export { RulesFormUI };
