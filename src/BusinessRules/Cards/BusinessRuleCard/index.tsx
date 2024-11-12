import { MdOutlineRemoveRedEye, MdOutlineDelete } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { StyledCard, StyledContainer } from "./styles";

interface IBusinessRuleCard {
  children: React.ReactNode;
  handleDelete: (id: string) => void;
  handleView: (id: string) => void;
  id: string;
}

const BusinessRuleCard = (props: IBusinessRuleCard) => {
  const { children, handleDelete, handleView, id } = props;
  return (
    <StyledCard>
      <Stack direction="column" width="100%" height="100%">
        <Stack height="282px" gap="24px" direction="column">
          <StyledContainer>
            <Stack direction="column" margin="10px">
              {children}
            </Stack>
          </StyledContainer>
        </Stack>
        <Stack gap="16px" direction="column" margin="2px 12px">
          <Divider />
          <Stack gap="16px" justifyContent="end">
            <Icon
              appearance="dark"
              size="24px"
              cursorHover
              icon={<MdOutlineRemoveRedEye />}
              onClick={() => {
                handleView(id);
              }}
            />
            <Icon
              cursorHover
              appearance="dark"
              size="24px"
              icon={<MdOutlineDelete />}
              onClick={() => {
                handleDelete(id);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export { BusinessRuleCard };
export type { IBusinessRuleCard };
