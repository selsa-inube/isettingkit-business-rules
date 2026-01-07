import { useMemo } from "react";
import { Button, Stack } from "@inubekit/inubekit";
import { MdOutlineArrowBack } from "react-icons/md";
import { createRegistry } from "./registry/createRegistry";
import { renderNode } from "./registry/renderNode";
import { Accordion } from "../../accordions";
import { IRenderCtx } from "./types/IRenderCtx";
import { IVerificationEngine } from "./types/IVerificationEngine";
import { EComponentAppearance } from "../enum/appearances";
import { useVerificationSchema } from "../hooks/useVerificationSchema";

function Verification<TData>(props: IVerificationEngine<TData>) {
  const { data, isMobile, isTablet, onBackStep, schema } = props;

  const computedSchema = useVerificationSchema<TData>(data, schema);

  const ctx: IRenderCtx<TData> = { data, isMobile, isTablet };

  const registry = useMemo(() => createRegistry<TData>(renderNode), []);

  return (
    <Stack direction="column" width="100%" gap="24px">
      {computedSchema.steps.map((step) => (
        <Accordion title={step.name} key={`${step.id}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? "12px" : "16px"}
          >
            <Stack direction="column" width="100%" gap="8px">
              {step.nodes.map((node) => renderNode(node, ctx, registry))}
            </Stack>

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                step.onBack ? step.onBack({ stepId: step.id }) : onBackStep?.(step.id)
              }
              appearance={EComponentAppearance.DARK}
              variant="none"
            >
              Regresar a este paso
            </Button>
          </Stack>
        </Accordion>
      ))}
    </Stack>
  );
}

export { Verification };
