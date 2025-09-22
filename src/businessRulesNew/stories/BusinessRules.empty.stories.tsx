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
  ruleName: "TasaEfectivaAnual",
  labelName: "Tasa Efectiva Anual",
  decisionDataType: ValueDataType.PERCENTAGE,
  howToSetTheDecision: EValueHowToSetUp.EQUAL,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionsThatEstablishesTheDecision: {
    "group-primary": [
      {
        labelName: "Antigüedad del cliente Días",
        conditionName: "AntigüedadDelClienteDías",
        descriptionUse: "Antigüedad del cliente Días",
        conditionDataType: ValueDataType.NUMBER,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
      },
      {
        labelName: "Porcentaje de riesgo",
        conditionName: "PorcentajeDeRiesgo",
        descriptionUse: "Porcentaje De Riesgo",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
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
      },
      {
        labelName: "reciprocidad de ahorro",
        conditionName: "ReciprocidadDeAhorro",
        descriptionUse: "Reciprocidad De Ahorro",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
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
      },
      {
        labelName: "Porcentaje de riesgo1",
        conditionName: "PorcentajeDeRiesgo1",
        descriptionUse: "Porcentaje De Riesgo1",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
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
      },
      {
        labelName: "reciprocidad de ahorro1",
        conditionName: "ReciprocidadDeAhorro1",
        descriptionUse: "Reciprocidad De Ahorro1",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
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
      },
      {
        labelName: "Porcentaje de riesgo2",
        conditionName: "PorcentajeDeRiesgo2",
        descriptionUse: "Porcentaje De Riesgo2",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
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
      },
      {
        labelName: "reciprocidad de ahorro2",
        conditionName: "ReciprocidadDeAhorro2",
        descriptionUse: "Reciprocidad De Ahorro2",
        conditionDataType: ValueDataType.PERCENTAGE,
        howToSetTheCondition: EValueHowToSetUp.RANGE,
        value: "",
      },
    ],
  },
};

export const Empty: Story = (args: IBusinessRulesNewController) => (
  <BusinessRulesNewController {...args} />
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
