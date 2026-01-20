import { IGetBusinessRulesLayout } from "../types/helper/IGetBusinessRulesLayout";
import { renderCardwithGroup } from "./renderCard";

const getBusinessRulesLayoutWithGroup = (props: IGetBusinessRulesLayout) => {
  const {
    controls,
    customTitleContentAddCard,
    decisions,
    loading,
    handleOpenModal,
    handleDelete,
    textValues,
  } = props;
  const renderedCards = loading
    ? Array.from({ length: 3 }).map((_, index) =>
        renderCardwithGroup({
          type: "loading",
          index,
          controls,
          customTitleContentAddCard,
          loading,
          handleOpenModal,
          handleDelete,
          textValues,
        }),
      )
    : decisions?.map((decision, index) =>
        renderCardwithGroup({
          index,
          type: "decision",
          decision,
          controls,
          customTitleContentAddCard,
          loading,
          handleOpenModal,
          handleDelete,
          textValues,
        }),
      );

  const shouldRenderAddCard =
    (decisions?.length === 0 ||
      decisions!.length < Math.floor(window.innerWidth / 300)) &&
    !loading &&
    controls;

  return { renderedCards, shouldRenderAddCard };
};

export { getBusinessRulesLayoutWithGroup };
