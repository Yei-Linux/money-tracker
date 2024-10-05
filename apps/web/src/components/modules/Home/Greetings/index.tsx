import { sectionsTestIds } from '@moneytrack/shared/constants';
import { UserName } from '../../@shared/Auth/UserName';

export const Greetings = () => {
  return (
    <div
      data-testid={sectionsTestIds.GREETINGS_SECTION}
      className="flex justify-center items-center gap-1 w-full p-4 border shadow-sm"
    >
      <div className="font-semibold text-4xl">
        <p className="font-snicker">
          Welcome Back <UserName />
        </p>
      </div>
      <img
        width={100}
        height={100}
        src="./assets/welcome-pig.gif"
        alt="pet animated running"
      />
    </div>
  );
};
