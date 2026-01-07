import type { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Verification as VerificationEngine } from "../../verification/engine";
import type { IVerificationEngine } from "../../verification/engine/types/IVerificationEngine";
import type { IVerificationSchema } from "../../verification/engine/types/IVerificationSchema";

type UpdatedData = {
  decisionsGeneral: {
    values: {
      additionalDebtors: string;
      realGuarantees: string;
      coDebtors: string;
      insuranceRequired: string;
      guaranteesRequired: string;
      avalRequired: string;
      refinancingAllowed: string;
      gracePeriodAllowed: string;
      earlyPaymentAllowed: string;
      automaticRenewal: string;
    };
  };
};

type IVerificationEngineStory = IVerificationEngine<UpdatedData> & {
  schema: IVerificationSchema<UpdatedData>;
};

const schemaMock: IVerificationSchema<UpdatedData> = {
  steps: [
    {
      id: "1",
      name: "Información general",
      nodes: [
        {
          id: "decisions-general",
          type: "attributesGrid",
          layout: {
            columns: { mobile: "1fr", desktop: "repeat(2, 1fr)" },
            gapToken: "s200",
            variant: "none",
          },
          when: (d) => Boolean(d.decisionsGeneral?.values),
          items: [
            {
              id: "additionalDebtors",
              label: "Deudores adicionales",
              value: "decisionsGeneral.values.additionalDebtors",
              render: (v) => String(v ?? ""),
            },
            {
              id: "realGuarantees",
              label: "Garantías reales",
              value: "decisionsGeneral.values.realGuarantees",
              render: (v) => String(v ?? ""),
            },
            {
              id: "coDebtors",
              label: "Codeudores",
              value: "decisionsGeneral.values.coDebtors",
              render: (v) => String(v ?? ""),
            },
            {
              id: "insuranceRequired",
              label: "Seguro requerido",
              value: "decisionsGeneral.values.insuranceRequired",
              render: (v) => String(v ?? ""),
            },
            {
              id: "guaranteesRequired",
              label: "Garantías obligatorias",
              value: "decisionsGeneral.values.guaranteesRequired",
              render: (v) => String(v ?? ""),
            },
            {
              id: "avalRequired",
              label: "Aval requerido",
              value: "decisionsGeneral.values.avalRequired",
              render: (v) => String(v ?? ""),
            },
            {
              id: "refinancingAllowed",
              label: "Refinanciación permitida",
              value: "decisionsGeneral.values.refinancingAllowed",
              render: (v) => String(v ?? ""),
            },
            {
              id: "gracePeriodAllowed",
              label: "Periodo de gracia permitido",
              value: "decisionsGeneral.values.gracePeriodAllowed",
              render: (v) => String(v ?? ""),
            },
            {
              id: "earlyPaymentAllowed",
              label: "Pago anticipado permitido",
              value: "decisionsGeneral.values.earlyPaymentAllowed",
              render: (v) => String(v ?? ""),
            },
            {
              id: "automaticRenewal",
              label: "Renovación automática",
              value: "decisionsGeneral.values.automaticRenewal",
              render: (v) => String(v ?? ""),
            },
          ],
        },
      ],
      onBack: ({ stepId }) => {
        console.log("Back from step:", stepId);
      },
    },
  ],
};

const dataMock: UpdatedData = {
  decisionsGeneral: {
    values: {
      additionalDebtors: "Mi nómina",
      realGuarantees: "Propiedad raíz",
      coDebtors: "NO",
      insuranceRequired: "Mi nómina",
      guaranteesRequired: "Salario mensual, Arrendamientos",
      avalRequired: "Si",
      refinancingAllowed: "Si",
      gracePeriodAllowed: "Mensual",
      earlyPaymentAllowed: "Bisemanal",
      automaticRenewal: "No",
    },
  },
};

const meta: Meta<typeof VerificationEngine> = {
  title: "verification/VerificationEngine/SimpleAttributesGrid",
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

export const Default: StoryFn<IVerificationEngineStory> = (args) => (
  <VerificationEngine {...args} />
);

Default.args = {
  data: dataMock,
  isMobile: false,
  isTablet: false,
  schema: schemaMock,
  onBackStep: (stepId) => {
    console.log("onBackStep:", stepId);
  },
};

export const Mobile: StoryFn<IVerificationEngineStory> = (args) => (
  <VerificationEngine {...args} />
);

Mobile.args = {
  ...Default.args,
  isMobile: true,
};

export const Tablet: StoryFn<IVerificationEngineStory> = (args) => (
  <VerificationEngine {...args} />
);

Tablet.args = {
  ...Default.args,
  isTablet: true,
};
