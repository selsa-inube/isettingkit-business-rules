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
    decisionId: "a7233c84-4fd5-4064-951f-81b6f2f7ae6c",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: { from: 4, to: 8 },
    // i18nValue: 'This is a test',
    howToSetTheDecision: EValueHowToSetUp.RANGE,
    effectiveFrom: "2024-12-31",
    validUntil: "2025-11-11",
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
    ],
  },
  {
    ruleName: "LoanTerm",
    labelName: "Plazo",
    descriptionUse: "LoanTerm",
    decisionDataType: ValueDataType.NUMBER,
    ruleDataType: "Number",
    howToSetTheDecision: EValueHowToSetUp.RANGE,
    value: {
      from: 1,
      to: 29,
    },
    effectiveFrom: "2026-01-21",
    listOfPossibleValues: {
      list: [],
    },
    decisionId: "a7233c84-4fd5-4064-951f-81b6f2f7ae6c", // same as first decision (on purpose?)
    conditionGroups: [
      {
        ConditionGroupId: "84098043-3d78-493d-85db-c5c14d7249d1",
        conditionsThatEstablishesTheDecision: [
          {
            conditionName: "MoneyDestination",
            labelName: "Destino del dinero",
            descriptionUse: "MoneyDestination",
            conditionDataType: ValueDataType.ALPHABETICAL,
            value: "prueba",
            howToSetTheCondition: EValueHowToSetUp.EQUAL,
            TimeUnit: "",
            timeUnit: "",
            listOfPossibleValues: {
              list: [
                {
                  id: "Participación en eventos de la entidad",
                  label: "Participación en eventos de la entidad",
                  value: "Participación en eventos de la entidad",
                },
                {
                  id: "Otros destinos no identificados anteriormente",
                  label: "Otros destinos no identificados anteriormente",
                  value: "Otros destinos no identificados anteriormente",
                },
                {
                  id: "Gastos de escrituración y registro",
                  label: "Gastos de escrituración y registro",
                  value: "Gastos de escrituración y registro",
                },
              ],
            },
            hidden: false,
            i18n: "prueba",
          },
          {
            conditionName: "LoanAmount",
            labelName: "Monto máximo del préstamo",
            descriptionUse: "LoanAmount",
            conditionDataType: ValueDataType.MONETARY,
            value: {
              from: 1000,
              to: 20000,
            },
            howToSetTheCondition: EValueHowToSetUp.RANGE,
            TimeUnit: "",
            timeUnit: "",
            listOfPossibleValues: {
              list: [],
            },
            hidden: false,
          },
        ],
      },
    ],
    _originalDecisionId: "a7233c84-4fd5-4064-951f-81b6f2f7ae6c",
  },
];


