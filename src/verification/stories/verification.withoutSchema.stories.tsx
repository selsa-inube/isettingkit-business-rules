/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Verification as VerificationEngine } from "../../verification/engine";

type Args = {
  data: any;
  isMobile: boolean;
  isTablet: boolean;
  onBackStep?: (stepId: string) => void;
};

const meta: Meta<typeof VerificationEngine> = {
  title: "verification/VerificationEngine/BuildDefaultSchema",
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

const Template: StoryFn<Args> = (args) => <VerificationEngine {...args} />;

const baseArgs: Omit<Args, "data"> = {
  isMobile: false,
  isTablet: false,
  onBackStep: (stepId) => {
    console.log("onBackStep:", stepId);
  },
};

/** PRIMITIVES */
export const Primitive_String = Template.bind({});
Primitive_String.args = {
  ...baseArgs,
  data: "Hello world",
};

export const Primitive_Number = Template.bind({});
Primitive_Number.args = {
  ...baseArgs,
  data: 123456,
};

export const Primitive_Boolean = Template.bind({});
Primitive_Boolean.args = {
  ...baseArgs,
  data: true,
};

export const Primitive_Null = Template.bind({});
Primitive_Null.args = {
  ...baseArgs,
  data: null,
};

/** ARRAYS */

export const Array_Strings = Template.bind({});
Array_Strings.args = {
  ...baseArgs,
  data: ["Mi nómina", "Mi negocio", "Otros ingresos"],
};

export const Array_Numbers = Template.bind({});
Array_Numbers.args = {
  ...baseArgs,
  data: [10, 20, 30, 40],
};

export const Array_Objects = Template.bind({});
Array_Objects.args = {
  ...baseArgs,
  data: [
    { id: "1", label: "Aporte 1", value: 200000 },
    { id: "2", label: "Aporte 2", value: 150000 },
  ],
};

export const Array_Mixed = Template.bind({});
Array_Mixed.args = {
  ...baseArgs,
  data: ["Alto", 123, true, { a: 1 }, ["x", "y"]],
};

/** OBJECTS (flat + nested) */

export const Object_Flat = Template.bind({});
Object_Flat.args = {
  ...baseArgs,
  data: {
    additionalDebtors: ["Mi nómina", "Mi negocio", "Otros ingresos"],
    realGuarantees: false,
    RiskAnalysisBasedCreditLimit: true,
    score: 95,
    name: "Decisions General",
  },
};

export const Object_Nested = Template.bind({});
Object_Nested.args = {
  ...baseArgs,
  data: {
    profile: {
      name: "Cesar",
      age: 28,
      tags: ["dev", "react", "design-system"],
    },
    settings: {
      theme: { mode: "dark", contrast: "high" },
      flags: {
        featureA: true,
        featureB: false,
      },
    },
    metrics: [
      { kpi: "conversion", value: 0.35 },
      { kpi: "retention", value: 0.82 },
    ],
  },
};

/**
 * “REAL-LIKE” SHAPE:
 * - sections with { values: {...} }  -> attributesGrid
 * - sections with { values: [...] }  -> entriesGrid
 */
export const RealLike_Shape = Template.bind({});
RealLike_Shape.args = {
  ...baseArgs,
  data: {
    decisionsGeneral: {
      values: {
        additionalDebtors: ["Mi nómina", "Mi negocio", "Otros ingresos"],
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
    scoreModels: {
      values: [
        {
          businessRuleId: "br-003",
          decisionId: "Score Model 1",
          labelName: "Puntaje",
          value: ["Alto", "Medio", "Bajo"],
        },
      ],
    },
    incomePortfolio: {
      values: [],
    },
  },
};

/** EMPTY CASES */

export const Empty_Object = Template.bind({});
Empty_Object.args = {
  ...baseArgs,
  data: {},
};

export const Empty_Array = Template.bind({});
Empty_Array.args = {
  ...baseArgs,
  data: [],
};

/** RESPONSIVE quick checks */

export const Mobile_NestedObject = Template.bind({});
Mobile_NestedObject.args = {
  ...baseArgs,
  isMobile: true,
  data: {
    decisionsGeneral: {
      values: {
        additionalDebtors: ["Mi nómina", "Mi negocio", "Otros ingresos"],
        realGuarantees: false,
        RiskAnalysisBasedCreditLimit: true,
      },
    },
    scoreModels: {
      values: [
        {
          businessRuleId: "br-003",
          decisionId: "Score Model 1",
          labelName: "Puntaje",
          value: ["Alto", "Medio", "Bajo"],
        },
      ],
    },
  },
};

