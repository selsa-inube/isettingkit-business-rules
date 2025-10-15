/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { BusinessRulesNew } from "..";
import { sortDisplayDataSwitchPlaces } from "../helper/utils/sortDisplayDataSwitchPlaces";
import { sortDisplayDataSampleSwitchPlaces } from "../helper/utils/sortDisplayDataSampleSwitchPlaces";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";
import { formatDecisionForBackend } from "../helper/utils/formatDecisionForBackend";
import { parseRangeFromString } from "../helper/utils/parseRangeFromString";
import { Button, Fieldset, Icon, Stack, Text } from "@inubekit/inubekit";
import { MdAdd, MdOutlineReportProblem } from "react-icons/md";
import type { IOption } from "@inubekit/inubekit";
import { StyledMultipleChoiceContainer } from "./styles";
import { getConditionsByGroup } from "../helper/utils/getConditionsByGroup";
import { mapByGroup } from "../helper/utils/mapByGroup";
import { Checkpicker } from "../../checkpicker";

// import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";
// import { buildEsConditionSentence } from "../utils/buildEsConditionSentence";

interface IBusinessRulesNewController {
  language?: "es" | "en";
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  decisionTemplate: IRuleDecision;
  initialDecisions: IRuleDecision[];
  loading?: boolean;
  terms?: boolean;
  textValues: IRulesFormTextValues;
}

const localizeLabel = (
  base: { labelName?: string; i18n?: Record<string, string> } | undefined,
  lang: "es" | "en" | undefined,
) => (lang && base?.i18n?.[lang]) || base?.labelName || "";

const localizeDecision = (
  raw: IRuleDecision,
  lang: "es" | "en" | undefined,
): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(raw));
  cloned.labelName = localizeLabel(raw, lang);

  const groups = getConditionsByGroup(cloned) as Record<string, any[]>;
  const localizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      list.map((c) => ({ ...c, labelName: localizeLabel(c, lang) })),
    ]),
  );

  cloned.conditionsThatEstablishesTheDecision = localizedGroups as any;
  return cloned;
};

// const normalizeHowToSet = (raw: unknown): EValueHowToSetUp => {
//   if (typeof raw === "string") {
//     const k = raw.toLowerCase();
//     if (k.includes("equal")) return EValueHowToSetUp.EQUAL;
//     if (k.includes("greater")) return EValueHowToSetUp.GREATER_THAN;
//     if (k.includes("less")) return EValueHowToSetUp.LESS_THAN;
//     if (k.includes("range") || k.includes("between"))
//       return EValueHowToSetUp.RANGE;
//     if (k.includes("multi")) return EValueHowToSetUp.LIST_OF_VALUES_MULTI;
//     if (k.includes("list_of_values") || k.includes("among") || k.includes("in"))
//       return EValueHowToSetUp.LIST_OF_VALUES;
//   }
//   return (raw as EValueHowToSetUp) ?? EValueHowToSetUp.EQUAL;
// };

// const withConditionSentences = (
//   decision: IRuleDecision,
//   isPrimaryFirst = true,
// ): IRuleDecision => {
//   const d: IRuleDecision = JSON.parse(JSON.stringify(decision));
//   const groups = getConditionsByGroup(d) as Record<string, any[]>;

//   const orderedKeys = [
//     ...Object.keys(groups).filter((k) => k === "group-primary"),
//     ...Object.keys(groups).filter((k) => k !== "group-primary"),
//   ];

//   let firstUsed = !isPrimaryFirst;

//   const decorated = Object.fromEntries(
//     orderedKeys.map((g) => {
//       const list = groups[g] ?? [];
//       const mapped = list.map((c: any, idx: number) => {
//         const isFirst = !firstUsed && g === "group-primary" && idx === 0;
//         if (isFirst) firstUsed = true;

//         const how = normalizeHowToSet(
//           c.howToSetTheCondition ?? c.valueUse ?? EValueHowToSetUp.EQUAL,
//         );

//         const sentence = buildEsConditionSentence({
//           label: c.labelName || "",
//           howToSet: how,
//           isFirst,
//         });
//         console.log("Sentence:", {
//           label: c.labelName,
//           how,
//           isFirst,
//           sentence,
//         });

//         return {
//           ...c,
//           labelName: sentence,
//         };
//       });
//       return [g, mapped];
//     }),
//   );

