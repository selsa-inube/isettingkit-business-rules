/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAnyRecord } from "../../../verification/engine/types/TAnyRecord";
import { IVerificationSchema } from "../../../verification/engine/types/IVerificationSchema";
import { isRecord } from "../../../verification/engine/utils/isRecord";
import { safeString } from "../../../verification/engine/utils/safeString";
import { buildAttributesItemsFromObject } from "../../../verification/engine/utils/buildAttributesItemsFromObject";
import { toTitleSchema } from "../../../verification/engine/utils/toTitleSchema";

function buildDefaultSchema<TData>(data: TData): IVerificationSchema<TData> {
  if (!isRecord(data) && !Array.isArray(data)) {
    return {
      steps: [
        {
          id: "1",
          name: "Verificación",
          nodes: [
            {
              id: "primitive",
              type: "attributesGrid",
              layout: {
                columns: { mobile: "1fr", desktop: "1fr" },
                variant: "none",
              },
              items: [
                {
                  id: "value",
                  label: "Valor",
                  value: () => data,
                  render: (v: unknown) => safeString(v),
                },
              ],
            },
            {
              id: "json-fallback",
              type: "json",
              value: () => data,
            },
          ],
        },
      ],
    };
  }

  if (Array.isArray(data)) {
    return {
      steps: [
        {
          id: "1",
          name: "Verificación",
          nodes: [
            {
              id: "root-array",
              type: "entriesGrid",
              layout: { variant: "lightCard" },
              entries: () => data,
              keyOf: (_e: any, index?: number) => String(index ?? Math.random()),
              labelOf: (_e: any, index?: number) => `Item ${index ?? ""}`,
              valueOf: (e: any) => safeString(e),
            } as any,
            {
              id: "json-fallback",
              type: "json",
              value: () => data,
            },
          ],
        },
      ],
    };
  }

  const root = data as TAnyRecord;
  const rootKeys = Object.keys(root);

  const steps = rootKeys.map((sectionKey, index) => {
    const stepId = String(index + 1);
    const section = root[sectionKey];

    if (!isRecord(section) && !Array.isArray(section)) {
      return {
        id: stepId,
        name: toTitleSchema(sectionKey),
        nodes: [
          {
            id: `${sectionKey}-primitive`,
            type: "attributesGrid",
            layout: {
              columns: { mobile: "1fr", desktop: "repeat(2, 1fr)" },
              variant: "none",
            },
            items: [
              {
                id: `${sectionKey}.value`,
                label: toTitleSchema(sectionKey),
                value: (d: any) => d?.[sectionKey],
                render: (v: unknown) => safeString(v),
              },
            ],
          },
        ],
      };
    }

    if (Array.isArray(section)) {
      return {
        id: stepId,
        name: toTitleSchema(sectionKey),
        nodes: [
          {
            id: `${sectionKey}-entries`,
            type: "entriesGrid",
            layout: { variant: "lightCard" },
            when: (d: any) => Array.isArray(d?.[sectionKey]) && d[sectionKey].length > 0,
            entries: (d: any) => d?.[sectionKey],
            keyOf: (e: any, i?: number) =>
              e?.id ?? e?.businessRuleId ?? String(i ?? Math.random()),
            labelOf: (e: any, i?: number) => e?.decisionId ?? e?.label ?? `Item ${i ?? ""}`,
            valueOf: (e: any) => safeString(e?.value ?? e),
          } as any,
        ],
      };
    }

    if (isRecord(section) && "values" in section) {
      const values = section.values;

      if (Array.isArray(values)) {
        return {
          id: stepId,
          name: toTitleSchema(sectionKey),
          nodes: [
            {
              id: `${sectionKey}-values`,
              type: "entriesGrid",
              layout: { variant: "lightCard" },
              when: (d: any) =>
                Array.isArray(d?.[sectionKey]?.values) && d[sectionKey].values.length > 0,
              entries: `${sectionKey}.values`,
              keyOf: (e: any, i?: number) =>
                e?.businessRuleId ?? e?.id ?? String(i ?? Math.random()),
              labelOf: (e: any) => e?.decisionId ?? e?.labelName ?? "",
              valueOf: (e: any) => {
                if ("labelName" in (e ?? {}) && "value" in (e ?? {})) {
                  return `${String(e.labelName)}: ${safeString(e.value)}`;
                }
                return safeString(e);
              },
            } as any,
          ],
        };
      }

      if (isRecord(values)) {
        return {
          id: stepId,
          name: toTitleSchema(sectionKey),
          nodes: [
            {
              id: `${sectionKey}-values`,
              type: "attributesGrid",
              layout: {
                columns: { mobile: "1fr", desktop: "repeat(2, 1fr)" },
                variant: "none",
              },
              when: (d: any) => Boolean(d?.[sectionKey]?.values),
              items: buildAttributesItemsFromObject(`${sectionKey}.values`, values),
            },
          ],
        };
      }

      return {
        id: stepId,
        name: toTitleSchema(sectionKey),
        nodes: [
          {
            id: `${sectionKey}-values`,
            type: "attributesGrid",
            layout: {
              columns: { mobile: "1fr", desktop: "repeat(2, 1fr)" },
              variant: "none",
            },
            when: (d: any) => d?.[sectionKey]?.values !== undefined,
            items: [
              {
                id: `${sectionKey}.values`,
                label: "values",
                value: `${sectionKey}.values`,
                render: (v: unknown) => safeString(v),
              },
            ],
          },
        ],
      };
    }

    return {
      id: stepId,
      name: toTitleSchema(sectionKey),
      nodes: [
        {
          id: `${sectionKey}-object`,
          type: "attributesGrid",
          layout: {
            columns: { mobile: "1fr", desktop: "repeat(2, 1fr)" },
            variant: "none",
          },
          when: (d: any) => Boolean(d?.[sectionKey]),
          items: buildAttributesItemsFromObject(sectionKey, section),
        },
      ],
    };
  });

  steps.push({
    id: String(steps.length + 1),
    name: "JSON (fallback)",
    nodes: [
      {
        id: "json-fallback",
        type: "json",
        value: () => data,
      },
    ],
  });

  return { steps } as IVerificationSchema<TData>;
}

export { buildDefaultSchema };
