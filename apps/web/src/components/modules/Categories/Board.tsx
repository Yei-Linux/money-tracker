'use client';

import { DragDropContext } from '@hello-pangea/dnd';
import { Column } from './Column';
import { useDndCategories } from '@moneytrack/web/hooks/useDndCategories';
import { CategoriesBoardType } from '@moneytrack/web/types/categories';

type TCategoriesBoard = {
  parentCategoriesColumns: CategoriesBoardType['parentCategoriesColumns'];
  categories: CategoriesBoardType['categories'];
};

export const CategoriesBoard = ({
  parentCategoriesColumns,
  categories,
}: TCategoriesBoard) => {
  const { handleDragDrop, data } = useDndCategories({
    defaultData: parentCategoriesColumns,
  });

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="flex items-start w-full py-4 mt-6 rounded-md overflow-x-auto">
        {Object.keys(parentCategoriesColumns).map((colId, index) => {
          const columnData = data[colId];
          return (
            <div
              key={index}
              className="rounded-xl border flex flex-col min-w-[200px] mx-3 bg-[#101204] text-white"
            >
              <div className="flex items-center justify-between gap-2 p-4 rounded-t-xl">
                <p className="text-md font-bold">{columnData.title}</p>
              </div>

              <Column {...columnData} categories={categories} />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
