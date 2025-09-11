import { BrowserRouter } from "react-router-dom";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { DragAndDropBoxesController } from "./DragAndDropBoxes.controller";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const meta: Meta<typeof DragAndDropBoxesController> = {
  component: DragAndDropBoxesController,
  decorators: [withRouter],
  title: "components/DragAndDropBoxes",
};
export default meta;

type Story = StoryObj<typeof DragAndDropBoxesController>;

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

const Default: Story = {
  args: {
    group: "clients",
    left: {
      highlightFirst: true,
      items: LEFT_DEFAULT,
      legend: "Clientes para los que NO aplica la línea",
      emptyMessage: "No has excluido ningún cliente para esta línea de crédito",
    },
    right: {
      items: RIGHT_DEFAULT,
      legend: "Clientes para los que NO aplica la línea",
      emptyMessage: "No has excluido ningún cliente para esta línea de crédito",
    },
    onMove: (p) => console.log("Controller onMove", p),
    targetInsertMode: "append",
  },
};

const CustomTitlesAndLists: Story = {
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

const DifferentGroupName: Story = {
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

export { Default, CustomTitlesAndLists, DifferentGroupName };
