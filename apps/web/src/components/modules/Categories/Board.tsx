'use client';

import { DragDropContext } from '@hello-pangea/dnd';
import { Column } from './Column';
import { useDndCategories } from '@moneytrack/web/hooks/useDndCategories';
import { CategoriesBoardType } from '@moneytrack/web/types/categories';
import { ColumnTitleEditable } from './ColumnTitleEditable';

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
      <div className="flex items-start rounded-md overflow-x-auto max-w-[95vw]">
        {Object.keys(parentCategoriesColumns).map((colId, index) => {
          const columnData = data[colId];
          return (
            <div
              key={index}
              className="rounded-xl border flex flex-col min-w-[200px] mx-3 bg-[#101204] text-white"
            >
              <ColumnTitleEditable
                defaultTitle={columnData.title}
                columnId={colId}
              />

              <Column {...columnData} categories={categories} />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
