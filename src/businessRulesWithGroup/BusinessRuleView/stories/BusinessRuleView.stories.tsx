import { Meta, StoryFn } from "@storybook/react";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";

import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";
import { BusinessRuleViewWithGroup } from "..";

const meta: Meta<typeof BusinessRuleViewWithGroup> = {
  title: "components/BusinessRules/BusinessRuleViewWithGroup",
  component: BusinessRuleViewWithGroup,
};

const getData = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decisionId: "Decisión 1",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: { from: 4, to: 8 },
    howToSetTheDecision: EValueHowToSetUp.RANGE,
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

const Template: StoryFn<typeof BusinessRuleViewWithGroup> = (args) => (
  <BusinessRuleViewWithGroup {...args} />
);

const Default = Template.bind({});
Default.args = {
  decision: getData(),
  textValues: {
    selectOptions: "Seleccione las opciones",
    selectOption: "Seleccione una opción",
    rangeMin: (label: string) => `${label} Mínima`,
    rangeMax: (label: string) => `${label} Máxima`,
    reasonForChange: "Motivo del cambio",
    change: "Cambio",
    changePlaceholder: "Describa brevemente el motivo del cambio",
    termStart: "Fecha de inicio",
    termEnd: "Fecha de fin",
    cancel: "Cancelar",
    confirm: "Confirmar",
    none: "Ninguno",
    factsThatConditionIt: "Condiciones que lo determinan",
    criteria: "Criterios",
    terms: "Vigencia",
  },
};

export { Default };
export default meta;
