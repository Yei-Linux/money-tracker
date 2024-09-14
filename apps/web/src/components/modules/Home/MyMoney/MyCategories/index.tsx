import { Badge } from '@moneytrack/web/components/ui/badge';
import { EmptyText } from '@moneytrack/web/components/ui/empty';
import { ScrollContainer } from '@moneytrack/web/components/ui/scroll-container';
import { getMyCategoriesService } from '@moneytrack/web/services/categories.service';
import { FC } from 'react';

type MyCategories = {
  sessionCookieString: string;
};

export const MyCategories: FC<MyCategories> = async ({
  sessionCookieString,
}) => {
  const categories = await getMyCategoriesService(sessionCookieString);

  return (
    <ScrollContainer>
      <EmptyText text="You don't have any category used yet 💀">
        {categories.map(({ category, _id }) => (
          <Badge key={_id} variant="secondary" className="shadow-md">
            {category}
          </Badge>
        ))}
      </EmptyText>
    </ScrollContainer>
  );
};
