import { IGetBusinessRulesLayout } from "../types/helper/IGetBusinessRulesLayout";
import { renderCardNew } from "./renderCard";

const getBusinessRulesLayoutNew = (props: IGetBusinessRulesLayout) => {
  const {
    controls,
    customTitleContentAddCard,
    decisions,
    loading,
    handleOpenModal,
    handleDelete,
    textValues,
    isOpenFor,
    toggleAt,
  } = props;
  const renderedCards = loading
    ? Array.from({ length: 3 }).map((_, index) =>
        renderCardNew({
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
        renderCardNew({
          type: "decision",
          decision,
          controls: controls,
          customTitleContentAddCard,
          loading,
          handleOpenModal,
          handleDelete,
          textValues,
          index: index,
          isOpen: isOpenFor ? isOpenFor(index) : false,
          onToggle: toggleAt ? () => toggleAt(index) : undefined,
        }),
      );

  const shouldRenderAddCard =
    (decisions?.length === 0 ||
      decisions!.length < Math.floor(window.innerWidth / 300)) &&
    !loading &&
    controls;

  return { renderedCards, shouldRenderAddCard };
};

export { getBusinessRulesLayoutNew };
