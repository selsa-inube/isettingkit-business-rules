import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { BusinessRuleCard, IBusinessRuleCard } from "..";
import { BusinessRuleView } from "../../../BusinessRuleView";
import { ValueDataType, ValueHowToSetUp } from "@isettingkit/input";

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

const getData = () => {
  const decision = {
    decisions: [
      {
        name: "TasaEfectivaMinima",
        label: "Tasa efectiva minima",
        description: "Tasa efectiva minima",
        typeData: ValueDataType.PERCENTAGE,
        value: 4,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
      {
        name: "TasaEfectivaMaxima",
        label: "Tasa efectiva maxima",
        description: "Tasa efectiva maxima",
        typeData: ValueDataType.PERCENTAGE,
        value: 8,
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES,
      },
    ],
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-09-15"),
    conditions: [
      {
        name: "AntiguedadCliente",
        label: "Antigüedad del cliente (Días)",
        description: "Antigüedad del cliente (Días)",
        typeData: ValueDataType.NUMBER,
        value: 720,
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "CategoriaCliente",
        description: "Categoría del cliente",
        label: "Categoría del cliente",
        typeData: ValueDataType.ALPHABETICAL,
        value: {
          list: [
            "Ocasionales",
            "Frecuentes",
            "Leales",
            "Premium",
            "Platinum",
            "Plata",
            "Potenciales",
            "Inactivos",
          ],
        },
        howToSetUp: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
      },
      {
        name: "NivelMembresia",
        label: "Nivel de membresía",
        description: "Nivel de membresía",
        typeData: ValueDataType.ALPHABETICAL,
        value: "Alto",
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "ReciprocidadAhorro",
        label: "Reciprocidad de ahorro",
        description: "Reciprocidad de ahorro",
        typeData: ValueDataType.CURRENCY,
        value: 19,
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "DestinoDinero",
        label: "Destino del dinero",
        description: "Destino del dinero",
        typeData: ValueDataType.ALPHABETICAL,
        value: "Crédito Vehículo",
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "Temporada",
        label: "Temporada",
        description: "Temporada",
        typeData: ValueDataType.ALPHABETICAL,
        value: "Normal",
        howToSetUp: ValueHowToSetUp.EQUAL,
      },
      {
        name: "ScoreRiesgo",
        label: "Score de riesgo",
        description: "Score de riesgo",
        typeData: ValueDataType.NUMBER,
        value: 0.2,
        howToSetUp: ValueHowToSetUp.EQUAL,
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
        FactsThatConditionIt: "Hechos que condicionan",
        criteria: "Criterios",
        Terms: "Vigencia",
      }}
    />
  ),
  handleDelete: () => {},
  handleView: () => {},
  id: "2",
};

export default meta;
