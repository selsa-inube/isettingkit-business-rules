import { IRuleDecision } from "@isettingkit/input";
import { fallbackHandler } from "./utils/handlers/fallbackHandler";
import { handlers } from "./utils/handlers";
import { EValueHowToSetUp } from "../../../businessRules/enums/EValueHowToSetUp";

const strategyFactoryHandlerManager = (element: IRuleDecision) => {
  const valueData = element?.value;

  if (typeof valueData === "string" && valueData.includes(" a ")) {
    const patterns = [
      /De\s+([\d,.]+)\s+a\s+([\d,.]+)/,
      /Desde\s+([\d,.]+)\s+hasta\s+([\d,.]+)/,
      /Between\s+([\d,.]+)\s+and\s+([\d,.]+)/,
    ];

    for (const pattern of patterns) {
      const match = valueData.match(pattern);
      if (match) {
        const from = match[1];
        const to = match[2];
        console.log("🔍 Parseado string a objeto:", {
          from,
          to,
          original: valueData,
        });
        return { from, to };
      }
    }

    // Si no coincide con ningún patrón, retornar original
    return valueData;
  }

  if (
    typeof valueData === "object" &&
    valueData !== null &&
    !Array.isArray(valueData)
  ) {
    const handler =
      handlers[element?.howToSetTheDecision as EValueHowToSetUp] ||
      fallbackHandler;
    return handler(valueData);
  }

  return valueData || undefined;
};

export { strategyFactoryHandlerManager };
