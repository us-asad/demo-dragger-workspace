import { Dispatch, SetStateAction } from "react"
import { IDroppedCard } from "../../types"

export interface Props {
  droppedCards: IDroppedCard[]
  setDroppedCards: Dispatch<SetStateAction<IDroppedCard[]>>
  disabled?: boolean
  className?: string
}

export interface IDroppedCardResult {
  id: numnber,
  name: string
}