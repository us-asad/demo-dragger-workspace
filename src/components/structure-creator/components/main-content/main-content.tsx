import React, { useCallback, useRef, useState } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { twMerge } from "tailwind-merge";
import { IDroppedCardResult, Props } from "./types";
import { DroppedCard } from "./components";
import { IDroppedCard } from "../../types";

export const MainContent: React.FC<Props> = ({ droppedCards, setDroppedCards, disabled, className }) => {
  const [hoveredIds, setHoveredIds] = useState<number[]>([]);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const isOverlapping = useCallback(
    (x: number, y: number, width: number, height: number, id?: number): number[] => {
      return droppedCards
        .filter(
          (card) =>
            card.id !== id &&
            x < card.x + card.width &&
            x + width > card.x &&
            y < card.y + card.height &&
            y + height > card.y
        )
        .map((card) => card.id);
    },
    [droppedCards]
  );

  const [{ canDrop, isOver }, drop] = useDrop<IDroppedCardResult, void, { canDrop: boolean; isOver: boolean }>(
    () => ({
      accept: "box",
      drop: (card: IDroppedCardResult, monitor: DropTargetMonitor) => {
        const workspaceBounds = workspaceRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
        const offset = monitor.getSourceClientOffset();

        if (!offset) return;

        const x = offset.x - workspaceBounds.x;
        const y = offset.y - workspaceBounds.y;
        const width = 140;
        const height = 128;

        if (!isOverlapping(x, y, width, height).length) {
          setDroppedCards((prev) => [
            ...prev,
            {
              name: card.name,
              x,
              y,
              width,
              height,
              id: Date.now(),
            },
          ]);
        }
        setHoveredIds([]);
      },
      hover: (_card, monitor) => {
        const workspaceBounds = workspaceRef.current?.getBoundingClientRect() || { x: 0, y: 0 };
        const offset = monitor.getSourceClientOffset();

        if (offset) {
          const x = offset.x - workspaceBounds.x;
          const y = offset.y - workspaceBounds.y;
          const overlappingIds = isOverlapping(x, y, 140, 128);
          setHoveredIds(overlappingIds);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [droppedCards, isOverlapping]
  );

  const onUpdateCard = (updatedCard: IDroppedCard, index: number): void => {
    setDroppedCards((prev) => {
      const updatedCards = [...prev];
      updatedCards[index] = updatedCard;
      return updatedCards;
    });
  }

  const onRemoveCard = (index: number): void => {
    setDroppedCards((prev) => {
      const updatedCards = [...prev];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  }

  return (
    <div ref={disabled ? undefined : drop} className={twMerge("relative overflow-hidden w-full", className)}>
      <div ref={workspaceRef} className="w-full h-full relative overflow-hidden">
        {!disabled && (
          <div
            className={twMerge(
              "workspace-drop-card absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[97%] h-[97%] rounded-lg grid place-content-center text-4xl font-medium text-[grey] bg-slate-200 duration-150",
              canDrop ? "opacity-60" : isOver ? "opacity-30" : "opacity-0 pointer-events-none"
            )}
          >
            <p className={twMerge("duration-150", isOver && "scale-110")}>Drag and drop element here</p>
          </div>
        )}
        {droppedCards.map((card, index) => (
          <DroppedCard
            key={card.id}
            card={card}
            setCard={(updatedCard) => onUpdateCard(updatedCard, index)}
            isOver={hoveredIds.includes(card.id)}
            isOverlapping={(x, y, width, height) => !isOverlapping(x, y, width, height, card.id).length}
            setHoveredIds={setHoveredIds}
            droppedCards={droppedCards}
            setDroppedCards={setDroppedCards}
            removeDroppedCard={() => onRemoveCard(index)}
            workspaceRef={workspaceRef}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
