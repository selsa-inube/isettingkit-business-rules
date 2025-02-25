/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/inubekit";
import { DecisionViewConditionRenderer } from "@isettingkit/view";

import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { StyledConditionContainer, StyledScrollContainer } from "./styles";
import { Divider } from "@inubekit/inubekit";
import { SkeletonLine } from "@inubekit/inubekit";
import { IRulesFormTextValues } from "../Form/types";
import { getValueData } from "./helper/getValueData";

interface IBusinessRuleView {
  decision?: IRuleDecision;
  loading?: boolean;
  textValues?: IRulesFormTextValues;
}

const BusinessRuleView = (props: IBusinessRuleView) => {
  const { decision, loading = false, textValues } = props;

  const mapper: IRuleDecision = {
    labelName: decision?.labelName || "",
    decisionDataType: decision?.decisionDataType || "alphabetical",
    value: getValueData(decision!),
    howToSetTheDecision: decision?.howToSetTheDecision || "EqualTo",
  };

  return !loading && decision && textValues ? (
    <Stack direction="column" gap="12px">
      {decision && (
        <Stack key={decision.ruleName} direction="column" alignItems="center">
          <DecisionViewConditionRenderer
            element={mapper as any}
            valueData={getValueData(mapper)}
            type="decision"
          />
        </Stack>
      )}
      <Divider dashed />
      <StyledScrollContainer>
        <Stack
          direction="column"
          gap="12px"
          justifyContent="space-between"
          height="203px"
        >
          <Text
            type="label"
            size="large"
            appearance="dark"
            weight="bold"
            textAlign="center"
          >
            {textValues.factsThatConditionIt}
          </Text>
          {decision.conditionThatEstablishesTheDecision &&
            decision.conditionThatEstablishesTheDecision.map((condition) => {
              if (condition.hidden) return null;
              return (
                <StyledConditionContainer key={condition.conditionName}>
                  <Stack direction="column" padding="8px">
                    <DecisionViewConditionRenderer
                      element={{
                        ...condition,
                        value: condition.value as any,
                      }}
                      valueData={getValueData(condition)}
                    />
                  </Stack>
                </StyledConditionContainer>
              );
            })}
          <Divider dashed />
          <Stack direction="column" gap="12px">
            {decision?.effectiveFrom && decision?.validUntil && (
              <DecisionViewConditionRenderer
                key={textValues.terms}
                element={{
                  labelName: textValues.terms,
                  value: String(decision.effectiveFrom),
                  howToSetTheDecision: ValueHowToSetUp.RANGE,
                  decisionDataType: ValueDataType.DATE,
                }}
                valueData={getValueData({
                  labelName: textValues.terms,
                  value: {
                    from: String(decision.effectiveFrom),
                    to: String(decision.validUntil),
                  },
                  howToSetTheDecision: ValueHowToSetUp.RANGE,
                  decisionDataType: ValueDataType.DATE,
                })}
                type="decision"
              />
            )}
            {decision?.effectiveFrom && !decision?.validUntil && (
              <DecisionViewConditionRenderer
                key={textValues.terms}
                element={{
                  labelName: textValues.terms,
                  value: String(decision.effectiveFrom),
                  howToSetTheDecision: ValueHowToSetUp.EQUAL,
                  decisionDataType: ValueDataType.DATE,
                }}
                valueData={getValueData({
                  labelName: textValues.terms,
                  value: String(decision.effectiveFrom),
                  howToSetTheDecision: ValueHowToSetUp.EQUAL,
                  decisionDataType: ValueDataType.DATE,
                })}
                type="decision"
              />
            )}
          </Stack>
        </Stack>
      </StyledScrollContainer>
    </Stack>
  ) : (
    <Stack direction="column" gap="12px">
      <Stack key="loading" direction="column" alignItems="center" gap="4px">
        <SkeletonLine animated width="180px" />
        <SkeletonLine animated width="85px" />
      </Stack>
      <Stack direction="column" gap="12px" alignItems="center">
        <Divider dashed />
        <SkeletonLine animated width="150px" />
      </Stack>

      <StyledScrollContainer>
        <Stack
          direction="column"
          gap="12px"
          justifyContent="space-between"
          height="203px"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <StyledConditionContainer key={`condition-${index}`}>
              <Stack
                direction="column"
                gap="12px"
                alignItems="start"
                padding="8px"
              >
                <SkeletonLine animated width="180px" />
                <SkeletonLine animated width="85px" />
              </Stack>
            </StyledConditionContainer>
          ))}
        </Stack>
      </StyledScrollContainer>
    </Stack>
  );
};

export { BusinessRuleView };
export type { IBusinessRuleView };
