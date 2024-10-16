import { sectionsTestIds } from '@moneytrack/shared/constants';
import { Badge } from '@moneytrack/web/components/ui/badge';
import { EmptyText } from '@moneytrack/web/components/ui/empty';
import { ScrollContainer } from '@moneytrack/web/components/ui/scroll-container';
import { useFetchMyCategories } from '@moneytrack/web/hooks/useFetchMyCategories';

export const MyCategories = () => {
  const { myCategories } = useFetchMyCategories();

  return (
    <ScrollContainer data-testid={sectionsTestIds.MY_CATEGORIES_SECTION}>
      <EmptyText text="You don't have any category used yet 💀">
        {myCategories.map(({ category, _id }) => (
          <Badge key={_id} variant="secondary" className="shadow-md">
            {category}
          </Badge>
        ))}
      </EmptyText>
    </ScrollContainer>
  );
};
