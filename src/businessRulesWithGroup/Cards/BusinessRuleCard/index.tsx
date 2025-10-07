import { MdOutlineDelete } from "react-icons/md";
import { Divider, Stack, Icon } from "@inubekit/inubekit";
import { StyledCard } from "./styles";
import { IBusinessRuleCard } from "../../../businessRules/types/Cards/BusinessRuleCard/IBusinessRuleCard";

const BusinessRuleCardWithGroup = (props: IBusinessRuleCard) => {
  const { children, controls = true, handleDelete, id } = props;
  return (
    <StyledCard>
      <Stack direction="column" gap="16px" padding="12px 16px">
        {children}
        {controls && (
          <>
            <Divider />
            <Stack gap="16px" justifyContent="end">
              <Icon
                cursorHover
                appearance="danger"
                size="24px"
                icon={<MdOutlineDelete />}
                onClick={() => {
                  handleDelete(id);
                }}
              />
            </Stack>
          </>
        )}
      </Stack>
    </StyledCard>
  );
};

export { BusinessRuleCardWithGroup };
