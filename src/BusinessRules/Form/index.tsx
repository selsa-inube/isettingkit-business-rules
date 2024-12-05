/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IRuleDecision,
  MultipleChoices,
  InputRange,
  DynamicField,
  ValueHowToSetUp,
  IInputStatus,
} from "@isettingkit/input";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";
import { Term } from "./Term";
import { Toggle } from "@inubekit/toggle";
import { Text } from "@inubekit/text";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { ToggleOption } from "./ToggleOption";
import { useRulesFormUtils } from "./utils";
import { IRulesFormTextValues, ITextfieldInputType } from "./types";

interface IRulesForm {
  decision: IRuleDecision;
  onSubmitEvent: (dataDecision: IRuleDecision) => void;
  textValues: IRulesFormTextValues;
  onCancel: () => void;
}
type FormikErrors = {
  value?: any;
};
type FormikTouched = {
  value?: any;
};
function RulesForm(props: IRulesForm) {
  const { decision, onSubmitEvent, textValues, onCancel } = props;
  const { formik, handleToggleNoneChange } = useRulesFormUtils({
    decision,
    onSubmitEvent,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap="24px">
        <InputRange
          id="valueRange"
          typeInput={decision.dataType.toLowerCase() as ITextfieldInputType}
          label={decision.name}
          valueFrom={formik.values.value.from}
          valueTo={formik.values.value.to}
          handleInputChangeFrom={(value) =>
            formik.setFieldValue("value.from", value)
          }
          handleInputChangeTo={(value) =>
            formik.setFieldValue("value.to", value)
          }
          messageFrom={(formik.errors.value as FormikErrors["value"])?.from}
          messageTo={(formik.errors.value as FormikErrors["value"])?.to}
          statusFrom={
            ((formik.touched.value as FormikTouched["value"])?.from
              ? (formik.errors.value as FormikErrors["value"])?.from
                ? "invalid"
                : "valid"
              : "pending") as IInputStatus
          }
          statusTo={
            ((formik.touched.value as FormikTouched["value"])?.to
              ? (formik.errors.value as FormikErrors["value"])?.to
                ? "invalid"
                : "valid"
              : "pending") as IInputStatus
          }
          onBlur={formik.handleBlur as any}
        />
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
                    {condition.valueUse ===
                    ValueHowToSetUp.LIST_OF_VALUES_MULTI ? (
                      <MultipleChoices
                        id={condition.name}
                        labelSelect={condition.name}
                        labelSelected={`Selected ${condition.name}`}
                        options={
                          condition.possibleValue?.list?.map((item) => ({
                            id: item,
                            label: item,
                            checked: (
                              formik.values.conditions[condition.name] || []
                            ).includes(item),
                          })) as any
                        }
                        onHandleSelectCheckChange={(newOptions) => {
                          const selectedValues = newOptions
                            .filter((option) => option.checked)
                            .map((option) => option.id);

                          formik.setFieldValue(
                            `conditions.${condition.name}`,
                            selectedValues,
                          );
                          formik.setFieldTouched(
                            `conditions.${condition.name}`,
                            true,
                            true,
                          );
                        }}
                        placeholderSelect={`Select ${condition.name}`}
                        message={
                          formik.touched.conditions?.[condition.name] &&
                          formik.errors.conditions?.[condition.name]
                            ? (formik.errors.conditions[
                                condition.name
                              ] as string)
                            : undefined
                        }
                        onBlur={() =>
                          formik.setFieldTouched(
                            `conditions.${condition.name}`,
                            true,
                            true,
                          )
                        }
                      />
                    ) : (
                      <DynamicField
                        type={condition.dataType.toLowerCase()}
                        name={`conditions.${condition.name}`}
                        label={condition.name}
                        value={formik.values.conditions[condition.name]}
                        onChange={(value) =>
                          formik.setFieldValue(
                            `conditions.${condition.name}`,
                            value,
                          )
                        }
                        messageValidate={String(
                          formik.errors.conditions?.[condition.name],
                        )}
                        statusValidate={
                          formik.touched.conditions?.[condition.name]
                            ? formik.errors.conditions?.[condition.name]
                              ? "invalid"
                              : "valid"
                            : undefined
                        }
                        onBlur={formik.handleBlur as any}
                      />
                    )}
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
            if (!isClosed) formik.setFieldValue("endDate", "");
          }}
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
}

export { RulesForm };
export type { IRulesForm };
