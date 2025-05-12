import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { BusinessRuleCard } from "..";
import { BusinessRuleView } from "../../../BusinessRuleView";

import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { IBusinessRuleCard } from "../../../../BusinessRules/types/Cards/BusinessRuleCard/IBusinessRuleCard";
import { EValueHowToSetUp } from "../../../../BusinessRules/enums/EValueHowToSetUp";

const meta: Meta<typeof BusinessRuleCard> = {
  title: "components/cards/BusinessRuleCard",
  component: BusinessRuleCard,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof BusinessRuleCard>;

export const Default: Story = (args: IBusinessRuleCard) => (
  <BusinessRuleCard {...args} />
);
Default.args = {
  children: (
    <div>
      <p>Decision</p>
    </div>
  ),
  handleDelete: () => {},
  handleView: () => {},
  id: "1",
};

const getData = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decisionId: "Decisión 1",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: { from: 4, to: 8 },
    howToSetTheDecision: ValueHowToSetUp.RANGE,
    effectiveFrom: "2024-12-31",
    validUntil: "2024-12-31",
    conditionsThatEstablishesTheDecision: [
      {
        labelName: "Antigüedad del cliente (Días)",
        conditionName: "AntigüedadDelCliente(Días)",
        descriptionUse: "Antigüedad del cliente (Días)",
        conditionDataType: ValueDataType.ALPHABETICAL,
        value: "Mayor a: 720",
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
      },
      {
        labelName: "Categoría del cliente ",
        conditionName: "CategoríaDelCliente",
        descriptionUse: "Categoría del cliente",
        conditionDataType: ValueDataType.ALPHABETICAL,
        value: ["Independiente", "Pensionado"],
        howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        labelName: "Nivel de membresía",
        conditionName: "NivelDeMembresía",
        descriptionUse: "Nivel de membresía",
        conditionDataType: ValueDataType.ALPHABETICAL,
        value: ["Alto"],
        howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        labelName: "Reciprocidad de ahorro",
        conditionName: "ReciprocidadDeAhorro",
        descriptionUse: "Reciprocidad de ahorro",
        conditionDataType: ValueDataType.PERCENTAGE,
        value: 19,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
      },
      {
        labelName: "Reciprocidad de ahorro",
        conditionName: "ReciprocidadDeAhorro",
        descriptionUse: "Reciprocidad de ahorro",
        conditionDataType: ValueDataType.ALPHABETICAL,
        value: "Crédito Vehículo",
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
      },
      {
        labelName: "Temporada",
        conditionName: "Temporada",
        descriptionUse: "Temporada",
        conditionDataType: ValueDataType.ALPHABETICAL,
        value: "Normal",
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
      },
      {
        labelName: "Scoring De Riesgo",
        conditionName: "ScoringDeRiesgo",
        descriptionUse: "ScoringDeRiesgo",
        conditionDataType: ValueDataType.ALPHABETICAL,
        value: "0,2",
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
      },
    ],
  };
  return decision;
};

const Container: Story = (args: IBusinessRuleCard) => (
  <BusinessRuleCard {...args} />
);
Container.args = {
  children: (
    <BusinessRuleView
      decision={getData()}
      textValues={{
        selectOptions: "Seleccione las opciones",
        selectOption: "Seleccione una opción",
        rangeMin: (label: string) => `${label} Minima`,
        rangeMax: (label: string) => `${label} Maxima`,
        reasonForChange: "Motivo del cambio",
        change: "Cambio",
        changePlaceholder: "Describa brevemente el motivo del cambio",
        termStart: "Fecha de inicio",
        termEnd: "Fecha de fin",
        cancel: "Cancelar",
        confirm: "Confirmar",
        none: "Ninguno",
        factsThatConditionIt: "Hechos que condicionan",
        criteria: "Criterios",
        terms: "Vigencia",
      }}
    />
  ),
  handleDelete: () => {},
  handleView: () => {},
  id: "2",
};

export { Container };
export default meta;
