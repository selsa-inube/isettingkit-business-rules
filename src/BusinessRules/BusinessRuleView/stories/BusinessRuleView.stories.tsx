import { Meta, StoryFn } from "@storybook/react";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";
import { BusinessRuleView } from "..";

const meta: Meta<typeof BusinessRuleView> = {
  title: "components/view/BusinessRuleView",
  component: BusinessRuleView,
};

const getData = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decision: {
      name: "TasaEfectivaAnual",
      description: "Tasa de interés efectiva anual",
      typeData: ValueDataType.ALPHABETICAL,
      possibleValue: {
        list: ["10%", "15%", "20%", "25%"],
        listSelected: ["20%"],
      },
      value: {
        list: ["10%", "15%", "20%", "25%"],
        listSelected: ["25%"],
      },
      howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-09-15"),
    },
    conditions: [
      {
        name: "PlazoMeses",
        description: "Plazo en meses",
        typeData: ValueDataType.NUMBER,
        possibleValue: {
          rangeFrom: 1,
          rangeTo: 12,
        },
        howToSetUp: ValueHowToSetUp.RANGE,
      },
      {
        name: "ScoringRiesgo",
        description: "Scoring de riesgo",
        typeData: ValueDataType.NUMBER,
        possibleValue: {
          rangeFrom: 100,
          rangeTo: 700,
        },
        howToSetUp: ValueHowToSetUp.RANGE,
      },
      {
        name: "CategoriaCliente",
        description: "Categoria del cliente",
        typeData: ValueDataType.ALPHABETICAL,
        possibleValue: {
          list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
          listSelected: ["Independiente", "Pensionado"],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "Riesgo",
        description: "Riesgo",
        typeData: ValueDataType.ALPHABETICAL,
        possibleValue: {
          list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
          listSelected: ["Medio"],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "CarteraDescubierto",
        description: "Cartera de descubierto",
        typeData: ValueDataType.CURRENCY,
        possibleValue: {
          rangeFrom: 1000000,
          rangeTo: 15000000,
        },
        howToSetUp: ValueHowToSetUp.RANGE,
      },
      {
        name: "FechaTasa",
        description: "Fecha Tasa",
        typeData: ValueDataType.DATE,
        possibleValue: {
          value: "2024-08-15",
        },
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Porcentaje",
        description: "Porcentaje",
        typeData: ValueDataType.PERCENTAGE,
        possibleValue: {
          value: 10,
        },
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Monto",
        description: "Monto",
        typeData: ValueDataType.CURRENCY,
        possibleValue: {
          value: 1000000,
        },
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
    ],
  };
  return decision;
};

const Template: StoryFn<typeof BusinessRuleView> = (args) => (
  <BusinessRuleView {...args} />
);

const getListMulti = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decision: {
      name: "TasaEfectivaAnual",
      description: "Tasa de interés efectiva anual",
      typeData: ValueDataType.ALPHABETICAL,
      howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      possibleValue: {
        list: ["10%", "15%", "20%", "25%"],
        listSelected: ["20%", "25%"],
      },
      startDate: new Date("2024-08-15"),
    },
    conditions: [
      {
        name: "ScoringRiesgo",
        description: "Scoring de riesgo",
        typeData: ValueDataType.NUMBER,
        possibleValue: {
          rangeFrom: 100,
          rangeTo: 700,
        },
        howToSetUp: ValueHowToSetUp.RANGE,
      },
      {
        name: "CategoriaCliente",
        description: "Categoria del cliente",
        typeData: ValueDataType.ALPHABETICAL,
        possibleValue: {
          list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
          listSelected: ["Independiente", "Pensionado"],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
    ],
  };
  return decision;
};

export const ListMutiple = Template.bind({});
ListMutiple.args = {
  decision: getListMulti(),
  textValues: {
    selectOptions: "Seleccione las opciónes",
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
    FactsThatConditionIt: "Hechos que condicionan",
    criteria: "Criterios",
    Terms: "Términos",
  },
};

export const Default = Template.bind({});
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
    FactsThatConditionIt: "Hechos que condicionan",
    criteria: "Criterios",
    Terms: "Términos",
  },
};

export default meta;
