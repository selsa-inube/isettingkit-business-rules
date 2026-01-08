/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Verification as VerificationEngine } from "../../verification/engine";
import type { IVerificationEngine } from "../../verification/engine/types/IVerificationEngine";

const dataMock: any = {
  company: {
    isValid: false,
    values: {
      companySelected: "prueba",
      companyName: "",
      companyTypeIdent: "",
      companyNumberIdent: "",
      companyNameCommercial: "",
      companyComplement: "",
      companyCity: "",
      companyAddressRes: "",
      companyCountry: "",
      companyCountryIdent: "",
    },
  },
  generalInformation: {
    isValid: false,
    values: {
      code: "2",
      abbreviatedName: "3",
      typePayroll: "BonusesOrSeverancePay",
      sourcesOfIncome: "Leases",
      applicationDaysPayroll: "2",
    },
  },
  ordinaryCycles: {
    isValid: false,
    values: [],
  },
  extraordinaryCycles: {
    isValid: false,
    values: [
      {
        id: "cycle-01-2-Enero-1",
        nameCycle: "2",
        typePayment: "Cesantías",
        payday: "Enero-1",
        numberDaysUntilCut: "1",
        laborRegulatorFramework: "SubstantiveLaborCodeOfColombia",
      },
    ],
  },
} as const;

type IData = typeof dataMock;

type StoryProps = IVerificationEngine<IData>;

const meta: Meta<typeof VerificationEngine> = {
  title: "verification/CyclesFallback",
  component: VerificationEngine,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

// Default story → triggers automatic buildDefaultSchema()
export const Default: StoryFn<StoryProps> = (args) => (
  <VerificationEngine {...args} />
);

Default.args = {
  data: dataMock,
  isMobile: false,
  isTablet: false,
  onBackStep: (stepId) => console.log("Back:", stepId),
};

// Mobile view
export const Mobile: StoryFn<StoryProps> = (args) => (
  <VerificationEngine {...args} />
);

Mobile.args = {
  ...Default.args,
  isMobile: true,
};

// Tablet view
export const Tablet: StoryFn<StoryProps> = (args) => (
  <VerificationEngine {...args} />
);

Tablet.args = {
  ...Default.args,
  isTablet: true,
};

// Empty / edge case
export const EmptyCycles: StoryFn<StoryProps> = (args) => (
  <VerificationEngine {...args} />
);

EmptyCycles.args = {
  ...Default.args,
  data: {
    ...dataMock,
    extraordinaryCycles: { ...dataMock.extraordinaryCycles, values: [] },
    ordinaryCycles: { ...dataMock.ordinaryCycles, values: [] },
  },
};
