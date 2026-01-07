import React from "react";
import { Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "../../verification/enum/appearances";
import { IContainerAttribute } from "../../verification/engine/types/IContainerAttribute";

function safeStringify(value: unknown) {
  const seen = new WeakSet<object>();

  return JSON.stringify(
    value,
    (_key, val) => {
      if (typeof val === "object" && val !== null) {
        if (seen.has(val)) return "[Circular]";
        seen.add(val);
      }
      return val;
    },
    2,
  );
}

function isReactNode(value: unknown): value is React.ReactNode {
  return React.isValidElement(value);
}

const ContainerAttribute = (props: IContainerAttribute) => {
  const { withTag, children, isMobile, direction, value } = props;

  const hasMobile = isMobile ? "small" : "medium";
  const hasDirection = direction === "column" ? "start" : "end";

  if (withTag) return <>{children}</>;

  let rendered: React.ReactNode;

  if (isReactNode(value)) {
    rendered = value;
  } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    rendered = String(value);
  } else if (value === null || value === undefined) {
    rendered = "";
  } else {
    try {
      rendered = safeStringify(value);
    } catch {
      rendered = String(value);
    }
  }

  return (
    <Text
      size={hasMobile}
      appearance={EComponentAppearance.GRAY}
      textAlign={hasDirection}
      as="span"
    >
      {rendered}
    </Text>
  );
};

export { ContainerAttribute };
