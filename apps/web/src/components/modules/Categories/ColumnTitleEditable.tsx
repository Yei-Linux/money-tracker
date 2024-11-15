import { Input } from '../../ui/input';
import { useUpdateColumnTitle } from '@moneytrack/web/hooks/board/useUpdateColumnTitle';

type ColumnTitleEditable = {
  columnId: string;
  defaultTitle: string;
};

export const ColumnTitleEditable = ({
  defaultTitle,
  columnId,
}: ColumnTitleEditable) => {
  const { title, updateTitle, onSubmit } = useUpdateColumnTitle({
    defaultTitle,
  });

  return (
    <div className="w-full cursor-pointer py-2 px-4">
      <Input
        onBlur={() => onSubmit({ id: columnId, title })}
        className="bg-primary border-none font-bold"
        value={title}
        onChange={({ target }) => updateTitle(target.value!)}
      />
    </div>
  );
};
