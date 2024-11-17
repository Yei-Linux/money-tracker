import { TitleHeader } from '@moneytrack/web/components/layouts/TitleHeader';
import { CategoriesBoard } from '@moneytrack/web/components/modules/Categories/Board';
import { HandyArrowToRightIcon } from '@moneytrack/web/components/ui/icons/HandyArrowToRightIcon';
import { COOKIES } from '@moneytrack/web/constants';
import { WithAuth } from '@moneytrack/web/hocs/WithAuth';
import { getCookieString } from '@moneytrack/web/lib/cookies';
import { getMyCategoriesBoardService } from '@moneytrack/web/services/categories.service';
import { cookies } from 'next/headers';

async function MyCategoriesPage() {
  const cookiesRes = cookies();
  const sessionCookie = cookiesRes.get(COOKIES.NextAuthSession);
  const sessionCookieString = getCookieString(sessionCookie);
  const response = await getMyCategoriesBoardService(sessionCookieString);

  return (
    <div className="flex flex-col items-center md:gap-24 min-h-[85vh] max-w-[1200px] m-auto">
      <div className="p-10 w-full">
        <TitleHeader>My Categories</TitleHeader>
      </div>

      {response && (
        <div className="relative">
          <span className="hidden md:flex rotate-45 w-fit -ml-[50px]">
            <HandyArrowToRightIcon />
          </span>
          <CategoriesBoard
            parentCategoriesColumns={response.parentCategoriesColumns}
            categories={response.categories}
          />
        </div>
      )}
    </div>
  );
}

export default WithAuth(MyCategoriesPage);
