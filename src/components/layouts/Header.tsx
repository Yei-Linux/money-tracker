import Link from 'next/link';
import { UserDropdown } from '../modules/Auth/UserDropdown';
import { AuthActions } from '../modules/Auth/AuthActionts';

export const Header = () => (
  <header className="sticky top-0 backdrop-blur-sm bg-white/30 grid-in-header flex items-center p-4 justify-between">
    <div className="flex gap-1 items-center">
      <img
        src="./logo.png"
        alt="Money Tracker Logo"
        className="h-[80px] w-[80px]"
      />
      <p className="text-2xl font-snicker">Money Tracker</p>
    </div>

    <nav>
      <ul className="flex items-center gap-5 [&_li]:cursor-pointer">
        <li>
          <Link href="/">Summary</Link>
        </li>
        <AuthActions />
        <li>
          <UserDropdown />
        </li>
      </ul>
    </nav>
  </header>
);
