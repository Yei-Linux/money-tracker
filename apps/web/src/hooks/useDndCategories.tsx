import { DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';

type UseDndCategories = {
  defaultData: any;
};

export const useDndCategories = ({ defaultData }: UseDndCategories) => {
  const [data, setData] = useState<any>(defaultData);

  const handleDragDrop = (results: DropResult<string>) => {
    const { source, destination, type } = results;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (type === 'COLUMN') {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const source_col_id = source.droppableId;
      const new_items_id_collection = [...data[source_col_id].itemsOrder];
      const [deleted_item_id] = new_items_id_collection.splice(sourceIndex, 1);
      new_items_id_collection.splice(destinationIndex, 0, deleted_item_id);
      const new_data: any = { ...data };
      new_data[source_col_id].itemsOrder = new_items_id_collection;
      setData(new_data);

      //update the db
    } else {
      //changes within different col
      const source_col_id = source.droppableId,
        dest_col_id = destination.droppableId;

      const new_source_items_id_collc = [...data[source_col_id].itemsOrder];
      const new_dest_items_id_collc = [...data[dest_col_id].itemsOrder];
      const [deleted_item_id] = new_source_items_id_collc.splice(
        sourceIndex,
        1
      );

      new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id);
      const new_data: any = { ...data };
      new_data[source_col_id].itemsOrder = new_source_items_id_collc;
      new_data[dest_col_id].itemsOrder = new_dest_items_id_collc;

      setData(new_data);

      //update the db
    }
  };

  return { handleDragDrop, data };
};
