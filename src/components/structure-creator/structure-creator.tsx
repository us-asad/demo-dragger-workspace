import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DraggableCards, MainContent } from "./components";
import { useState } from 'react';
import { IDroppedCard } from './types';

export const StructureCreator = () => {
  const [droppedCards, setDroppedCards] = useState<IDroppedCard[]>([]);
  const [submittedCards, setSubmittedCards] = useState<IDroppedCard[]>([])

  const onSubmit = () => {
    setSubmittedCards([...droppedCards])
    setTimeout(() => {
      window.scrollTo({ top: 800 })
    }, 0);
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <h3 className='text-5xl font-semibold'>Workspace</h3>
        <button type="button" disabled={!droppedCards.length} onClick={onSubmit} className='rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90 px-10 py-3'>Submit</button>
      </div>
      <div className="flex divide-x divide-slate-200 rounded-xl min-h-[700px] bg-white">
        <DndProvider backend={HTML5Backend}>
          <DraggableCards droppedCards={droppedCards} />
          <MainContent droppedCards={droppedCards} setDroppedCards={setDroppedCards} className='w-3/4' />
        </DndProvider>

      </div>
      {submittedCards.length ? (
        <div className="mt-5 flex rounded-xl min-h-[700px] bg-white w-3/4 mx-auto">
          <DndProvider backend={HTML5Backend}>
            <MainContent droppedCards={submittedCards} setDroppedCards={setSubmittedCards} disabled />
          </DndProvider>
        </div>
      ) : null}
    </div>
  )
}