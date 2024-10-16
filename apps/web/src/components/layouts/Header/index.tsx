import Link from 'next/link';
import { UserDropdown } from '../../modules/Auth/UserDropdown';
import { AuthActions } from '../../modules/Auth/AuthActionts';
import { LinkActions } from './LinkActions';
import { Logo } from '@moneytrack/web/components/modules/@shared/Logo';
import { MonthDropdown } from './MonthDropdown';

export const Header = () => (
  <header className="sticky top-0 backdrop-blur-sm bg-white/30 grid-in-header flex items-center p-4 justify-between">
    <Link href="/">
      <div className="flex gap-1 items-center">
        <Logo />
      </div>
    </Link>

    <nav>
      <div className="flex items-center gap-5 [&_li]:cursor-pointer">
        <LinkActions />
        <AuthActions />
        <MonthDropdown />
        <UserDropdown />
      </div>
    </nav>
  </header>
);
