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
  ruleName: "TasaEfectivaAnual",
  decisionDataType: ValueDataType.ALPHABETICAL,
  howToSetTheDecision: ValueHowToSetUp.EQUAL,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionThatEstablishesTheDecision: [
    {
      labelName: "Antigüedad del cliente (Días)",
      conditionName: "AntigüedadDelCliente(Días)",
      descriptionUse: "Antigüedad del cliente (Días)",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "Categoría Del Cliente",
      conditionName: "CategoríaDelCliente",
      descriptionUse: "Categoría Del Cliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      listOfPossibleValues: {
        list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
      },
      value: [],
    },
    {
      labelName: "Nivel De Membresía",
      conditionName: "NivelDeMembresía",
      descriptionUse: "Nivel De Membresía",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: ValueHowToSetUp.LIST_OF_VALUES,
      listOfPossibleValues: {
        list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
      },
      value: "",
    },
    {
      labelName: "Reciprocidad De Ahorro",
      conditionName: "ReciprocidadDeAhorro",
      descriptionUse: "Reciprocidad De Ahorro",
      conditionDataType: ValueDataType.PERCENTAGE,
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "Destino Del Dinero",
      conditionName: "DestinoDelDinero",
      descriptionUse: "Destino Del Dinero",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "Temporada",
      conditionName: "Temporada",
      descriptionUse: "Temporada",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
      value: "",
    },
    {
      labelName: "ScoringDeRiesgo",
      conditionName: "ScoringDeRiesgo",
      descriptionUse: "ScoringDeRiesgo",
      conditionDataType: ValueDataType.ALPHABETICAL,
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
      value: "",
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
