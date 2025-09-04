import { MdOutlineDelete } from "react-icons/md";
import { Stack, Box, Button } from "@inubekit/inubekit";
import { IBusinessRuleCard } from "../../../businessRules/types/Cards/BusinessRuleCard/IBusinessRuleCard";

const BusinessRuleCardNew = (props: IBusinessRuleCard) => {
  const { children, controls = true, handleDelete, id } = props;
  return (
    <Box width="100%">
      {children}
      {controls && (
        <>
          <Stack gap="16px" justifyContent="end" margin="16px 0 0 0">
            <Button
              cursorHover
              appearance="danger"
              spacing="compact"
              variant="outlined"
              iconBefore={<MdOutlineDelete />}
              onClick={() => {
                handleDelete(id);
              }}
            >
              Eliminar
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export { BusinessRuleCardNew };
