import { Dispatch, RefObject, SetStateAction } from "react";
import { IDroppedCard } from "../../types";

export interface Props {
  card: IDroppedCard
  setCard: (IDroppedCard) => void
  isOver: boolean
  isOverlapping: (x: number, y: number, width: number, height: number) => boolean
  setHoveredIds: Dispatch<SetStateAction<number[]>>
  droppedCards: IDroppedCard[]
  setDroppedCards: Dispatch<SetStateAction<IDroppedCard[]>>
  removeDroppedCard: () => void
  workspaceRef: RefObject<HTMLDivElement>
  disabled?: boolean
}