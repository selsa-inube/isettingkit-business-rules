import { Meta, StoryFn } from "@storybook/react";
import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";
import { BusinessRuleView } from "..";
import { IRuleDecision } from "../types";

const meta: Meta<typeof BusinessRuleView> = {
  title: "components/view/BusinessRuleView",
  component: BusinessRuleView,
};

const getData = (): IRuleDecision => {
  const decision: IRuleDecision = {
    decision: {
      name: "TasaEfectivaAnual",
      description: "Tasa de interés efectiva anual",
      dataType: ValueDataType.PERCENTAGE,
      value: 18,
      valueUse: ValueHowToSetUp.EQUAL,
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-09-15"),
    },
    conditions: [
      {
        name: "PlazoMeses",
        description: "Plazo en meses",
        dataType: ValueDataType.NUMBER,
        value: {
          from: 1,
          to: 12,
        },
        valueUse: ValueHowToSetUp.RANGE,
      },
      {
        name: "ScoringRiesgo",
        description: "Scoring de riesgo",
        dataType: ValueDataType.NUMBER,
        value: {
          from: 100,
          to: 700,
        },
        valueUse: ValueHowToSetUp.RANGE,
      },
      {
        name: "CategoriaCliente",
        description: "Categoria del cliente",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Independiente", "Pensionado"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "Riesgo",
        description: "Riesgo",
        dataType: ValueDataType.ALPHABETICAL,
        value: ["Medio"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "CarteraDescubierto",
        description: "Cartera de descubierto",
        dataType: ValueDataType.CURRENCY,
        value: {
          from: 1000000,
          to: 15000000,
        },
        valueUse: ValueHowToSetUp.RANGE,
      },
      {
        name: "FechaTasa",
        description: "Fecha Tasa",
        dataType: ValueDataType.DATE,
        value: "2024-08-15",
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Porcentaje",
        description: "Porcentaje",
        dataType: ValueDataType.PERCENTAGE,
        value: 10,
        valueUse: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Monto",
        description: "Monto",
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

// const getListMulti = (): IRuleDecision => {
//   const decision: IRuleDecision = {
//     decision: {
//       name: "TasaEfectivaAnual",
//       description: "Tasa de interés efectiva anual",
//       dataType: ValueDataType.ALPHABETICAL,
//       howToSetTheDecision: ValuehowToSetTheDecision.LIST_OF_VALUES_MULTI,
//       value: {
//         list: ["10%", "15%", "20%", "25%"],
//         listSelected: ["20%", "25%"],
//       },
//       startDate: new Date("2024-08-15"),
//     },
//     conditions: [
//       {
//         name: "ScoringRiesgo",
//         description: "Scoring de riesgo",
//         dataType: ValueDataType.NUMBER,
//         value: {
//           from: 100,
//           to: 700,
//         },
//         howToSetTheDecision: ValuehowToSetTheDecision.RANGE,
//       },
//       {
//         name: "CategoriaCliente",
//         description: "Categoria del cliente",
//         dataType: ValueDataType.ALPHABETICAL,
//         value: {
//           list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
//           listSelected: ["Independiente", "Pensionado"],
//         },
//         howToSetTheDecision: ValuehowToSetTheDecision.LIST_OF_VALUES_MULTI,
//       },
//     ],
//   };
//   return decision;
// };

// export const ListMutiple = Template.bind({});
// ListMutiple.args = {
//   decision: getListMulti(),
//   textValues: {
//     selectOptions: "Seleccione las opciónes",
//     selectOption: "Seleccione una opción",
//     rangeMin: (label: string) => `${label} Minima`,
//     rangeMax: (label: string) => `${label} Maxima`,
//     reasonForChange: "Motivo del cambio",
//     change: "Cambio",
//     changePlaceholder: "Describa brevemente el motivo del cambio",
//     termStart: "Fecha de inicio",
//     termEnd: "Fecha de fin",
//     cancel: "Cancelar",
//     confirm: "Confirmar",
//     none: "Ninguno",
//     factsThatConditionIt: "Hechos que condicionan",
//     criteria: "Criterios",
//     terms: "Términos",
//   },
// };

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
