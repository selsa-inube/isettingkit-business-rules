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
    name: "TasaEfectivaAnual",
    dataType: ValueDataType.PERCENTAGE,
    value: 18,
    valueUse: ValueHowToSetUp.EQUAL,
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-09-15"),
    conditions: [
      {
        name: "PlazoMeses",
        dataType: ValueDataType.NUMBER,
        value: {
          from: 1,
          to: 12,
        },
        valueUse: ValueHowToSetUp.RANGE,
      },
      {
        name: "ScoringRiesgo",
        dataType: ValueDataType.NUMBER,
        value: {
          from: 100,
          to: 700,
        },
        valueUse: ValueHowToSetUp.RANGE,
      },
      {
        name: "CategoriaCliente",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Independiente", "Pensionado"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "Riesgo",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Medio"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "CarteraDescubierto",
        dataType: ValueDataType.CURRENCY,
        value: {
          from: 1000000,
          to: 15000000,
        },
        valueUse: ValueHowToSetUp.RANGE,
      },
      {
        name: "FechaTasa",
        dataType: ValueDataType.DATE,
        value: "2024-08-15",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Porcentaje",
        dataType: ValueDataType.PERCENTAGE,
        value: 10,
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Monto",
        dataType: ValueDataType.CURRENCY,
        value: 1000000,
        valueUse: ValueHowToSetUp.EQUAL,
      },
    ],
  };
  return decision;
};

const Template: StoryFn<typeof BusinessRuleView> = (args) => (
  <BusinessRuleView {...args} />
);

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
    factsThatConditionIt: "Hechos que condicionan",
    criteria: "Criterios",
    terms: "Términos",
  },
};

export default meta;
