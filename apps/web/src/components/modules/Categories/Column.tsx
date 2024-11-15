import { Draggable, Droppable } from '@hello-pangea/dnd';
import { PlusCircleIcon, SettingsIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { CategoriesBoardType } from '@moneytrack/web/types/categories';
import { CategoryPopup } from './CategoryPopup';
import { CategoryActions } from './CategoryActions';

type TColumn = {
  id: string;
  itemsOrder: Array<string>;
  categories: CategoriesBoardType['categories'];
};

export const Column = ({ itemsOrder, id, categories }: TColumn) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col w-full h-fit p-2"
        >
          {itemsOrder?.map((item_id: any, index: number) => {
            const item = categories[item_id];

            return (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <CategoryPopup
                    id={item.id}
                    category={item.title}
                    transactionType={item.transactionType}
                    parentCategory={id}
                  >
                    <div
                      className="outline-none rounded-md flex w-full justify-between items-center p-2 my-2 bg-[#22272B]"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <p className="text-sm text-left">{item.title}</p>
                      <CategoryActions id={item.id} />
                    </div>
                  </CategoryPopup>
                )}
              </Draggable>
            );
          })}

          {provided.placeholder}

          <CategoryPopup category="" transactionType="" parentCategory={id}>
            <div className="rounded-md flex items-center gap-2 text-xs font-base p-2 text-black bg-accent hover:bg-accent">
              <PlusCircleIcon />
              <p>Add your new category</p>
            </div>
          </CategoryPopup>
        </div>
      )}
    </Droppable>
  );
};
