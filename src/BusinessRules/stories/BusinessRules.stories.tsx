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
  {
    id: "Decisión 3",
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
  {
    id: "Decisión 4",
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
  {
    id: "Decisión 5",
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
  value: { from: 0, to: 0 },
  valueUse: ValueHowToSetUp.RANGE,
  startDate: "",
  endDate: "",
  conditions: [
    {
      name: "Antigüedad del cliente (Días)",
      dataType: ValueDataType.ALPHABETICAL,
      value: "",
      valueUse: ValueHowToSetUp.EQUAL,
    },
    {
      name: "Categoría del cliente ",
      dataType: ValueDataType.ALPHABETICAL,
      possibleValue: {
        list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
      },
      value: [],
      valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
    },
    {
      name: "Nivel de membresía",
      dataType: ValueDataType.ALPHABETICAL,
      possibleValue: {
        list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
      },
      value: "",
      valueUse: ValueHowToSetUp.LIST_OF_VALUES,
    },
    {
      name: "Reciprocidad de ahorro",
      dataType: ValueDataType.PERCENTAGE,
      value: 0,
      valueUse: ValueHowToSetUp.EQUAL,
    },
    {
      name: "Destino del dinero",
      dataType: ValueDataType.ALPHABETICAL,
      value: "",
      valueUse: ValueHowToSetUp.EQUAL,
    },
    {
      name: "Temporada",
      dataType: ValueDataType.ALPHABETICAL,
      value: "",
      valueUse: ValueHowToSetUp.EQUAL,
    },
    {
      name: "Scoring de riesgo",
      dataType: ValueDataType.ALPHABETICAL,
      value: "",
      valueUse: ValueHowToSetUp.EQUAL,
    },
  ],
};

export const Default: Story = (args: IBusinessRulesController) => (
  <BusinessRulesController {...args} />
);
Default.args = {
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
    factsThatConditionIt: "Hechos que condicionan",
    criteria: "Criterios",
    terms: "Vigencia",
  },
};

export default meta;
