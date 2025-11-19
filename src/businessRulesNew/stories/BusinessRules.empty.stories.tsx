/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/react";
import { parameters } from "./props";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
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

const sampleDecisions: IRuleDecision[] = [];

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
  conditionsThatEstablishesTheDecision: {
    "group-primary": [
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

export const Empty: Story = (args: IBusinessRulesNewController) => (
  <BusinessRulesNewController {...args} />
);
Empty.args = {
  initialDecisions: sampleDecisions,
  decisionTemplate,
  language: "es",
  shouldRenderEmptyMessage: false,
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