const decisionTemplate: any = {
  ruleName: "TasaEfectivaAnual",
  labelName: "Tasa Efectiva Anual",
  decisionDataType: ValueDataType.PERCENTAGE,
  howToSetTheDecision: EValueHowToSetUp.EQUAL,
  // value: "",
  //howToSetTheDecision: EValueHowToSetUp.LESS_THAN,
  listOfPossibleValues: {
    list: [
      { id: "value-1", label: "Muy alto", value: "ass" },
      { id: "value-2", label: "Alto", value: "cdd" },
      { id: "value-3", label: "Medio", value: "vbfb" },
      { id: "value-4", label: "Bajo", value: "hnh" },
      { id: "value-5", label: "Muy bajo", value: "yyy" },
    ],
  },
  value: "",
  effectiveFrom: "",
  validUntil: "",
  timeUnit: "Day",
  placeholder: "Seleccione un valor",
  conditionGroups: [
    {
      ConditionGroupId: "group-primary",
      conditionsThatEstablishesTheDecision: [
        {
          labelName: "Line of credit",
          conditionName: "LineOfCredit",
          descriptionUse: "Line of credit.",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.EQUAL,
          value: "",
          placeholder: "0.0%",
          i18n: {
            es: "Línea de crédito",
          },
          listOfPossibleValues: {},
        },
        {
          labelName: "Porcentaje de riesgo",
          conditionName: "PorcentajeDeRiesgo",
          descriptionUse: "Porcentaje de riesgo",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          placeholderFrom: "0.0%",
          placeholderTo: "100.0%",
          value: "",
          i18n: {
            es: "Porcentaje de riesgo",
          },
        },
        {
          labelName: "Membresia del cliente",
          conditionName: "NivelDeMembresía",
          descriptionUse: "Membresia del cliente",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.GREATER_THAN,
          value: "",
          i18n: {
            es: "Línea de crédito",
          },
        },
        {
          labelName: "reciprocidad de ahorro",
          conditionName: "ReciprocidadDeAhorro",
          descriptionUse: "reciprocidad de ahorro",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.LESS_THAN,
          value: "",
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
            list: [
              { id: "value-1", label: "Muy alto", value: "Muy alto" },
              { id: "value-2", label: "Alto", value: "Alto" },
              { id: "value-3", label: "Medio", value: "Medio" },
              { id: "value-4", label: "Bajo", value: "Bajo" },
              { id: "value-5", label: "Muy bajo", value: "Muy bajo" },
            ],
          },
          value: "",
          i18n: {
            es: "Línea de crédito",
          },
        },
      ],
    },
    {
      ConditionGroupId: "aditional-group-1",
      conditionsThatEstablishesTheDecision: [
        {
          labelName: "Line of credit",
          conditionName: "LineOfCredit",
          descriptionUse: "Line of credit.",
          conditionDataType: ValueDataType.ALPHABETICAL,
          howToSetTheCondition: EValueHowToSetUp.EQUAL,
          value: "",
          i18n: {
            es: "Línea de crédito",
          },
        },
        {
          labelName: "Porcentaje de riesgo",
          conditionName: "PorcentajeDeRiesgo",
          descriptionUse: "Porcentaje de riesgo",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.RANGE,
          value: "",
          i18n: {
            es: "Porcentaje de riesgo",
          },
        },
        {
          labelName: "Membresia del cliente",
          conditionName: "NivelDeMembresía",
          descriptionUse: "Membresia del cliente",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.GREATER_THAN,
          value: "",
          i18n: {
            es: "Línea de crédito",
          },
        },
        {
          labelName: "reciprocidad de ahorro",
          conditionName: "ReciprocidadDeAhorro",
          descriptionUse: "reciprocidad de ahorro",
          conditionDataType: ValueDataType.PERCENTAGE,
          howToSetTheCondition: EValueHowToSetUp.LESS_THAN,
          value: "",
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
            list: [
              { id: "value-1", label: "Muy alto", value: "Muy alto" },
              { id: "value-2", label: "Alto", value: "Alto" },
              { id: "value-3", label: "Medio", value: "Medio" },
              { id: "value-4", label: "Bajo", value: "Bajo" },
              { id: "value-5", label: "Muy bajo", value: "Muy bajo" },
            ],
          },
          value: "",
          i18n: {
            es: "Línea de crédito",
          },
        },
      ],
    },
  ],
  // "group-primary": [
  //   {
  //     labelName: "Antigüedad del cliente (Días)",
  //     conditionName: "AntigüedadDelCliente(Días)",
  //     descriptionUse: "Antigüedad del cliente (Días)",
  //     conditionDataType: ValueDataType.NUMBER,
  //     howToSetTheCondition: EValueHowToSetUp.GREATER_THAN,
  //     value: "",
  //     timeUnit: "Day",
  //     i18n: {
  //       es: "Antigüedad del cliente (Días)",
  //     },
  //   },
  //   {
  //     labelName: "Porcentaje de riesgo",
  //     conditionName: "PorcentajeDeRiesgo",
  //     descriptionUse: "Porcentaje De Riesgo",
  //     conditionDataType: ValueDataType.PERCENTAGE,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "Porcentaje de riesgo",
  //     },
  //   },
  //   {
  //     labelName: "Membresia del cliente",
  //     conditionName: "NivelDeMembresía",
  //     descriptionUse: "Nivel De Membresía",
  //     conditionDataType: ValueDataType.ALPHABETICAL,
  //     howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
  //     listOfPossibleValues: {
  //       list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
  //     },
  //     value: "",
  //     i18n: {
  //       es: "Membresia del cliente",
  //     },
  //   },
  //   {
  //     labelName: "reciprocidad de ahorro",
  //     conditionName: "ReciprocidadDeAhorro",
  //     descriptionUse: "Reciprocidad De Ahorro",
  //     conditionDataType: ValueDataType.MONETARY,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "reciprocidad de ahorro",
  //     },
  //   },
  // ],
  // "aditional-group-1": [
  //   {
  //     labelName: "Antigüedad del cliente (Días)1",
  //     conditionName: "AntigüedadDelCliente(Días)1",
  //     descriptionUse: "Antigüedad del cliente (Días)1",
  //     conditionDataType: ValueDataType.NUMBER,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "Antigüedad del cliente (Días)1",
  //     },
  //   },
  //   {
  //     labelName: "Porcentaje de riesgo1",
  //     conditionName: "PorcentajeDeRiesgo1",
  //     descriptionUse: "Porcentaje De Riesgo1",
  //     conditionDataType: ValueDataType.PERCENTAGE,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "Porcentaje de riesgo1",
  //     },
  //   },
  //   {
  //     labelName: "Membresia del cliente1",
  //     conditionName: "NivelDeMembresía1",
  //     descriptionUse: "Nivel De Membresía1",
  //     conditionDataType: ValueDataType.ALPHABETICAL,
  //     howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
  //     listOfPossibleValues: {
  //       list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
  //     },
  //     value: "",
  //     i18n: {
  //       es: "Membresia del cliente1",
  //     },
  //   },
  //   {
  //     labelName: "reciprocidad de ahorro1",
  //     conditionName: "ReciprocidadDeAhorro1",
  //     descriptionUse: "Reciprocidad De Ahorro1",
  //     conditionDataType: ValueDataType.PERCENTAGE,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "reciprocidad de ahorro1",
  //     },
  //   },
  // ],
  // "aditional-group-2": [
  //   {
  //     labelName: "Antigüedad del cliente (Días)2",
  //     conditionName: "AntigüedadDelCliente(Días)2",
  //     descriptionUse: "Antigüedad del cliente (Días)2",
  //     conditionDataType: ValueDataType.NUMBER,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "Antigüedad del cliente (Días)2",
  //     },
  //   },
  //   {
  //     labelName: "Porcentaje de riesgo2",
  //     conditionName: "PorcentajeDeRiesgo2",
  //     descriptionUse: "Porcentaje De Riesgo2",
  //     conditionDataType: ValueDataType.PERCENTAGE,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "Porcentaje de riesgo2",
  //     },
  //   },
  //   {
  //     labelName: "Membresia del cliente2",
  //     conditionName: "NivelDeMembresía2",
  //     descriptionUse: "Nivel De Membresía2",
  //     conditionDataType: ValueDataType.ALPHABETICAL,
  //     howToSetTheCondition: EValueHowToSetUp.LIST_OF_VALUES,
  //     listOfPossibleValues: {
  //       list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
  //     },
  //     value: "",
  //     i18n: {
  //       es: "Membresia del cliente2",
  //     },
  //   },
  //   {
  //     labelName: "reciprocidad de ahorro2",
  //     conditionName: "ReciprocidadDeAhorro2",
  //     descriptionUse: "Reciprocidad De Ahorro2",
  //     conditionDataType: ValueDataType.PERCENTAGE,
  //     howToSetTheCondition: EValueHowToSetUp.RANGE,
  //     value: "",
  //     i18n: {
  //       es: "reciprocidad de ahorro2",
  //     },
  //   },
  // ],
  // },
};

const addCard: Story = (args: IBusinessRulesNewController) => (
  <BusinessRulesNewController {...args} />
);
addCard.args = {
  cardTitle: true,
  controls: true,
  customMessageEmptyDecisions: "Aún NO tienes definidas Líneas de crédito",
  customTitleContentAddCard: "Agregar línea de crédito",
  editionMode: "classic",
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
