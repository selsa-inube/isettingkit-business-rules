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


import { mapByGroupNew } from "../helper/utils/mapByGroup";
import { Checkpicker } from "../../checkpicker";

import { normalizeDecisionToNewShape } from "../helper/utils/normalizeDecisionToNewShape";
import { groupsRecordToArrayNew } from "../helper/utils/groupsRecordToArray";
import { getConditionsByGroupNew } from "../helper/utils/getConditionsByGroup";

interface IBusinessRulesNewController {
  language?: "es" | "en";
  cardTitle?: boolean;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  decisionTemplate: IRuleDecision;
  initialDecisions: IRuleDecision[];
  loading?: boolean;
  terms?: boolean;
  textValues: IRulesFormTextValues;
}

const deepClone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

const localizeLabel = (
  base: { labelName?: string; i18n?: Record<string, string> } | undefined,
  lang: "es" | "en" | undefined,
) => (lang && base?.i18n?.[lang]) || base?.labelName || "";

const localizeDecision = (
  raw: IRuleDecision,
  lang: "es" | "en" | undefined,
): IRuleDecision => {
  const cloned: IRuleDecision = deepClone(raw);
  cloned.labelName = localizeLabel(raw, lang);

  const groups = getConditionsByGroupNew(cloned) as Record<string, any[]>;
  const localizedGroupsRecord = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      list.map((c) => ({ ...c, labelName: localizeLabel(c, lang) })),
    ]),
  );

  const normalized: IRuleDecision = {
    ...cloned,
    conditionGroups: groupsRecordToArrayNew(localizedGroupsRecord) as any,
  };
  delete (normalized as any).conditionsThatEstablishesTheDecision;

  return normalized;
};

const BusinessRulesNewController = ({
  cardTitle,
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
    () =>
      normalizeDecisionToNewShape(
        localizeDecision(decisionTemplate, language),
      ),
    [decisionTemplate, language],
  );

  const [decisions, setDecisions] = useState<any[]>(
    initialDecisions.map((d) => {
      const loc = normalizeDecisionToNewShape(localizeDecision(d, language));

      const mappedRecord = mapByGroupNew(getConditionsByGroupNew(loc), (condition: {
        value: string | number | IValue | string[] | undefined;
        i18n?: Record<string, string>;
        labelName?: string;
      }) => ({
        ...condition,
        labelName: localizeLabel(condition as any, language),
        value: parseRangeFromString(condition.value),
      }));

      const out = {
        ...loc,
        value: parseRangeFromString(loc.value),
        conditionGroups: groupsRecordToArrayNew(mappedRecord),
      };
      delete (out as any).conditionsThatEstablishesTheDecision;
      return out;
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
    const groups = getConditionsByGroupNew(localizedTemplate);
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
    setSelectedDecision(decision ? normalizeDecisionToNewShape(decision) : null);
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

    const tplGroups = getConditionsByGroupNew(localizedTemplate);
    const dataGroups = getConditionsByGroupNew(dataDecision) as Record<
      string,
      any[]
    >;

    const mergedGroupsRecord = Object.fromEntries(
      Object.entries(tplGroups).map(([group, tplList]) => {
        const dataList = dataGroups[group] ?? [];

        const merged = (tplList as any)
          .map((tplItem: any) => {
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
          })
          .filter((m: any) => {
            const passesSelected =
              selectedIds.size === 0 || selectedIds.has(m.conditionName);
            const notRemoved = !removedConditionNames.has(m.conditionName);
            return passesSelected && notRemoved;
          });

        return [group, merged];
      }),
    );

    const newDecision: IRuleDecision = {
      ...base,
      labelName: localizeLabel(base, language),
      conditionGroups: groupsRecordToArrayNew(mergedGroupsRecord),
    };
    delete (newDecision as any).conditionsThatEstablishesTheDecision;

    const decisionWithSentences = newDecision;

    const backendFormattedDecision = formatDecisionForBackend({
      decision: decisionWithSentences,
      template: localizedTemplate,
      fallbackId: (decisionWithSentences as any).decisionId!,
    });
    console.log("Formatted for backend:", backendFormattedDecision);

    setDecisions((prev) =>
      isEditing
        ? prev.map((d) => {
            const sameByBusinessRule =
              (selectedDecision as any)?.businessRuleId &&
              d.businessRuleId === (selectedDecision as any).businessRuleId;
            const sameByDecisionId =
              (selectedDecision as any)?.decisionId &&
              d.decisionId === (selectedDecision as any).decisionId;
            const out = sameByBusinessRule || sameByDecisionId
              ? decisionWithSentences
              : d;
            delete (out as any).conditionsThatEstablishesTheDecision;
            return out;
          })
        : [
            ...prev,
            (() => {
              const out = decisionWithSentences;
              delete (out as any).conditionsThatEstablishesTheDecision;
              return out;
            })(),
          ],
    );

    handleCloseModal();
  };

  useEffect(() => {}, [decisions]);

  const handleDelete = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  const filteredDecisionTemplate = useMemo(() => {
    const tpl = sortDisplayDataSampleSwitchPlaces({
      decisionTemplate: deepClone(localizedTemplate),
    });

    const groupsRecord =
      getConditionsByGroupNew(tpl) || ({} as Record<string, any[]>);

    const filteredRecord = Object.fromEntries(
      Object.entries(groupsRecord).map(([group, list]) => [
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
      conditionGroups: groupsRecordToArrayNew(filteredRecord),
    };
    delete (withFiltered as any).conditionsThatEstablishesTheDecision;

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
          cardTitle={cardTitle}
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
