/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Verification as VerificationEngine } from "../../verification/engine";
import type { IVerificationEngine } from "../../verification/engine/types/IVerificationEngine";
import type { IVerificationSchema } from "../../verification/engine/types/IVerificationSchema";

type Entry = {
  businessRuleId: string;
  decisionId?: string;
  labelName: string;
  value: unknown;
  [key: string]: any;
};

type UpdatedData = {
  decisionsGeneral: {
    values: {
      additionalDebtors: Array<string>;
      PaymentCapacityBasedCreditLimit: boolean;
      realGuarantees: boolean;
      ReciprocityBasedCreditLimit: boolean;
      RiskAnalysisBasedCreditLimit: boolean;
    };
  };
  contributionsPortfolio: { values: Entry[] };
  incomePortfolio: { values: any };
  minimumIncomePercentage: { values: Entry[] };
  scoreModels: { values: Entry[] };
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
              id: "methods",
              label: "Métodos (raw json)",
              value: (d) => d.decisionsGeneral.values,
              withTag: true,
              render: (v) => (
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(v, null, 2)}
                </pre>
              ),
            },
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
          ],
        },
        {
          id: "contributions",
          type: "entriesGrid",
          layout: { variant: "lightCard", gapToken: "s200" },
          when: (d) => d.contributionsPortfolio.values.length > 0,
          entries: "contributionsPortfolio.values",
          keyOf: (e: Entry) => e.businessRuleId,
          labelOf: (e: Entry) => e.decisionId ?? "",
          valueOf: (e: Entry) => `${e.labelName}: ${String(e.value)}`,
        },
        {
          id: "scoreModels",
          type: "entriesGrid",
          layout: { variant: "lightCard", gapToken: "s200" },
          when: (d) => d.scoreModels.values.length > 0,
          entries: "scoreModels.values",
          keyOf: (e: Entry) => e.businessRuleId,
          labelOf: (e: Entry) => e.decisionId ?? "",
          valueOf: (e: Entry) => `${e.labelName}: ${String(e.value)}`,
        },
        {
          id: "json-fallback",
          type: "json",
          value: (d) => d,
        },
      ],
      onBack: ({ stepId }) => {
        console.log("Back from step:", stepId);
      },
    },
    {
      id: "2",
      name: "Paso vacío (para probar when)",
      nodes: [
        {
          id: "income",
          type: "entriesGrid",
          layout: { variant: "lightCard", gapToken: "s200" },
          when: (d) => d.incomePortfolio.values.length > 0,
          entries: "incomePortfolio.values",
          keyOf: (e: Entry) => e.businessRuleId,
          labelOf: (e: Entry) => e.decisionId ?? "",
          valueOf: (e: Entry) => `${e.labelName}: ${String(e.value)}`,
        },
      ],
    },
  ],
};

const dataMock: UpdatedData = {
  decisionsGeneral: {
    values: {
      additionalDebtors: ['Mi nómina', 'Mi negocio', 'Otros ingresos'],
      PaymentCapacityBasedCreditLimit: true,
      realGuarantees: false,
      ReciprocityBasedCreditLimit: false,
      RiskAnalysisBasedCreditLimit: true,
    },
  },
  contributionsPortfolio: {
    values: [
      {
        businessRuleId: "br-001",
        decisionId: "Aporte 1",
        labelName: "Valor",
        value: 200000,
      },
      {
        businessRuleId: "br-002",
        decisionId: "Aporte 2",
        labelName: "Valor",
        value: 150000,
      },
    ],
  },
  incomePortfolio:  {
    values: {
      additionalDebtors: ['Mi nómina', 'Mi negocio', 'Otros ingresos'],
      PaymentCapacityBasedCreditLimit: true,
      realGuarantees: false,
      ReciprocityBasedCreditLimit: false,
      RiskAnalysisBasedCreditLimit: true,
    },
  },
  minimumIncomePercentage: { values: [] },
  scoreModels: {
    values: [
      {
        businessRuleId: "br-003",
        decisionId: "Score Model 1",
        labelName: "Puntaje",
        value: ['Alto', 'Medio', 'Bajo'],
      },
    ],
  },
};

const meta: Meta<typeof VerificationEngine> = {
  title: "verification/VerificationEngine",
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

export const EmptyEntries: StoryFn<IVerificationEngineStory> = (args) => (
  <VerificationEngine {...args} />
);

EmptyEntries.args = {
  ...Default.args,
  data: {
    ...dataMock,
    contributionsPortfolio: { values: [] },
    scoreModels: { values: [] },
  },
};
