import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Input } from '@moneytrack/web/components/ui/input';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '../../ui/button';

type Column = {
  id: string;
  itemsOrder: any;
  ITEMS: any;
};

export const Column = ({ itemsOrder, id, ITEMS }: Column) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col w-full h-fit"
        >
          {itemsOrder.map((item_id: any, index: number) => {
            const item = ITEMS[item_id];

            return (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="rounded-md flex flex-col p-2 m-2 bg-[#22272B]"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <p className="text-sm">{item.title}</p>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
          <Button className="flex gap-2 text-xs font-base !p-4 text-black bg-accent m-2 hover:bg-accent">
            <PlusCircleIcon />
            <p>Add your new category</p>
          </Button>
        </div>
      )}
    </Droppable>
  );
};
