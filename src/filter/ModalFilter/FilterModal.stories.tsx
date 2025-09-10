import { BrowserRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react";
import { FilterModal } from ".";
import { Text } from "@inubekit/inubekit";
import { IFilterModal } from "../types/IFilterModal";
import type { Decorator } from "@storybook/react";

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const story = {
  component: FilterModal,
  title: "components/modals/FilterModal",
  decorators: [withRouter],
};

const Template: StoryFn<IFilterModal> = (args) => <FilterModal {...args} />;

const Default = Template.bind({});
Default.args = {
  actionButtonLabel: "Filtrar",
  cancelButtonLabel: "Cancelar",
  portalId: "portalModal",
  title: "Filtrar",
  children: (
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry.{" "}
    </Text>
  ),
};
export { Default };
export default story;
