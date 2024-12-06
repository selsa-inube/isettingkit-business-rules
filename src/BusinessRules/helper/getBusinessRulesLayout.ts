import { IRuleDecision } from "@isettingkit/input";
import { IRulesFormTextValues } from "../Form/types";
import { renderCard } from "./renderCard";

interface GetBusinessRulesLayoutParams {
  controls: boolean;
  decisions: IRuleDecision[];
  loading: boolean;
  handleOpenModal: (decision?: IRuleDecision | null) => void;
  handleDelete: (id: string) => void;
  textValues: IRulesFormTextValues;
}

interface GetBusinessRulesLayoutReturn {
  renderedCards: React.ReactNode[];
  shouldRenderAddCard: boolean;
}

function getBusinessRulesLayout({
  controls,
  decisions,
  loading,
  handleOpenModal,
  handleDelete,
  textValues,
}: GetBusinessRulesLayoutParams): GetBusinessRulesLayoutReturn {
  const renderedCards = loading
    ? Array.from({ length: 3 }).map((_, index) =>
        renderCard({
          type: "loading",
          index,
          controls,
          loading,
          handleOpenModal,
          handleDelete,
          textValues,
        }),
      )
    : decisions.map((decision) =>
        renderCard({
          type: "decision",
          decision,
          controls,
          loading,
          handleOpenModal,
          handleDelete,
          textValues,
        }),
      );

  const shouldRenderAddCard =
    (decisions.length === 0 ||
      decisions.length < Math.floor(window.innerWidth / 300)) &&
    !loading &&
    controls;

  return { renderedCards, shouldRenderAddCard };
}

export { getBusinessRulesLayout };
