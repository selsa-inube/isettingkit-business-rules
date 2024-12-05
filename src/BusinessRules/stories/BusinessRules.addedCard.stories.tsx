import { Meta, StoryObj } from "@storybook/react";
import { parameters } from "./props";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import {
  BusinessRulesController,
  IBusinessRulesController,
} from "./BusinessRules.controller";

const meta: Meta<typeof BusinessRulesController> = {
  title: "components/BusinessRules",
  component: BusinessRulesController,
  parameters,
  // argTypes: props,
};

type Story = StoryObj<typeof BusinessRulesController>;

const sampleDecisions: IRuleDecision[] = [
  {
    id: "Decisión 1",
    name: "TasaEfectivaAnual",
    dataType: ValueDataType.PERCENTAGE,
    value: { from: 4, to: 8 },
    valueUse: ValueHowToSetUp.RANGE,
    startDate: "2024-12-31",
    endDate: "2024-12-31",
    conditions: [
      {
        name: "AntigüedadDelCliente(Días)",
        dataType: ValueDataType.ALPHABETICAL,
        value: "Mayor a: 720",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Categoría del cliente ",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Independiente", "Pensionado"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "Nivel de membresía",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Alto"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "Reciprocidad de ahorro",
        dataType: ValueDataType.PERCENTAGE,
        value: 19,
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Destino del dinero",
        dataType: ValueDataType.ALPHABETICAL,
        value: "Crédito Vehículo",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Temporada",
        dataType: ValueDataType.ALPHABETICAL,
        value: "Normal",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Scoring de riesgo",
        dataType: ValueDataType.ALPHABETICAL,
        value: "0,2",
        valueUse: ValueHowToSetUp.EQUAL,
      },
    ],
  },
  {
    id: "Decisión 2",
    name: "TasaEfectivaAnual",
    dataType: ValueDataType.PERCENTAGE,
    value: { from: 4, to: 8 },
    valueUse: ValueHowToSetUp.RANGE,
    startDate: "2024-12-31",
    endDate: "2024-12-31",
    conditions: [
      {
        name: "Antigüedad del cliente (Días)",
        dataType: ValueDataType.ALPHABETICAL,
        value: "Mayor a: 720",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Categoría del cliente ",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Independiente", "Pensionado"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "Nivel de membresía",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Alto"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "Reciprocidad de ahorro",
        dataType: ValueDataType.PERCENTAGE,
        value: 19,
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Destino del dinero",
        dataType: ValueDataType.ALPHABETICAL,
        value: "Crédito Vehículo",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Temporada",
        dataType: ValueDataType.ALPHABETICAL,
        value: "Normal",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Scoring de riesgo",
        dataType: ValueDataType.ALPHABETICAL,
        value: "0,2",
        valueUse: ValueHowToSetUp.EQUAL,
      },
    ],
  },
];

const decisionTemplate: IRuleDecision = {
  name: "TasaEfectivaAnual",
  dataType: ValueDataType.PERCENTAGE,
  valueUse: ValueHowToSetUp.RANGE,
  value: { from: 0, to: 0 },
  startDate: "",
  endDate: "",
  conditions: [
    {
      name: "AntigüedadDelCliente(Días)",
      dataType: ValueDataType.ALPHABETICAL,
      valueUse: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      name: "CategoríaDelCliente",
      dataType: ValueDataType.ALPHABETICAL,
      valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      possibleValue: {
        list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
      },
      value: [],
    },
    {
      name: "NivelDeMembresía",
      dataType: ValueDataType.ALPHABETICAL,
      valueUse: ValueHowToSetUp.LIST_OF_VALUES,
      possibleValue: {
        list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
      },
      value: "",
    },
    {
      name: "ReciprocidadDeAhorro",
      dataType: ValueDataType.PERCENTAGE,
      valueUse: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      name: "DestinoDelDinero",
      dataType: ValueDataType.ALPHABETICAL,
      valueUse: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      name: "Temporada",
      dataType: ValueDataType.ALPHABETICAL,
      valueUse: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      name: "ScoringDeRiesgo",
      dataType: ValueDataType.ALPHABETICAL,
      valueUse: ValueHowToSetUp.EQUAL,
      value: "",
    },
  ],
};

export const addedCard: Story = (args: IBusinessRulesController) => (
  <BusinessRulesController {...args} />
);
addedCard.args = {
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

export default meta;
