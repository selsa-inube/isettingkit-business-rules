import { BrowserRouter } from "react-router-dom";
import type { Decorator, Meta } from "@storybook/react";
import { DropdownMenuController } from "./DropdownMenu.controller";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const meta: Meta<typeof DropdownMenuController> = {
  component: DropdownMenuController,
  decorators: [withRouter],
  title: "components/DropdownMenu",
};
export default meta;

const OPTIONS = {
  deductibleCustomerExpenses: {
    links: {
      maxTerm: { id: "maxTerm", label: "Plazo máximo", path: "/maxTerm" },
      paymentMethodType: {
        id: "paymentMethodType",
        label: "Tipo de medio de pago",
        path: "/paymentMethodType",
      },
      paymentCycles: {
        id: "paymentCycles",
        label: "Ciclos de pago que aplican para MH",
        path: "/paymentCycles",
      },
      percentageOvertime: {
        id: "percentageOvertime",
        label: "Porcentaje pagable por horas extras",
        path: "/percentageOvertime",
      },
      paymentMethodTypeExtras: {
        id: "paymentMethodTypeExtras",
        label: "Tipo de medio de pago para extras",
        path: "/paymentMethodTypeExtras",
      },
      amortizationMethod: {
        id: "amortizationMethod",
        label: "Método de amortización (ACC, CI)",
        path: "/amortizationMethod",
      },
      interestAdjustmentMethod: {
        id: "interestAdjustmentMethod",
        label: "Forma de pagar los intereses de ajuste de ciclo",
        path: "/interestAdjustmentMethod",
      },
      maxGracePeriod: {
        id: "maxGracePeriod",
        label: "Periodo de gracia máximo en días",
        path: "/maxGracePeriod",
      },
    },
  },
  nonDeductibleCustomerExpenses: {
    links: {
      maxTerm: { id: "maxTerm", label: "Plazo máximo", path: "/maxTerm" },
      paymentMethodType: {
        id: "paymentMethodType",
        label: "Tipo de medio de pago",
        path: "/paymentMethodType",
      },
      paymentCycles: {
        id: "paymentCycles",
        label: "Ciclos de pago que aplican para MH",
        path: "/paymentCycles",
      },
      percentageOvertime: {
        id: "percentageOvertime",
        label: "Porcentaje pagable por horas extras",
        path: "/percentageOvertime",
      },
      paymentMethodTypeExtras: {
        id: "paymentMethodTypeExtras",
        label: "Tipo de medio de pago para extras",
        path: "/paymentMethodTypeExtras",
      },
      amortizationMethod: {
        id: "amortizationMethod",
        label: "Método de amortización (ACC, CI)",
        path: "/amortizationMethod",
      },
    },
  },
} as const;

const toLinksArray = (
  obj: Record<string, { id: string; label: string; path: string }>,
) => Object.values(obj);

export const Contracted = () => (
  <DropdownMenuController
    defaultOpen={false}
    links={toLinksArray(OPTIONS.deductibleCustomerExpenses.links)}
    title="Gastos para el cliente descontables"
  />
);

export const Expanded = () => (
  <DropdownMenuController
    defaultOpen={true}
    links={toLinksArray(OPTIONS.deductibleCustomerExpenses.links)}
    title="Gastos para el cliente descontables"
  />
);

export const NonDeductible_CollapseOnNavigate = () => (
  <DropdownMenuController
    collapseOnNavigate
    defaultOpen={true}
    links={toLinksArray(OPTIONS.nonDeductibleCustomerExpenses.links)}
    title="Gastos para el cliente no descontables"
  />
);
