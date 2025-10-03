/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/react";
import { parameters } from "./props";
import { ValueDataType } from "@isettingkit/input";
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

const sampleDecisions: any[] = [
  {
    decisionId: "Decisión 1",
    ruleName: "TasaEfectivaAnual",
    labelName: "Tasa Efectiva Anual",
    decisionDataType: ValueDataType.PERCENTAGE,
    value: { from: 4, to: 8 },
    howToSetTheDecision: EValueHowToSetUp.RANGE,
    effectiveFrom: "2024-12-31",
    validUntil: "2024-12-31",
    conditionGroups: [
      {
        ConditionGroupId: "group-primary",
        conditionsThatEstablishesTheDecision: [
          {
            labelName: "Line of credit",
            conditionName: "LineOfCredit",
            descriptionUse: "Line of credit.",
            conditionDataType: ValueDataType.ALPHABETICAL,
            howToSetTheCondition: EValueHowToSetUp.EQUAL,
            value: "credito 1",
            i18n: {
              es: "Línea de crédito",
            },
          },
        ],
      },
    ],
  },
];

const decisionTemplate: any = {
  ruleName: "InterestRateType",
  labelName: "Interest Rate Type",
  descriptionUse:
    "It presents the list of available rate types according to the credit line (mv ma)",
  decisionDataType: ValueDataType.PERCENTAGE,
  howToSetTheDecision: EValueHowToSetUp.EQUAL,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionGroups: {
    ConditionGroupId: "group-primary",
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
        labelName: "Money Destination",
        conditionName: "MoneyDestination",
        descriptionUse: "Money Destination.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Destino de dinero",
        },
      },
      {
        labelName: "Loan amount",
        conditionName: "LoanAmount",
        descriptionUse: "Loan amount",
        conditionDataType: ValueDataType.MONETARY,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Monto del préstamo",
        },
      },
      {
        labelName: "Primary Income Type.",
        conditionName: "PrimaryIncomeType",
        descriptionUse: "Primary income type.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Tipo de fuente de ingreso primaria",
        },
      },
      {
        labelName: "Client Type",
        conditionName: "ClientType",
        descriptionUse: "Client Type.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Tipo de cliente",
        },
      },
      {
        labelName: "Loan Term",
        conditionName: "LoanTerm",
        descriptionUse: "Loan Term.",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Plazo del préstamo",
        },
      },
    ],
    "aditional-group-1": [
      {
        labelName: "Line of credit",
        conditionName: "LineOfCredit1",
        descriptionUse: "Line of credit.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Línea de crédito",
        },
      },
      {
        labelName: "Money Destination",
        conditionName: "MoneyDestination1",
        descriptionUse: "Money Destination.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Destino de dinero",
        },
      },
      {
        labelName: "Loan amount",
        conditionName: "LoanAmount1",
        descriptionUse: "Loan amount",
        conditionDataType: ValueDataType.CURRENCY,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Monto del préstamo",
        },
      },
      {
        labelName: "Primary income type.",
        conditionName: "PrimaryIncomeType1",
        descriptionUse: "Primary income type.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Tipo de fuente de ingreso primaria.",
        },
      },
      {
        labelName: "Client Type",
        conditionName: "ClientType1",
        descriptionUse: "Client Type.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Tipo de cliente",
        },
      },
      {
        labelName: "Loan Term",
        conditionName: "LoanTerm1",
        descriptionUse: "Loan Term.",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Plazo del préstamo",
        },
      },
    ],
    "aditional-group-2": [
      {
        labelName: "Line of credit",
        conditionName: "LineOfCredit2",
        descriptionUse: "Line of credit.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Línea de crédito",
        },
      },
      {
        labelName: "Money Destination",
        conditionName: "MoneyDestination2",
        descriptionUse: "Money Destination.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Destino de dinero",
        },
      },
      {
        labelName: "Loan amount",
        conditionName: "LoanAmount2",
        descriptionUse: "Loan amount",
        conditionDataType: ValueDataType.MONETARY,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Monto del préstamo",
        },
      },
      {
        labelName: "Primary income type.",
        conditionName: "PrimaryIncomeType2",
        descriptionUse: "Primary income type.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Tipo de fuente de ingreso primaria.",
        },
      },
      {
        labelName: "Client Type",
        conditionName: "ClientType2",
        descriptionUse: "Client Type.",
        conditionDataType: ValueDataType.ALPHABETICAL,
        howToSetTheCondition: EValueHowToSetUp.EQUAL,
        value: "",
        i18n: {
          es: "Tipo de cliente",
        },
      },
      {
        labelName: "Loan Term",
        conditionName: "LoanTerm2",
        descriptionUse: "Loan Term.",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
        i18n: {
          es: "Plazo del préstamo",
        },
      },
    ],
  },
  i18n: {
    en: "Interest rate type",
    es: "Tipo de tasa de interés",
  },
};

const addCard: Story = (args: IBusinessRulesController) => (
  <BusinessRulesController {...args} />
);
addCard.args = {
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
  },
};

export { addCard };
export default meta;
