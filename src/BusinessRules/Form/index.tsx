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
    name: decision.name,
    valueUse: decision.valueUse,
    dataType: decision.dataType,
    possibleValue: decision.possibleValue,
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
                {decision.conditions?.map((condition) => (
                  <ToggleOption
                    key={condition.name}
                    id={`toggle-${condition.name}`}
                    name={`toggle.${condition.name}`}
                    labelToggle={condition.name}
                    checked={
                      !formik.values.toggleNone &&
                      formik.values.conditions[condition.name] !== undefined
                    }
                    handleToggleChange={(e) => {
                      const isChecked = e.target.checked;
                      if (!isChecked) {
                        formik.setFieldValue(
                          `conditions.${condition.name}`,
                          undefined,
                        );
                        formik.setFieldTouched(
                          `conditions.${condition.name}`,
                          false,
                          false,
                        );
                      } else {
                        const defaultValue =
                          condition.valueUse ===
                          ValueHowToSetUp.LIST_OF_VALUES_MULTI
                            ? []
                            : "";
                        formik.setFieldValue(
                          `conditions.${condition.name}`,
                          defaultValue,
                        );
                      }
                    }}
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
          valueStart={formik.values.startDate}
          valueEnd={formik.values.endDate}
          messageStart={formik.errors.startDate}
          messageEnd={formik.errors.endDate}
          statusStart={
            formik.touched.startDate
              ? formik.errors.startDate
                ? "invalid"
                : "valid"
              : undefined
          }
          statusEnd={
            formik.touched.endDate
              ? formik.errors.endDate
                ? "invalid"
                : "valid"
              : undefined
          }
          onHandleStartChange={(e) =>
            formik.setFieldValue("startDate", e.target.value)
          }
          onHandleEndChange={(e) =>
            formik.setFieldValue("endDate", e.target.value)
          }
          onCheckClosedChange={(isClosed) => {
            formik.setFieldValue("checkClosed", isClosed);
            if (isClosed) {
              formik.setFieldValue("endDate", "");
            }
          }}
          checkedClosed={formik.values.checkClosed}
        />
        <Divider />
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
