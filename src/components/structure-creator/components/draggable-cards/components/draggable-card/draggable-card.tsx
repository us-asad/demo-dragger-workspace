import React from "react";
import { Props } from "./types";
import { useDrag } from "react-dnd";
import { twMerge } from "tailwind-merge";

export const DraggableCard: React.FC<Props> = ({ pictureURL, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { name: pictureURL },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <img ref={drag} src={pictureURL} alt={`Picture ${index}`} className={twMerge("w-full h-32 object-cover rounded-md overflow-hidden duration-150 cursor-move", isDragging && "opacity-70")} />
  )
}