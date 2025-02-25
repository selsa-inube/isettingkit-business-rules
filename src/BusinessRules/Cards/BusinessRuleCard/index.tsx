import { MdOutlineDelete } from "react-icons/md";
import { Stack } from "@inubekit/inubekit";
import { Icon } from "@inubekit/inubekit";
import { Divider } from "@inubekit/inubekit";
import { StyledCard } from "./styles";

interface IBusinessRuleCard {
  children: React.ReactNode;
  controls?: boolean;
  handleDelete: (id: string) => void;
  handleView: (id: string) => void;
  id: string;
}

const BusinessRuleCard = (props: IBusinessRuleCard) => {
  const { children, controls = true, handleDelete, id } = props;
  return (
    <StyledCard>
      <Stack direction="column" gap="16px" padding="12px 16px">
        {children}
        {controls && (
          <>
            <Divider />
            <Stack gap="16px" justifyContent="end">
              {/* <Icon
                appearance="dark"
                size="24px"
                cursorHover
                icon={<MdOutlineEdit />}
                onClick={() => {
                  handleView(id);
                }}
              /> */}
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
          </>
        )}
      </Stack>
    </StyledCard>
  );
};

export { BusinessRuleCard };
export type { IBusinessRuleCard };
