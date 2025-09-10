import { BrowserRouter } from "react-router-dom";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { DragAndDropBoxes } from "..";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const meta: Meta<typeof DragAndDropBoxes> = {
  component: DragAndDropBoxes,
  decorators: [withRouter],
  title: "components/DragAndDropBoxes",
};
export default meta;

type Story = StoryObj<typeof DragAndDropBoxes>;

const LEFT_DEFAULT = [
  "Personas que NO están en nómina de convenio",
  "Personas jurídicas",
  "Clientes personales naturales",
];

const RIGHT_DEFAULT = [
  "Clientes NO asociados",
  "Personas sancionadas",
  "Personas con alerta de riesgo",
  "Personas sin enrolamiento seguro",
];

export const Default: Story = {
  args: {
    group: "clients",
    left: {
      highlightFirst: true,
      items: LEFT_DEFAULT,
      legend: "Clientes para los que NO aplica la línea",
    },
    right: {
      items: RIGHT_DEFAULT,
      legend: "Clientes para los que NO aplica la línea",
    },
  },
};

export const CustomTitlesAndLists: Story = {
  args: {
    group: "clients",
    left: {
      highlightFirst: true,
      legend: "Segmento A — No aplican",
      items: [
        "Sin convenio activo",
        "Personas jurídicas",
        "Clientes con deuda vencida",
      ],
    },
    right: {
      legend: "Segmento B — No aplican",
      items: [
        "Clientes no asociados",
        "Clientes en lista restrictiva",
        "Alerta de riesgo",
        "Sin enrolamiento seguro",
      ],
    },
  },
};

export const DifferentGroupName: Story = {
  args: {
    group: "eligibility",
    left: {
      legend: "Izquierda",
      items: ["A", "B", "C"],
    },
    right: {
      legend: "Derecha",
      items: ["D", "E", "F"],
    },
  },
};
