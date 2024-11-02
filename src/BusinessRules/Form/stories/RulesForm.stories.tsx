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
    name: "TasaEfectivaAnual",
    dataType: ValueDataType.ALPHABETICAL,
    possibleValue: {
      list: ["10%", "15%", "20%", "25%"],
    },
    value: ["20%"],
    valueUse: ValueHowToSetUp.LIST_OF_VALUES,
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
        possibleValue: {
          list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
        },
        value: ["Independiente", "Pensionado"],
        valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "Riesgo",
        dataType: ValueDataType.ALPHABETICAL,
        possibleValue: {
          list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
        },
        value: "Medio",
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

// const getNotCondition = (): IRuleDecision => {
//   const decision: IRuleDecision = {
//     decision: {
//       name: "TasaEfectivaAnual",
//       description: "Tasa de interés efectiva anual",
//       dataType: ValueDataType.NUMBER,
//       valueUse: ValueHowToSetUp.LIST_OF_VALUES,
//       possibleValue: {
//         value: 10,
//       },
//       startDate: new Date("2024-08-15"),
//       endDate: new Date("2024-09-15"),
//     },
//     conditions: [],
//   };
//   return decision;
// };

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
    factsThatConditionIt: "Hechos que condicionan",
    criteria: "Criterios",
    terms: "Vigencia",
  },
};

// export const NotConditions = Template.bind({});
// NotConditions.args = {
//   decision: getNotCondition(),
//   id: "NotConditions",
//   onCancel: () => console.log("Cancel"),
//   onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
//     terms: "Vigencia",
//   },
// };

// const getListMulti = (): IRuleDecision => {
//   const decision: IRuleDecision = {
//     decision: {
//       name: "TasaEfectivaAnual",
//       description: "Tasa de interés efectiva anual",
//       dataType: ValueDataType.ALPHABETICAL,
//       valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
//       possibleValue: {
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
//         possibleValue: {
//           from: 100,
//           to: 700,
//         },
//         valueUse: ValueHowToSetUp.RANGE,
//       },
//       {
//         name: "CategoriaCliente",
//         description: "Categoria del cliente",
//         dataType: ValueDataType.ALPHABETICAL,
//         possibleValue: {
//           list: ["Funcionario", "Independiente", "Pensionado", "Empleado"],
//           listSelected: ["Independiente", "Pensionado"],
//         },
//         valueUse: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
//       },
//     ],
//   };
//   return decision;
// };

// export const ListMutiple = Template.bind({});
// ListMutiple.args = {
//   decision: getListMulti(),
//   id: "ListMutiple",
//   onCancel: () => console.log("Cancel"),
//   onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
//     terms: "Vigencia",
//   },
// };

// const getRange = (): IRuleDecision => {
//   const decision: IRuleDecision = {
//     decision: {
//       name: "TasaEfectivaAnual",
//       description: "Tasa de interés efectiva anual",
//       dataType: ValueDataType.NUMBER,
//       valueUse: ValueHowToSetUp.RANGE,
//       possibleValue: {
//         from: 10,
//         to: 25,
//       },
//       startDate: new Date("2024-08-15"),
//       endDate: new Date("2024-09-15"),
//     },
//     conditions: [
//       {
//         name: "Riesgo",
//         description: "Riesgo",
//         dataType: ValueDataType.ALPHABETICAL,
//         possibleValue: {
//           list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
//           listSelected: ["Medio"],
//         },
//         valueUse: ValueHowToSetUp.LIST_OF_VALUES,
//       },
//       {
//         name: "CarteraDescubierto",
//         description: "Cartera de descubierto",
//         dataType: ValueDataType.CURRENCY,
//         possibleValue: {
//           from: 1000000,
//           to: 15000000,
//         },
//         valueUse: ValueHowToSetUp.RANGE,
//       },
//     ],
//   };
//   return decision;
// };

// export const Range = Template.bind({});
// Range.args = {
//   decision: getRange(),
//   id: "portal",
//   onCancel: () => console.log("Cancel"),
//   onSubmitEvent: (data: IRuleDecision) => console.log("Submit", data),
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
//     terms: "Vigencia",
//   },
// };

export default meta;
