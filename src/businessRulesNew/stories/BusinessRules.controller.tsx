/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { BusinessRulesNew } from "..";
import { sortDisplayDataSwitchPlaces } from "../helper/utils/sortDisplayDataSwitchPlaces";
import { sortDisplayDataSampleSwitchPlaces } from "../helper/utils/sortDisplayDataSampleSwitchPlaces";
import { IRulesFormTextValues } from "../types/Forms/IRulesFormTextValues";
import { Button, Fieldset, Stack } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";
import type { IOption } from "@inubekit/inubekit";
import { StyledMultipleChoiceContainer } from "./styles";

import { mapByGroupNew } from "../helper/utils/mapByGroup";
import { normalizeDecisionToNewShape } from "../helper/utils/normalizeDecisionToNewShape";
import { groupsRecordToArrayNew } from "../helper/utils/groupsRecordToArray";
import { getConditionsByGroupNew } from "../helper/utils/getConditionsByGroup";
import { Checkpicker } from "@isettingkit/input";

type EditionMode = "classic" | "versioned";

interface IBusinessRulesNewController {
  language?: "es" | "en";
  cardTitle?: boolean;
  controls?: boolean;
  customMessageEmptyDecisions?: string;
  customTitleContentAddCard?: string;
  decisionTemplate: IRuleDecision;
  editionMode?: EditionMode;
  initialDecisions: IRuleDecision[];
  loading?: boolean;
  terms?: boolean;
  textValues: IRulesFormTextValues;
  shouldRenderEmptyMessage?: boolean;
}

const deepClone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const originalName = (name: string) => name?.split(".").pop() || name;

