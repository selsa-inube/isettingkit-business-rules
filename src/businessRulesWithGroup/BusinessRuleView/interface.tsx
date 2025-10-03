/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Stack, SkeletonLine, Text } from "@inubekit/inubekit";
import {
  DecisionViewConditionRenderer,
  IDecisionViewConditionRenderer,
} from "@isettingkit/view";
import { StyledScrollContainer, StyledConditionContainer } from "./styles";
import { IBusinessRuleViewUI } from "../types/BusinessRuleView/IBusinessRuleViewUI";
import { strategyFactoryHandlerManager } from "./helper";

const BusinessRuleViewUI = (props: IBusinessRuleViewUI) => {
  const {
    conditionsAlignment,
    decision,
    decisionDateElement,
    decisionMapper,
    loading,
    skeleton,
    terms,
    textValues,
    visibleConditions,
  } = props;
  if (loading) {
    return (
      <Stack direction="column" gap="12px">
        <Stack key={decision!.ruleName} direction="column" alignItems="center">
          <DecisionViewConditionRenderer
            element={decisionMapper!}
            valueData={
              strategyFactoryHandlerManager(
                decisionMapper!,
              ) as IDecisionViewConditionRenderer["valueData"]
            }
            type="decision"
          />
        </Stack>
        <Divider dashed />
        <StyledScrollContainer>
          <Stack
            direction="column"
            gap="12px"
            justifyContent={conditionsAlignment}
            height="203px"
          >
            {visibleConditions!.length > 0 && (
              <Text
                type="label"
                size="large"
                appearance="dark"
                weight="bold"
                textAlign="center"
              >
                {textValues!.factsThatConditionIt}
              </Text>
            )}

            {visibleConditions!.length > 0 &&
              visibleConditions!.map((condition: any) => (
                <StyledConditionContainer key={condition.conditionName}>
                  <Stack direction="column" padding="8px">
                    <DecisionViewConditionRenderer
                      element={{ ...condition, value: condition.value }}
                      valueData={
                        strategyFactoryHandlerManager(
                          condition,
                        ) as IDecisionViewConditionRenderer["valueData"]
                      }
                    />
                  </Stack>
                </StyledConditionContainer>
              ))}
            {visibleConditions!.length > 0 && <Divider dashed />}

            {terms && (
              <>
                {decisionDateElement && (
                  <DecisionViewConditionRenderer
                    key={textValues!.terms}
                    element={decisionDateElement.element}
                    valueData={
                      decisionDateElement.valueData as IDecisionViewConditionRenderer["valueData"]
                    }
                    type="decision"
                  />
                )}
              </>
            )}
          </Stack>
        </StyledScrollContainer>
      </Stack>
    );
  }

  return (
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
          {skeleton!.map((_, index) => (
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

export { BusinessRuleViewUI };
