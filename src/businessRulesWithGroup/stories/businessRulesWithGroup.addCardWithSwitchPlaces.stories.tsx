import { Meta, StoryObj } from "@storybook/react";
import { parameters } from "./props";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import {
  BusinessRulesController,
  IBusinessRulesController,
} from "./businessRulesWithGroup.controller";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";

const meta: Meta<typeof BusinessRulesController> = {
  title: "components/BusinessRulesWithGroup",
  component: BusinessRulesController,
  parameters,
  // argTypes: props,
};

type Story = StoryObj<typeof BusinessRulesController>;

const sampleDecisions: IRuleDecision[] = [
  {
    decisionId: "Decisión 1",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: ">1;<3",
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
        labelName: "Destino Del Dinero",
        conditionName: "DestinoDelDinero",
        descriptionUse: "Destino Del Dinero",
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
  },
  {
    decisionId: "Decisión 2",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: ">4;<8",
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
        labelName: "Destino Del Dinero",
        conditionName: "DestinoDelDinero",
        descriptionUse: "Destino Del Dinero",
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
  },
];

const decisionTemplate: IRuleDecision = {
  ruleName: "TasaEfectivaAnual",
  labelName: "Tasa Efectiva Anual",
  decisionDataType: ValueDataType.PERCENTAGE,
  howToSetTheDecision: EValueHowToSetUp.RANGE,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionsThatEstablishesTheDecision: [
    {
      labelName: "Antigüedad del cliente (Días)",
      conditionName: "AntigüedadDelCliente(Días)",
      descriptionUse: "Antigüedad del cliente (Días)",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: EValueHowToSetUp.EQUAL,
      value: "",
      switchPlaces: false,
    },
    {
      labelName: "Categoría Del Cliente",
      conditionName: "CategoríaDelCliente",
      descriptionUse: "Categoría Del Cliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES_MULTI,
      listOfPossibleValues: {
        list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
      },
      value: [],
    },
    {
      labelName: "Nivel De Membresía",
      conditionName: "NivelDeMembresía",
      descriptionUse: "Nivel De Membresía",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
      listOfPossibleValues: {
        list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
      },
      value: "",
    },
    {
      labelName: "Reciprocidad De Ahorro",
      conditionName: "ReciprocidadDeAhorro",
      descriptionUse: "Reciprocidad De Ahorro",
      conditionDataType: ValueDataType.PERCENTAGE,
      howToSetTheCondition: EValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "Destino Del Dinero",
      conditionName: "DestinoDelDinero",
      descriptionUse: "Destino Del Dinero",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: EValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "Temporada",
      conditionName: "Temporada",
      descriptionUse: "Temporada",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: EValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "ScoringDeRiesgo",
      conditionName: "ScoringDeRiesgo",
      descriptionUse: "ScoringDeRiesgo",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: EValueHowToSetUp.EQUAL,
      value: "",
    },
  ],
};

const addCardWithSwitchPlaces: Story = (args: IBusinessRulesController) => (
  <BusinessRulesController {...args} />
);
addCardWithSwitchPlaces.args = {
  controls: true,
  initialDecisions: sampleDecisions,
  decisionTemplate,
  textValues: {
    selectOptions: "Seleccione las opciones",
    selectOption: "Seleccione una opción",
    rangeMin: (label: string) => `${label} Minima`,
    rangeMax: (label: string) => `${label} Maxima`,
    reasonForChange: "Motivo del cambio",
    change: "Cambio",
    changePlaceholder: "Describa brevemente el motivo del cambio",
    termStart: "Desde",
    termEnd: "Hasta",
    cancel: "Cancelar",
    confirm: "Confirmar",
    none: "Ninguno",
    factsThatConditionIt: "Condiciones que lo determinan",
    criteria: "Criterios",
    terms: "Vigencia",
  },
};

export { addCardWithSwitchPlaces };
export default meta;
