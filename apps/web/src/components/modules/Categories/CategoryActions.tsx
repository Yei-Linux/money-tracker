import { Button } from '@moneytrack/web/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { TrashIcon, SettingsIcon } from 'lucide-react';
import { useRemoveCategory } from '@moneytrack/web/hooks/board/useRemoveCategory';

type CategoryActions = { id: string };

export const CategoryActions = ({ id }: CategoryActions) => {
  const { onSubmit } = useRemoveCategory();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SettingsIcon size={15} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onSubmit(id);
          }}
          className="cursor-pointer font-semibold"
        >
          <TrashIcon className="mr-2 h-4 w-4" />

          <p>Remove</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
