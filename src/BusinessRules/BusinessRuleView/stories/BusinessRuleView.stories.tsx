import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { IBusinessRuleView, BusinessRuleView } from "..";
import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

const meta: Meta<typeof BusinessRuleView> = {
  title: "components/View/BusinessRuleView",
  component: BusinessRuleView,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const getData = () => {
  const decision: IRuleDecision = {
    decisions: [
      {
        name: "TasaEfectivaMinima",
        label: "Tasa efectiva minima",
        description: "Tasa efectiva minima",
        typeData: ValueDataType.PERCENTAGE,
        value: 4,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "TasaEfectivaMaxima",
        label: "Tasa efectiva maxima",
        description: "Tasa efectiva maxima",
        typeData: ValueDataType.PERCENTAGE,
        value: 8,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
    ],
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-09-15"),
    conditions: [
      {
        name: "AntiguedadCliente",
        label: "Antigüedad del cliente (Días)",
        description: "Antigüedad del cliente (Días)",
        typeData: ValueDataType.NUMBER,
        value: 720,
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "CategoriaCliente",
        description: "Categoría del cliente ",
        label: "Categoría del cliente",
        typeData: ValueDataType.ALPHABETICAL,
        value: {
          list: [
            "Ocasionales",
            "Frecuentes",
            "Leales",
            "Premium",
            "Platinum",
            "Plata",
            "Potenciales",
            "Inactivos",
          ],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "NivelMembresia",
        label: "Nivel de membresía",
        description: "Nivel de membresía",
        typeData: ValueDataType.ALPHABETICAL,
        value: "Alto",
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "ReciprocidadAhorro",
        label: "Reciprocidad de ahorro",
        description: "Reciprocidad de ahorro",
        typeData: ValueDataType.PERCENTAGE,
        value: 19,
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "DestinoDinero",
        label: "Destino del dinero",
        description: "Destino del dinero",
        typeData: ValueDataType.ALPHABETICAL,
        value: "Crédito Vehículo",
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Temporada",
        label: "Temporada",
        description: "Temporada",
        typeData: ValueDataType.ALPHABETICAL,
        value: "Normal",
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "ScoreRiesgo",
        label: "Score de riesgo",
        description: "Score de riesgo",
        typeData: ValueDataType.NUMBER,
        value: 0.2,
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
    ],
  };
  return decision;
};

const getNotCondition = () => {
  const decision: IRuleDecision = {
    decisions: [
      {
        name: "TasaEfectivaMinima",
        description: "Tasa efectiva minima",
        label: "Tasa efectiva minima",
        typeData: ValueDataType.PERCENTAGE,
        value: 8,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "TasaEfectivaMaxima",
        label: "Tasa efectiva maxima",
        description: "Tasa efectiva maxima",
        typeData: ValueDataType.PERCENTAGE,
        value: 10,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
    ],
    conditions: [
      {
        name: "AntiguedadCliente",
        label: "Antiguedad del cliente",
        description: "Antigüedad del cliente ",
        typeData: ValueDataType.DATE,
        value: {
          labelFrom: "Desde",
          labelTo: "Hasta",
          rangeFrom: "2024-09-02",
          rangeTo: "N/A",
        },
        howToSetUp: ValueHowToSetUp.RANGE,
      },
      {
        name: "CategoriaCliente",
        label: "Categoría del cliente",
        description: "Categoría del cliente ",
        typeData: ValueDataType.ALPHABETICAL,
        value: {
          list: [
            "Ocasionales",
            "Frecuentes",
            "Leales",
            "Premium",
            "Platinum",
            "Plata",
            "Potenciales",
            "Inactivos",
          ],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
    ],
  };
  return decision;
};

const Template: StoryFn<IBusinessRuleView> = (args) => {
  return <BusinessRuleView {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  decision: getData(),
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
    Terms: "Vigencia",
  },
};

export const NotConditions = Template.bind({});
NotConditions.args = {
  decision: getNotCondition(),
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
    Terms: "Vigencia",
  },
};

const getListMulti = () => {
  const decision: IRuleDecision = {
    decisions: [
      {
        name: "TasaEfectivaMinima",
        label: "Tasa efectiva minima",
        description: "Tasa efectiva minima",
        typeData: ValueDataType.PERCENTAGE,
        value: 4,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "TasaEfectivaMaxima",
        label: "Tasa efectiva maxima",
        description: "Tasa efectiva maxima",
        typeData: ValueDataType.PERCENTAGE,
        value: 8,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
    ],
    conditions: [
      {
        name: "CategoriaCliente",
        label: "Categoría del cliente",
        description: "Categoría del cliente ",
        typeData: ValueDataType.ALPHABETICAL,
        value: {
          list: [
            "Ocasionales",
            "Frecuentes",
            "Leales",
            "Premium",
            "Platinum",
            "Plata",
            "Potenciales",
            "Inactivos",
          ],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "ReciprocidadAhorro",
        label: "Reciprocidad de ahorro",
        description: "Reciprocidad de ahorro",
        typeData: ValueDataType.PERCENTAGE,
        value: 19,
        howToSetUp: ValueHowToSetUp.EQUAL,
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
    Terms: "Vigencia",
  },
};

const getRange = () => {
  const decision: IRuleDecision = {
    decision: {
      name: "TasaEfectivaAnual",
      label: "Tasa de interés efectiva anual",
      description: "Tasa de interés efectiva anual",
      typeData: ValueDataType.NUMBER,
      howToSetUp: ValueHowToSetUp.RANGE,
      value: {
        rangeFrom: 10,
        rangeTo: 25,
      },
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-09-15"),
    },
    conditions: [
      {
        name: "Riesgo",
        label: "Riesgo",
        description: "Riesgo",
        typeData: ValueDataType.ALPHABETICAL,
        value: {
          list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
          listSelected: ["Medio"],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "CarteraDescubierto",
        label: "Cartera de descubierto",
        description: "Cartera de descubierto",
        typeData: ValueDataType.CURRENCY,
        value: {
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
    Terms: "Vigencia",
  },
};

export default meta;
