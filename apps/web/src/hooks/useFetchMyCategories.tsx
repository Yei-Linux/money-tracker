import { useQuery } from '@tanstack/react-query';
import { useDropdownsStore } from '../store/dropdowns';
import { getMyCategoriesService } from '../services/categories.service';

export const useFetchMyCategories = () => {
  const month = useDropdownsStore((store) => store.month);
  const { data } = useQuery({
    queryKey: ['@my-categories', month],
    queryFn: async () => await getMyCategoriesService(month),
  });

  return { myCategories: data ?? [] };
};
