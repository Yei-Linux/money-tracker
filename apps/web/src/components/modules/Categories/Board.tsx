'use client';

import { DragDropContext } from '@hello-pangea/dnd';
import { Column } from './Column';
import { useDndCategories } from '@moneytrack/web/hooks/useDndCategories';

const INITIAL_COLUMN_ORDER = ['column-1', 'column-2', 'column-3'];

const INITIAL_COL_DATA = {
  'column-1': {
    id: 'column-1',
    title: 'Column 1',
    itemsOrder: ['item-1', 'item-2', 'item-3'],
  },
  'column-2': {
    id: 'column-2',
    title: 'Column 2',
    itemsOrder: ['item-4', 'item-5'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Column 3',
    itemsOrder: ['item-6', 'item-7', 'item-8'],
  },
};

const ITEMS = {
  'item-1': {
    id: 'item-1',
    title: 'Item 1',
  },
  'item-2': {
    id: 'item-2',
    title: 'Item 2',
  },
  'item-3': {
    id: 'item-3',
    title: 'Item 3',
  },
  'item-4': {
    id: 'item-4',
    title: 'Item 4',
  },
  'item-5': {
    id: 'item-5',
    title: 'Item 5',
  },
  'item-6': {
    id: 'item-6',
    title: 'Item 6',
  },
  'item-7': {
    id: 'item-7',
    title: 'Item 7',
  },
  'item-8': {
    id: 'item-8',
    title: 'Item 8',
  },
};

export const CategoriesBoard = () => {
  const { handleDragDrop, data } = useDndCategories({
    defaultData: INITIAL_COL_DATA,
  });

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="flex items-start w-full py-4 mt-6 rounded-md overflow-x-auto">
        {INITIAL_COLUMN_ORDER.map((colId, index) => {
          const columnData = data[colId];
          return (
            <div className="rounded-xl border flex flex-col min-w-[200px] mx-3 bg-[#101204] text-white">
              <div className="flex items-center justify-between gap-2 p-4 rounded-t-xl">
                <p className="text-md font-bold">{columnData.title}</p>
              </div>

              <Column {...columnData} ITEMS={ITEMS} />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
