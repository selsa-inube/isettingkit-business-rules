/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/react";
import { parameters } from "./props";
import { ValueDataType } from "@isettingkit/input";
import {
  BusinessRulesNewController,
  IBusinessRulesNewController,
} from "./BusinessRules.controller";
import { EValueHowToSetUp } from "../enums/EValueHowToSetUp";

const meta: Meta<typeof BusinessRulesNewController> = {
  title: "components/BusinessRulesNew",
  component: BusinessRulesNewController,
  parameters,
  // argTypes: props,
};

type Story = StoryObj<typeof BusinessRulesNewController>;

const sampleDecisions: any[] = [
  {
    decisionId: "Decisión 1",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.NUMBER,
    value: { from: 4, to: 8 },
    howToSetTheDecision: EValueHowToSetUp.RANGE,
    effectiveFrom: "2024-12-31",
    validUntil: "2024-12-31",
    effectiveFromLabel: "valida desde",
    conditionGroups: [
      {
        ConditionGroupId: "6fe99f2f-2e1a-489e-a081-14d7e9381c94",
        conditionsThatEstablishesTheDecision: [
          {
            labelName: "Line of credit",
            conditionName: "LineOfCredit",
            descriptionUse: "Line of credit.",
            conditionDataType: ValueDataType.ALPHABETICAL,
            howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
            value: ["H", "O", "L", "A"],
            i18n: {
              es: "Línea de crédito",
            },
          },
          {
            labelName: "Line of credit11",
            conditionName: "LineOfCredit12",
            descriptionUse: "Line of credit12.",
            conditionDataType: ValueDataType.PERCENTAGE,
            howToSetTheCondition: EValueHowToSetUp.EQUAL,
            value: "2",
            i18n: {
              es: "Línea de crédito",
            },
          },
          {
            labelName: "Line of credit13",
            conditionName: "LineOfCredit13",
            descriptionUse: "Line of credit13.",
            conditionDataType: ValueDataType.PERCENTAGE,
            howToSetTheCondition: EValueHowToSetUp.GREATER_THAN,
            value: "2",
            i18n: {
              es: "Línea de crédito",
            },
          },
          {
            labelName: "Line of credit14",
            conditionName: "LineOfCredit14",
            descriptionUse: "Line of credit14.",
            conditionDataType: ValueDataType.PERCENTAGE,
            howToSetTheCondition: EValueHowToSetUp.LESS_THAN,
            value: "2",
            i18n: {
              es: "Línea de crédito",
            },
          },
          {
            labelName: "Line of credit24",
            conditionName: "LineOfCredit24",
            descriptionUse: "Line of credit.24",
            conditionDataType: ValueDataType.ALPHABETICAL,
            howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES_MULTI,
            listOfPossibleValues: {
              list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
            },
            value: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
            i18n: {
              es: "Línea de crédito",
            },
          },
        ],
      },
      {
        ConditionGroupId: "6fe99f2f-2e1a-489e-a081-14d7e9381c87",
        conditionsThatEstablishesTheDecision: [
          {
            labelName: "Line of credit",
            conditionName: "LineOfCredit1",
            descriptionUse: "Line of credit.",
            conditionDataType: ValueDataType.ALPHABETICAL,
            howToSetTheCondition: EValueHowToSetUp.EQUAL,
            value: "Linea de credito numero 3",
            i18n: {
              es: "Línea de crédito",
            },
          },
        ],
      },
      {
        ConditionGroupId: "6fe99f2f-2e1a-489e-a081-87d7e9381c87",
        conditionsThatEstablishesTheDecision: [
          {
            labelName: "Line of credit",
            conditionName: "LineOfCredit2",
            descriptionUse: "Line of credit.",
            conditionDataType: ValueDataType.ALPHABETICAL,
            howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES_MULTI,
            listOfPossibleValues: {
              list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
            },
            value: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
            i18n: {
              es: "Línea de crédito",
            },
          },
        ],
      },
    ],
    // conditionsThatEstablishesTheDecision: {
    //   "group-primary": [
    //     {
    //       labelName: "Antigüedad del cliente (Días)",
    //       conditionName: "AntigüedadDelCliente(Días)",
    //       descriptionUse: "Antigüedad del cliente (Días)",
    //       conditionDataType: ValueDataType.NUMBER,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "1",
    //     },
    //     {
    //       labelName: "Porcentaje de riesgo",
    //       conditionName: "PorcentajeDeRiesgo",
    //       descriptionUse: "Porcentaje De Riesgo",
    //       conditionDataType: ValueDataType.PERCENTAGE,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "2",
    //     },
    //     {
    //       labelName: "Membresia del cliente",
    //       conditionName: "NivelDeMembresía",
    //       descriptionUse: "Nivel De Membresía",
    //       conditionDataType: ValueDataType.ALPHABETICAL,
    //       howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES_MULTI,
    //       listOfPossibleValues: {
    //         list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
    //       },
    //       value: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
    //     },
    //     {
    //       labelName: "reciprocidad de ahorro",
    //       conditionName: "ReciprocidadDeAhorro",
    //       descriptionUse: "Reciprocidad De Ahorro",
    //       conditionDataType: ValueDataType.PERCENTAGE,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "4",
    //     },
    //   ],
    //   "aditional-group-1": [
    //     {
    //       labelName: "Antigüedad del cliente (Días)1",
    //       conditionName: "AntigüedadDelCliente(Días)1",
    //       descriptionUse: "Antigüedad del cliente (Días)1",
    //       conditionDataType: ValueDataType.NUMBER,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "22",
    //     },
    //     {
    //       labelName: "Porcentaje de riesgo1",
    //       conditionName: "PorcentajeDeRiesgo1",
    //       descriptionUse: "Porcentaje De Riesgo1",
    //       conditionDataType: ValueDataType.PERCENTAGE,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "23",
    //     },
    //     {
    //       labelName: "Membresia del cliente1",
    //       conditionName: "NivelDeMembresía1",
    //       descriptionUse: "Nivel De Membresía1",
    //       conditionDataType: ValueDataType.ALPHABETICAL,
    //       howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
    //       listOfPossibleValues: {
    //         list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
    //       },
    //       value: "33",
    //     },
    //     {
    //       labelName: "reciprocidad de ahorro1",
    //       conditionName: "ReciprocidadDeAhorro1",
    //       descriptionUse: "Reciprocidad De Ahorro1",
    //       conditionDataType: ValueDataType.PERCENTAGE,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "44",
    //     },
    //   ],
    //   "aditional-group-2": [
    //     {
    //       labelName: "Antigüedad del cliente (Días)2",
    //       conditionName: "AntigüedadDelCliente(Días)2",
    //       descriptionUse: "Antigüedad del cliente (Días)2",
    //       conditionDataType: ValueDataType.NUMBER,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "12",
    //     },
    //     {
    //       labelName: "Porcentaje de riesgo2",
    //       conditionName: "PorcentajeDeRiesgo2",
    //       descriptionUse: "Porcentaje De Riesgo2",
    //       conditionDataType: ValueDataType.PERCENTAGE,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "21",
    //     },
    //     {
    //       labelName: "Membresia del cliente2",
    //       conditionName: "NivelDeMembresía2",
    //       descriptionUse: "Nivel De Membresía2",
    //       conditionDataType: ValueDataType.ALPHABETICAL,
    //       howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
    //       listOfPossibleValues: {
    //         list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
    //       },
    //       value: "334",
    //     },
    //     {
    //       labelName: "reciprocidad de ahorro2",
    //       conditionName: "ReciprocidadDeAhorro2",
    //       descriptionUse: "Reciprocidad De Ahorro2",
    //       conditionDataType: ValueDataType.PERCENTAGE,
    //       howToSetTheCondition: EValueHowToSetUp.EQUAL,
    //       value: "422",
    //     },
    //   ],
    // },
  },
  {
    decisionId: "Decisión 2",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: { from: 14.2, to: 21.5 },
    howToSetTheDecision: EValueHowToSetUp.RANGE,
    effectiveFrom: "2024-12-31",
    validUntil: "2024-12-31",
    conditionsThatEstablishesTheDecision: {
      "group-primary": [
        {
          labelName: "Antigüedad del cliente (Días)",
          conditionName: "AntigüedadDelCliente(Días)",
          descriptionUse: "Antigüedad del cliente (Días)",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
          value: ["abc", "10", "20", "45"],
          timeUnit: "Year",
        },
        {
          labelName: "Porcentaje de riesgo",
          conditionName: "PorcentajeDeRiesgo",
          descriptionUse: "Porcentaje De Riesgo",
          conditionDataType: ValueDataType.MONETARY,
          howToSetTheCondition: EValueHowToSetUp.LESS_THAN,
          value: 25000000,
        },
        {
          labelName: "Membresia del cliente",
          conditionName: "NivelDeMembresía",
          descriptionUse: "Nivel De Membresía",
          conditionDataType: ValueDataType.ALPHABETICAL,
          howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES_MULTI,
          listOfPossibleValues: {
            list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
          },
          value: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
        },
        {
          labelName: "reciprocidad de ahorro",
          conditionName: "ReciprocidadDeAhorro",
          descriptionUse: "Reciprocidad De Ahorro",
          conditionDataType: ValueDataType.MONETARY,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value: { from: 10, to: 20 },
        },
      ],
      "aditional-group-1": [
        {
          labelName: "Antigüedad del cliente (Días)1",
          conditionName: "AntigüedadDelCliente(Días)1",
          descriptionUse: "Antigüedad del cliente (Días)1",
          conditionDataType: ValueDataType.MONETARY,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value: {from: 2.2, to: 44.2},
        },
        {
          labelName: "Porcentaje de riesgo1",
          conditionName: "PorcentajeDeRiesgo1",
          descriptionUse: "Porcentaje De Riesgo1",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value: {from: 2, to: 4},
        },
        {
          labelName: "Membresia del cliente1",
          conditionName: "NivelDeMembresía1",
          descriptionUse: "Nivel De Membresía1",
          conditionDataType: ValueDataType.ALPHABETICAL,
          howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
          listOfPossibleValues: {
            list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
          },
          value: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
        },
        {
          labelName: "reciprocidad de ahorro1",
          conditionName: "ReciprocidadDeAhorro1",
          descriptionUse: "Reciprocidad De Ahorro1",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value: {from: 2, to: 4},
        },
      ],
      "aditional-group-2": [
        {
          labelName: "Antigüedad del cliente (Días)2",
          conditionName: "AntigüedadDelCliente(Días)2",
          descriptionUse: "Antigüedad del cliente (Días)2",
          conditionDataType: ValueDataType.NUMBER,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value:  {from: 2, to: 4},
        },
        {
          labelName: "Porcentaje de riesgo2",
          conditionName: "PorcentajeDeRiesgo2",
          descriptionUse: "Porcentaje De Riesgo2",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value:  {from: 3, to: 12},
        },
        {
          labelName: "Membresia del cliente2",
          conditionName: "NivelDeMembresía2",
          descriptionUse: "Nivel De Membresía2",
          conditionDataType: ValueDataType.ALPHABETICAL,
          howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
          listOfPossibleValues: {
            list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
          },
          value: ["Muy alto"],
        },
        {
          labelName: "reciprocidad de ahorro2",
          conditionName: "ReciprocidadDeAhorro2",
          descriptionUse: "Reciprocidad De Ahorro2",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value:  {from: 2, to: 1},
        },
      ],
    },
  },
];

