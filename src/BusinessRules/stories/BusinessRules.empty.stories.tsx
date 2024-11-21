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

const sampleDecisions: IRuleDecision[] = [];

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

export const Empty: Story = (args: IBusinessRulesController) => (
  <BusinessRulesController {...args} />
);
Empty.args = {
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
