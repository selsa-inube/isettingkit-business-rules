import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { IRulesForm, RulesForm } from "..";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

const meta: Meta<typeof RulesForm> = {
  title: "components/form/RulesForm",
  component: RulesForm,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
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

const getNotCondition = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decision: {
      name: "TasaEfectivaAnual",
      description: "Tasa de interés efectiva anual",
      typeData: ValueDataType.NUMBER,
      howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      possibleValue: {
        value: 10,
      },
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-09-15"),
    },
    conditions: [],
  };
  return decision;
};

const Template: StoryFn<IRulesForm> = (args) => {
  return <RulesForm {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  decision: getData(),
  id: "formRule",
  onCancel: () => console.log("Cancel"),
  onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
  },
};

export const NotConditions = Template.bind({});
NotConditions.args = {
  decision: getNotCondition(),
  id: "NotConditions",
  onCancel: () => console.log("Cancel"),
  onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
  },
};

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
  id: "ListMutiple",
  onCancel: () => console.log("Cancel"),
  onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
  },
};

const getRange = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decision: {
      name: "TasaEfectivaAnual",
      description: "Tasa de interés efectiva anual",
      typeData: ValueDataType.NUMBER,
      howToSetUp: ValueHowToSetUp.RANGE,
      possibleValue: {
        rangeFrom: 10,
        rangeTo: 25,
      },
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-09-15"),
    },
    conditions: [
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
    ],
  };
  return decision;
};

export const Range = Template.bind({});
Range.args = {
  decision: getRange(),
  id: "portal",
  onCancel: () => console.log("Cancel"),
  onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
  },
};

export default meta;