const decisionTemplate: any = {
  ruleName: "TasaEfectivaAnual",
  labelName: "Tasa Efectiva Anual",
  decisionDataType: ValueDataType.PERCENTAGE,
  // howToSetTheDecision: EValueHowToSetUp.RANGE,
  // value: "",
  howToSetTheDecision: EValueHowToSetUp.LIST_OF_VALUES,
  listOfPossibleValues: {
    list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
  },
  value: "",
  effectiveFrom: "",
  validUntil: "",
  timeUnit: "Day",
  conditionsThatEstablishesTheDecision: {
    "group-primary": [
      {
        labelName: "Antigüedad del cliente (Días)",
        conditionName: "AntigüedadDelCliente(Días)",
        descriptionUse: "Antigüedad del cliente (Días)",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.GREATER_THAN,
        value: "",
        timeUnit: "Day",
        i18n:{
          es: "Antigüedad del cliente (Días)"
        }
      },
      {
        labelName: "Porcentaje de riesgo",
        conditionName: "PorcentajeDeRiesgo",
        descriptionUse: "Porcentaje De Riesgo",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Porcentaje de riesgo"
        }
      },
      {
        labelName: "Membresia del cliente",
        conditionName: "NivelDeMembresía",
        descriptionUse: "Nivel De Membresía",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
        listOfPossibleValues: {
          list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
        },
        value: "",
        i18n: {
          es: "Membresia del cliente"
        }
      },
      {
        labelName: "reciprocidad de ahorro",
        conditionName: "ReciprocidadDeAhorro",
        descriptionUse: "Reciprocidad De Ahorro",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "reciprocidad de ahorro"
        }
      },
    ],
    "aditional-group-1": [
      {
        labelName: "Antigüedad del cliente (Días)1",
        conditionName: "AntigüedadDelCliente(Días)1",
        descriptionUse: "Antigüedad del cliente (Días)1",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Antigüedad del cliente (Días)1"
        }
      },
      {
        labelName: "Porcentaje de riesgo1",
        conditionName: "PorcentajeDeRiesgo1",
        descriptionUse: "Porcentaje De Riesgo1",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Porcentaje de riesgo1"
        }
      },
      {
        labelName: "Membresia del cliente1",
        conditionName: "NivelDeMembresía1",
        descriptionUse: "Nivel De Membresía1",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
        listOfPossibleValues: {
          list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
        },
        value: "",
        i18n: {
          es: "Membresia del cliente1"
        }
      },
      {
        labelName: "reciprocidad de ahorro1",
        conditionName: "ReciprocidadDeAhorro1",
        descriptionUse: "Reciprocidad De Ahorro1",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "reciprocidad de ahorro1"
        }
      },
    ],
    "aditional-group-2": [
      {
        labelName: "Antigüedad del cliente (Días)2",
        conditionName: "AntigüedadDelCliente(Días)2",
        descriptionUse: "Antigüedad del cliente (Días)2",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Antigüedad del cliente (Días)2"
        }
      },
      {
        labelName: "Porcentaje de riesgo2",
        conditionName: "PorcentajeDeRiesgo2",
        descriptionUse: "Porcentaje De Riesgo2",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Porcentaje de riesgo2"
        }
      },
      {
        labelName: "Membresia del cliente2",
        conditionName: "NivelDeMembresía2",
        descriptionUse: "Nivel De Membresía2",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
        listOfPossibleValues: {
          list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
        },
        value: "",
        i18n: {
          es: "Membresia del cliente2"
        }
      },
      {
        labelName: "reciprocidad de ahorro2",
        conditionName: "ReciprocidadDeAhorro2",
        descriptionUse: "Reciprocidad De Ahorro2",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "reciprocidad de ahorro2"
        }
      },
    ],
  },
};

const addCard: Story = (args: IBusinessRulesNewController) => (
  <BusinessRulesNewController {...args} />
);
addCard.args = {
  cardTitle: true,
  controls: true,
  customMessageEmptyDecisions: "Aún NO tienes definidas Líneas de crédito",
  customTitleContentAddCard: "Agregar línea de crédito",
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
    effectiveFrom: "Vigencia desde:",
    validUntil: "Vigencia hasta:",
  },
};

export { addCard };
export default meta;
