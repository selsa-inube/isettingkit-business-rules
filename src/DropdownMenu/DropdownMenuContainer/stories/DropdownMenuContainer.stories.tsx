import { BrowserRouter } from "react-router-dom";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { DropdownMenuContainer } from "..";
import { IDropdownMenuGroup } from "../../../DropdownMenu/types/IDropdownMenuGroup";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const meta: Meta<typeof DropdownMenuContainer> = {
  component: DropdownMenuContainer,
  decorators: [withRouter],
  title: "components/DropdownMenuContainer",
};
export default meta;

type Story = StoryObj<typeof DropdownMenuContainer>;

const OPTIONS = {
  lineNamesAndDescriptions: {},
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
      paymentCyclesOrdinary: {
        id: "paymentCyclesOrdinary",
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

const GROUPS = [
  {
    id: "lineNamesAndDescriptions",
    title: "lineNamesAndDescriptions",
    links: toLinksArray(OPTIONS.lineNamesAndDescriptions),
  },
  {
    id: "deductible",
    title: "Gastos para el cliente descontables",
    links: toLinksArray(OPTIONS.deductibleCustomerExpenses.links),
  },
  {
    id: "nonDeductible",
    title: "Gastos para el cliente no descontables",
    links: toLinksArray(OPTIONS.nonDeductibleCustomerExpenses.links),
  },
] as const;

export const AllContracted: Story = {
  args: {
    groups: GROUPS as unknown as IDropdownMenuGroup[],
    defaultOpenId: null,
  },
};

export const DeductibleOpen: Story = {
  args: {
    groups: GROUPS as unknown as IDropdownMenuGroup[],
    defaultOpenId: "deductible",
  },
};

export const CollapseOnNavigate: Story = {
  args: {
    groups: GROUPS as unknown as IDropdownMenuGroup[],
    defaultOpenId: "deductible",
    collapseOnNavigate: true,
  },
};
