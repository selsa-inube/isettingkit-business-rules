import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { BusinessRuleCard, IBusinessRuleCard } from "..";
import { BusinessRuleView } from "../../../BusinessRuleView";

import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

const meta: Meta<typeof BusinessRuleCard> = {
  title: "components/cards/BusinessRuleCard",
  component: BusinessRuleCard,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof BusinessRuleCard>;

export const Default: Story = (args: IBusinessRuleCard) => (
  <BusinessRuleCard {...args} />
);
Default.args = {
  children: (
    <div>
      <p>Decision</p>
    </div>
  ),
  handleDelete: () => {},
  handleView: () => {},
  id: "1",
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

export const Container: Story = (args: IBusinessRuleCard) => (
  <BusinessRuleCard {...args} />
);
Container.args = {
  children: (
    <BusinessRuleView
      decision={getData()}
      textValues={{
        selectOptions: "Seleccione las opciones",
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
      }}
    />
  ),
  handleDelete: () => {},
  handleView: () => {},
  id: "2",
};

export default meta;
