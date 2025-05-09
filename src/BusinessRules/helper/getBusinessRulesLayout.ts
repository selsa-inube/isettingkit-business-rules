import { IGetBusinessRulesLayout } from "../types/helper/IGetBusinessRulesLayout";
import { renderCard } from "./renderCard";

const getBusinessRulesLayout = (props: IGetBusinessRulesLayout) => {
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
        renderCard({
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
    : decisions?.map((decision) =>
        renderCard({
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
      decisions?.length < Math.floor(window.innerWidth / 300)) &&
    !loading &&
    controls;

  return { renderedCards, shouldRenderAddCard };
};

export { getBusinessRulesLayout };
