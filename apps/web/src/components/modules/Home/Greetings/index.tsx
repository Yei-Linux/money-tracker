import { sectionsTestIds } from '@moneytrack/shared/constants';
import { UserName } from '../../@shared/Auth/UserName';
import { TitleHeader } from '@moneytrack/web/components/layouts/TitleHeader';

export const Greetings = () => {
  return (
    <TitleHeader dataTestId={sectionsTestIds.GREETINGS_SECTION}>
      Welcome Back <UserName />
    </TitleHeader>
  );
};