const todayInBogotaISO = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/\//g, "-");

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
  shouldRenderEmptyMessage,
  editionMode = "versioned",
}: IBusinessRulesNewController) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAsNew, setEditAsNew] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);

  const [sourceDecisionMeta, setSourceDecisionMeta] = useState<{
    businessRuleId?: string;
    decisionId?: string;
  } | null>(null);

  const localizedTemplate = useMemo(
    () =>
      normalizeDecisionToNewShape(localizeDecision(decisionTemplate, language)),
    [decisionTemplate, language],
  );

  const [decisions, setDecisions] = useState<any[]>(
    initialDecisions.map((d) => {
      const loc = normalizeDecisionToNewShape(localizeDecision(d, language));

      const mappedRecord = mapByGroupNew(
        getConditionsByGroupNew(loc),
        (condition: {
          value: string | number | IValue | string[] | undefined;
          i18n?: Record<string, string>;
          labelName?: string;
        }) => ({
          ...condition,
          conditionName: originalName((condition as any).conditionName),
          labelName: localizeLabel(condition as any, language),
          value: condition.value,
        }),
      );

      const out = {
        ...loc,
        value: loc.value,
        conditionGroups: groupsRecordToArrayNew(mappedRecord),
      };
      delete (out as any).conditionsThatEstablishesTheDecision;
      return out;
    }),
  );

  const [removedConditionNames, setRemovedConditionNames] =
    useState<Set<string>>(new Set());

  const handleRemoveCondition = (scopedConditionName: string) => {
    const [groupKey, ...rest] = scopedConditionName.split(".");
    const plainName = rest.join(".");
    const key = originalName(plainName);

    setRemovedConditionNames((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });

    setSelectedDecision((prev) => {
      if (!prev) return prev;

      const groups = getConditionsByGroupNew(prev) || {};

      const updatedGroupsRecord = Object.fromEntries(
        Object.entries(groups).map(([g, list]) => {
          if (g !== groupKey) return [g, list];

          return [
            g,
            (list as any[]).filter(
              (c) => originalName(c.conditionName) !== key,
            ),
          ];
        }),
      );

      const nextDecision: IRuleDecision = {
        ...prev,
        conditionGroups: groupsRecordToArrayNew(updatedGroupsRecord) as any,
      };

      return nextDecision;
    });
  };

  const handleRestoreConditions = (names: string[]) => {
    if (!names?.length) return;
    setRemovedConditionNames((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set(prev);
      names.map(originalName).forEach((n) => next.delete(n));
      return next;
    });
  };

  const multipleChoicesOptions: IOption[] = useMemo(() => {
    const groups = getConditionsByGroupNew(localizedTemplate) || {};
    console.log(groups);

    const primaryGroup = (groups["group-primary"] || []) as any[];

    return primaryGroup.map((c: any) => {
      const oname = originalName(c.conditionName);
      return {
        id: oname,
        label: localizeLabel(c, language),
        value: oname,
      };
    });
  }, [localizedTemplate, language]);

  const [selectedConditionsCSV, setSelectedConditionsCSV] =
    useState<string>("");
  const selectedIds = useMemo(
    () => new Set(selectedConditionsCSV.split(",").filter(Boolean)),
    [selectedConditionsCSV],
  );

  const csvFromDecisionConditions = (d: IRuleDecision): string => {
    const groups = getConditionsByGroupNew(d) || {};
    const names = Object.values(groups)
      .flat()
      .map((c: any) => originalName(c?.conditionName))
      .filter(Boolean);
    const seen = new Set<string>();
    const unique = names.filter((n) =>
      seen.has(n) ? false : (seen.add(n), true),
    );
    return unique.join(",");
  };

  const handleMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditionsCSV(valueCSV);
    const ids = valueCSV.split(",").filter(Boolean);
    const selected = multipleChoicesOptions.filter((o) => ids.includes(o.id));
    console.log("Selected conditions:", selected);
  };

  const handleOpenModal = (decision: IRuleDecision | null = null) => {
    if (decision) {
      const businessRuleId = (decision as any).businessRuleId;
      const decisionId = (decision as any).decisionId;

      setSourceDecisionMeta({ businessRuleId, decisionId });

      const csv = csvFromDecisionConditions(decision);
      setSelectedConditionsCSV(csv);

      const normalized = deepClone(normalizeDecisionToNewShape(decision));

      const mappedRecord = mapByGroupNew(
        getConditionsByGroupNew(normalized),
        (condition: {
          value: string | number | IValue | string[] | undefined;
          i18n?: Record<string, string>;
          labelName?: string;
        }) => ({
          ...condition,
          conditionName: originalName((condition as any).conditionName),
          labelName: localizeLabel(condition as any, language),
          value: (condition as any).value,
        }),
      );

      const draft = {
        ...normalized,
        conditionGroups: groupsRecordToArrayNew(mappedRecord),
      } as IRuleDecision;

      if (editionMode === "versioned") {
        delete (draft as any).businessRuleId;
        delete (draft as any).decisionId;
        (draft as any).effectiveFrom = "";
        (draft as any).validUntil = "";
        setSelectedDecision(draft);
        setEditAsNew(true);
      } else {

        setSelectedDecision(draft);
        setEditAsNew(false);
      }

      setIsModalOpen(true);
      return;
    }


    setEditAsNew(false);
    setSourceDecisionMeta(null);
    setSelectedDecision(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
    setEditAsNew(false);
    setSourceDecisionMeta(null);
  };

  const handleSubmitForm = (dataDecision: any) => {
    const isEditing = selectedDecision !== null && !editAsNew;

    console.log("dataDecision: ", dataDecision);

    const base = isEditing
      ? { ...selectedDecision, ...dataDecision }
      : {
        ...localizedTemplate,
        ...dataDecision,
        decisionId: `Decisión ${decisions.length + 1}`,
      };

    const tplGroups = getConditionsByGroupNew(localizedTemplate) as Record<
      string,
      any[]
    >;

    const dataGroupsRaw = getConditionsByGroupNew(
      dataDecision,
    ) as Record<string, any[]>;

    const mergedGroupsRecord = Object.fromEntries(
      Object.entries(tplGroups).map(([group, tplList]) => {
        const dataList = (dataGroupsRaw[group] ?? []).map((d: any) => ({
          ...d,
          conditionName: originalName(d.conditionName),
        }));

        const merged = (tplList as any).map((tplItem: any) => {
          const tplOrig = originalName(tplItem.conditionName);
          const match = dataList.find(
            (d: any) => originalName(d.conditionName) === tplOrig,
          );

          return {
            ...tplItem,
            conditionName: tplOrig,
            labelName: localizeLabel(tplItem, language),
            value: match?.value ?? tplItem.value,
            listOfPossibleValues:
              match?.listOfPossibleValues ?? tplItem.listOfPossibleValues,
          };
        });

        return [group, merged];
      }),
    );

    const conditionsRecord = Object.fromEntries(
      Object.entries(mergedGroupsRecord).map(([group, list]) => [
        group,
        Object.fromEntries(
          (list as any[]).map((cond) => [cond.conditionName, cond]),
        ),
      ]),
    );

    const decisionWithSentences: IRuleDecision = {
      ...base,
      labelName: localizeLabel(base, language),
      value: base.value,
      conditionsThatEstablishesTheDecision: conditionsRecord as any,
      conditionGroups: groupsRecordToArrayNew(mergedGroupsRecord),
      // i18nValue: 'asd'
    };

    console.log("decisionWithSentences: ", decisionWithSentences);
    console.log("sourceDecisionMeta: ", sourceDecisionMeta);

    const today = todayInBogotaISO();

    setDecisions((prev) => {
      const baseList =
        editionMode === "versioned" && editAsNew && sourceDecisionMeta
          ? prev.map((d) => {
            const sameByBusinessRule =
              sourceDecisionMeta.businessRuleId &&
              d.businessRuleId === sourceDecisionMeta.businessRuleId;
            const sameByDecisionId =
              sourceDecisionMeta.decisionId &&
              d.decisionId === sourceDecisionMeta.decisionId;

            if (sameByBusinessRule || sameByDecisionId) {
              return {
                ...d,
                validUntil: today,
              };
            }
            return d;
          })
          : prev;

      if (isEditing) {
        return baseList.map((d) => {
          const sameByBusinessRule =
            (selectedDecision as any)?.businessRuleId &&
            d.businessRuleId === (selectedDecision as any).businessRuleId;
          const sameByDecisionId =
            (selectedDecision as any)?.decisionId &&
            d.decisionId === (selectedDecision as any).decisionId;

          return sameByBusinessRule || sameByDecisionId
            ? decisionWithSentences
            : d;
        });
      }


      return [...baseList, decisionWithSentences];
    });

    handleCloseModal();
  };

  useEffect(() => { }, [decisions]);

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
        (list as any[]).filter((c) => {
          const oname = originalName(c.conditionName);

          const passesSelected = selectedIds.size > 0 && selectedIds.has(oname);
          const notRemoved = !removedConditionNames.has(oname);
          return passesSelected && notRemoved;
        }),
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
          // disabled={selectedConditionsCSV.length === 0}
          iconBefore={<MdAdd />}
          onClick={() => handleOpenModal()}
        >
          Agregar plazo
        </Button>
      </Stack>

      {/* {selectedConditionsCSV.length > 0 ? ( */}
      <BusinessRulesNew
        baseDecisionTemplate={localizedTemplate}
        cardTitle={cardTitle}
        controls={controls}
        customMessageEmptyDecisions={customMessageEmptyDecisions}
        customTitleContentAddCard={customTitleContentAddCard}
        decisionTemplate={filteredDecisionTemplate as any}
        decisions={sortDisplayDataSwitchPlaces({ decisions })}
        editionMode={editionMode}
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
        shouldRenderEmptyMessage={shouldRenderEmptyMessage}

      />
      {/* ) : (
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
                <>Antes de agregar tus decisiones, selecciona las condiciones que la determinan.</>
              )}
            </Text>
          </Stack>
        </Fieldset>
      )} */}
    </Stack>
  );
};

export { BusinessRulesNewController };
export type { IBusinessRulesNewController };
