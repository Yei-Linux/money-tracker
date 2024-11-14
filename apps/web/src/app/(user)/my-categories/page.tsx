import { CategoriesBoard } from '@moneytrack/web/components/modules/Categories/Board';
import { Title } from '@moneytrack/web/components/ui/title';
import { COOKIES } from '@moneytrack/web/constants';
import { getCookieString } from '@moneytrack/web/lib/cookies';
import { getMyCategoriesBoardService } from '@moneytrack/web/services/categories.service';
import { cookies } from 'next/headers';

async function MyCategoriesPage() {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);
  const response = await getMyCategoriesBoardService(sessionCookieString);

  return (
    <div className="flex flex-col gap-24 min-h-screen p-14 m-auto">
      <Title as="h2" className="text-center w-full">
        My Categories
      </Title>
      {response && (
        <CategoriesBoard
          parentCategoriesColumns={response.parentCategoriesColumns}
          categories={response.categories}
        />
      )}
    </div>
  );
}

export default MyCategoriesPage;
