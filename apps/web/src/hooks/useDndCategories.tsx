import { DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { CategoriesBoardType } from '../types/categories';
import { updateDraggingCategoryServerAction } from '../server-actions/categories/board/update-dragging-category';
import toast from 'react-hot-toast';

type UseDndCategories = {
  defaultData: CategoriesBoardType['parentCategoriesColumns'];
};

export const useDndCategories = ({ defaultData }: UseDndCategories) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    setData(defaultData);
  }, [JSON.stringify(defaultData)]);

  const handleDragDrop = async (results: DropResult<string>) => {
    try {
      const { source, destination, type } = results;
      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      if (type === 'COLUMN') return;

      if (source.droppableId === destination.droppableId) {
        const source_col_id = source.droppableId;
        const new_items_id_collection = [...data[source_col_id].itemsOrder];
        const [deleted_item_id] = new_items_id_collection.splice(
          sourceIndex,
          1
        );
        new_items_id_collection.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...data };
        new_data[source_col_id].itemsOrder = new_items_id_collection;
        setData(new_data);

        return;
      }

      const source_col_id = source.droppableId,
        dest_col_id = destination.droppableId;

      const new_source_items_id_collc = [...data[source_col_id].itemsOrder];
      const new_dest_items_id_collc = [...data[dest_col_id].itemsOrder];
      const [deleted_item_id] = new_source_items_id_collc.splice(
        sourceIndex,
        1
      );

      new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id);
      const new_data = { ...data };
      new_data[source_col_id].itemsOrder = new_source_items_id_collc;
      new_data[dest_col_id].itemsOrder = new_dest_items_id_collc;

      setData(new_data);

      await updateDraggingCategoryServerAction(deleted_item_id, dest_col_id);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return { handleDragDrop, data };
};