//   d.conditionsThatEstablishesTheDecision = decorated as any;
//   return d;
// };

const BusinessRulesNewController = ({
  controls,
  customMessageEmptyDecisions,
  customTitleContentAddCard,
  decisionTemplate,
  initialDecisions,
  language,
  loading = false,
  textValues,
}: IBusinessRulesNewController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);

  const localizedTemplate = useMemo(
    () => localizeDecision(decisionTemplate, language),
    [decisionTemplate, language],
  );

  const [decisions, setDecisions] = useState<any[]>(
    initialDecisions.map((d) => {
      const loc = localizeDecision(d, language);
      // const withSentences = withConditionSentences(loc);
      const withSentences = loc;
      return {
        ...withSentences,
        value: parseRangeFromString(withSentences.value),
        conditionsThatEstablishesTheDecision: mapByGroup(
          getConditionsByGroup(withSentences),
          (condition: {
            value: string | number | IValue | string[] | undefined;
          }) => ({
            ...condition,
            labelName: localizeLabel(
              condition as {
                labelName?: string;
                i18n?: Record<string, string>;
              },
              language,
            ),
            value: parseRangeFromString(condition.value),
          }),
        ),
      };
    }),
  );

  const [removedConditionNames, setRemovedConditionNames] = useState<
    Set<string>
  >(new Set());

  const handleRemoveCondition = (conditionName: string) => {
    setRemovedConditionNames((prev) => {
      const next = new Set(prev);
      next.add(conditionName);
      return next;
    });
  };

  const handleRestoreConditions = (names: string[]) => {
    if (!names?.length) return;
    setRemovedConditionNames((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set(prev);
      names.forEach((n) => next.delete(n));
      return next;
    });
  };

  const multipleChoicesOptions: IOption[] = useMemo(() => {
    const groups = getConditionsByGroup(localizedTemplate);
    return Object.values(groups)
      .flat()
      .map((c: any) => ({
        id: c.conditionName,
        label: localizeLabel(c, language),
        value: c.conditionName,
      }));
  }, [localizedTemplate, language]);

  const [selectedConditionsCSV, setSelectedConditionsCSV] =
    useState<string>("");

  const selectedIds = useMemo(
    () => new Set(selectedConditionsCSV.split(",").filter(Boolean)),
    [selectedConditionsCSV],
  );

  const handleMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditionsCSV(valueCSV);
    const ids = valueCSV.split(",").filter(Boolean);
    const selected = multipleChoicesOptions.filter((o) => ids.includes(o.id));
    console.log("Selected conditions:", selected);
  };

  const handleOpenModal = (decision: IRuleDecision | null = null) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const handleSubmitForm = (dataDecision: any) => {
    const isEditing = selectedDecision !== null;

    const base = isEditing
      ? { ...selectedDecision, ...dataDecision }
      : {
          ...localizedTemplate,
          ...dataDecision,
          decisionId: `Decisión ${decisions.length + 1}`,
        };

    const tplGroups = getConditionsByGroup(localizedTemplate);
    const dataGroups = getConditionsByGroup(dataDecision) as Record<
      string,
      any[]
    >;

    const mergedGroups = Object.fromEntries(
      Object.entries(tplGroups).map(([group, tplList]) => {
        const dataList = dataGroups[group] ?? [];

        const merged = (tplList as any).map((tplItem: any) => {
          const match = dataList.find(
            (d: any) => d.conditionName === tplItem.conditionName,
          );
          return {
            ...tplItem,
            labelName: localizeLabel(tplItem, language),
            value: match?.value ?? tplItem.value,
            listOfPossibleValues:
              match?.listOfPossibleValues ?? tplItem.listOfPossibleValues,
          };
        });

        const finalList = merged.filter((m: any) => {
          const passesSelected =
            selectedIds.size === 0 || selectedIds.has(m.conditionName);
          const notRemoved = !removedConditionNames.has(m.conditionName);
          return passesSelected && notRemoved;
        });

        return [group, finalList];
      }),
    );

    const newDecision: IRuleDecision = {
      ...base,
      labelName: localizeLabel(base, language),
      conditionsThatEstablishesTheDecision: mergedGroups,
    };
    // const decisionWithSentences = withConditionSentences(newDecision);
    const decisionWithSentences = newDecision;

    const backendFormattedDecision = formatDecisionForBackend({
      decision: decisionWithSentences,
      template: localizedTemplate,
      fallbackId: decisionWithSentences.decisionId!,
    });
    console.log("Formatted for backend:", backendFormattedDecision);

    setDecisions((prev) =>
      isEditing
        ? prev.map((d) => {
            const sameByBusinessRule =
              selectedDecision?.businessRuleId &&
              d.businessRuleId === selectedDecision.businessRuleId;
            const sameByDecisionId =
              selectedDecision?.decisionId &&
              d.decisionId === selectedDecision.decisionId;
            return sameByBusinessRule || sameByDecisionId
              ? decisionWithSentences
              : d;
          })
        : [...prev, decisionWithSentences],
    );

    handleCloseModal();
  };

  useEffect(() => {}, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  const filteredDecisionTemplate = useMemo(() => {
    const tpl = sortDisplayDataSampleSwitchPlaces({
      decisionTemplate: localizedTemplate,
    });
    const groups = tpl.conditionsThatEstablishesTheDecision || {};

    const filtered = Object.fromEntries(
      Object.entries(groups).map(([group, list]) => [
        group,
        (list as any[]).filter(
          (c) =>
            (selectedIds.size === 0 || selectedIds.has(c.conditionName)) &&
            !removedConditionNames.has(c.conditionName),
        ),
      ]),
    );

    const withFiltered = {
      ...tpl,
      labelName: localizeLabel(tpl, language),
      conditionsThatEstablishesTheDecision: filtered,
    };

    // return withConditionSentences(withFiltered as any);
    return withFiltered as any;
  }, [localizedTemplate, language, selectedIds, removedConditionNames]);
  console.log("filteredDecisionTemplate", filteredDecisionTemplate);
  return (
    <Stack direction="column" gap="24px">
      <Fieldset legend="Condiciones que determinan las decisiones">
        <StyledMultipleChoiceContainer>
          <Checkpicker
            fullwidth
            id="conditionsPicker"
            label=""
            name="conditionsPicker"
            onChange={handleMultipleChoicesChange}
            options={multipleChoicesOptions}
            placeholder="Seleccione una o varias condiciones"
            required={false}
            size="wide"
            values={selectedConditionsCSV}
          />
        </StyledMultipleChoiceContainer>
      </Fieldset>

      <Stack justifyContent="flex-end">
        <Button
          appearance="primary"
          cursorHover
          disabled={selectedConditionsCSV.length === 0}
          iconBefore={<MdAdd />}
          onClick={() => handleOpenModal()}
        >
          Agregar plazo
        </Button>
      </Stack>

      {selectedConditionsCSV.length > 0 ? (
        <BusinessRulesNew
          baseDecisionTemplate={localizedTemplate}
          controls={controls}
          customMessageEmptyDecisions={customMessageEmptyDecisions}
          customTitleContentAddCard={customTitleContentAddCard}
          decisionTemplate={filteredDecisionTemplate as any}
          decisions={sortDisplayDataSwitchPlaces({ decisions })}
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          handleOpenModal={handleOpenModal}
          handleSubmitForm={handleSubmitForm}
          isModalOpen={isModalOpen}
          loading={loading}
          onRemoveCondition={handleRemoveCondition}
          onRestoreConditions={handleRestoreConditions}
          selectedDecision={selectedDecision}
          textValues={textValues}
        />
      ) : (
        <Fieldset legend="Decisiones">
          <Stack
            alignItems="center"
            direction="column"
            gap="16px"
            justifyContent="center"
            width="100%"
          >
            <Icon
              appearance="warning"
              icon={<MdOutlineReportProblem />}
              size="40px"
            />
            <Text appearance="dark" size="medium" type="title" weight="bold">
              Sin condiciones
            </Text>
            <Text as="span" appearance="gray" size="medium">
              {customMessageEmptyDecisions ? (
                customMessageEmptyDecisions
              ) : (
                <>
                  Antes de agregar tus decisiones, selecciona las condiciones
                  que la determinan.
                </>
              )}
            </Text>
          </Stack>
        </Fieldset>
      )}
    </Stack>
  );
};

export { BusinessRulesNewController };
export type { IBusinessRulesNewController };
