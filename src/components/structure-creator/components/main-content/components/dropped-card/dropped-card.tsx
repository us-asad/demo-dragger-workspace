import React, { useEffect, useRef } from "react";
import { Props } from "./types";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { twMerge } from "tailwind-merge";
import { ResizeIcon, TrashIcon } from "@/icons";
import { updateCardPositions } from "./helpers";

export const DroppedCard: React.FC<Props> = ({ card, setCard, isOver, droppedCards, setDroppedCards, removeDroppedCard, disabled }) => {
  const cardRef = useRef(null);

  const handleDrag: RndDragCallback = (_event, data) => {
    updateCardPositions({ ...card, ...data }, droppedCards, setDroppedCards)
  }

  const handleDragStop: RndDragCallback = (_event, data) => {
    const element = document.getElementById(card.id);
    if (!element) {
      return;
    }

    const [x, y] = element.style.transform.replace("translate(", "").replace(")", "").split(", ");
    if (isNaN(parseInt(x)) || isNaN(parseInt(y))) {
      return;
    }

    setCard({ ...card, x: data.x, y: data.y, lastX: card.x, lastY: card.y });
  }

  const handleResize: RndResizeCallback = (_event, _direction, _ref, delta, position) => {
    updateCardPositions({ ...card, ...position, width: card.width + delta.width, height: card.height + delta.height }, droppedCards, setDroppedCards)
  }

  const handleResizeStop: RndResizeCallback = (_event, _moveName, _element, delta) => {
    setCard({ ...card, width: card.width + delta.width, height: card.height + delta.height });
  }

  useEffect(() => {
    updateCardPositions(card, droppedCards, setDroppedCards)
  }, [card]);

  return (
    <Rnd
      disableDragging={disabled}
      ref={cardRef}
      minWidth={140}
      minHeight={128}
      position={{ x: card.x, y: card.y }}
      default={card}
      onDragStop={handleDragStop}
      onDrag={handleDrag}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      dragAxis="both"
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      enableResizing={{ bottomRight: !disabled, bottomLeft: false }}
      id={card.id}
      resizeHandleWrapperClass="absolute bottom-2.5 right-2.5"
      resizeHandleComponent={{ bottomRight: <ResizeIcon className="text-white w-5" /> }}
      className="group"
    >
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <img
          src={card.name}
          alt={`${card.name}-${card.id}`}
          className="pointer-events-none w-full h-full object-cover"
        />
        <div className={twMerge("absolute top-0 left-0 w-full h-full bg-white/60 grid place-content-center text-xs text-center font-medium duration-150", !isOver && "opacity-0 pointer-events-none")}>
          You cannot put it here
        </div>
      </div>
      {!disabled && (
        <button type="button" onClick={removeDroppedCard} className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 duration-150 absolute right-1 top-1 rounded bg-red-600 text-white grid place-content-center text-sm w-5 h-5">
          <TrashIcon />
        </button>
      )}
    </Rnd>
  );
};
