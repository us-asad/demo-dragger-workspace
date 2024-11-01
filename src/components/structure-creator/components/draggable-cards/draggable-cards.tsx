import { cards } from "./constants";
import { DraggableCard } from "./components";
import React from "react";
import { Props } from "./types";

export const DraggableCards: React.FC<Props> = ({ droppedCards }) => (
  <div className="grid grid-cols-2 gap-2 h-max p-4 w-1/4">
    {cards.map((cardPic, index) => (
      <DraggableCard key={cardPic} pictureURL={cardPic} index={index} droppedCards={droppedCards} />
    ))}
  </div>
)