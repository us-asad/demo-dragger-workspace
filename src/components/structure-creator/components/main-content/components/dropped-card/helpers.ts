import { IDroppedCard } from "@/components/structure-creator/types";
import { COLLISION_OFFSET } from "./constants";

export const checkCollision = (card: IDroppedCard, otherCard: IDroppedCard): boolean => {
  const xOverlap = card.x < otherCard.x + otherCard.width + COLLISION_OFFSET &&
    card.x + card.width > otherCard.x - COLLISION_OFFSET;
  const yOverlap = card.y < otherCard.y + otherCard.height + COLLISION_OFFSET &&
    card.y + card.height > otherCard.y - COLLISION_OFFSET;
  return xOverlap && yOverlap;
};

export const adjustPosition = (card: IDroppedCard, collidedCard: IDroppedCard): IDroppedCard => {
  const dx = collidedCard.x - card.x;
  const dy = collidedCard.y - card.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    collidedCard.x = dx > 0 ? card.width + card.x + COLLISION_OFFSET : card.x - collidedCard.width - COLLISION_OFFSET;
  } else {
    collidedCard.y = dy > 0 ? card.height + card.y + COLLISION_OFFSET : card.y - collidedCard.height - COLLISION_OFFSET;
  }
  return collidedCard;
};

export const updateCardPositions = (
  card: IDroppedCard,
  droppedCards: IDroppedCard[],
  setDroppedCards: React.Dispatch<React.SetStateAction<IDroppedCard[]>>
): void => {
  const collidedCards = droppedCards.filter(el => el.id !== card.id && checkCollision(card, el)).map(el => el.id);

  if (collidedCards.length) {
    setDroppedCards(prev =>
      prev.map(c => collidedCards.includes(c.id) ? adjustPosition(card, { ...c }) : c)
    );
  }
};