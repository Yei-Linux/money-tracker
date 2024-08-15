import Link from "next/link";
import { UserDropdown } from "../../modules/Auth/UserDropdown";
import { AuthActions } from "../../modules/Auth/AuthActionts";
import { LinkActions } from "./LinkActions";
import { Logo } from "@/components/modules/@shared/Logo";

export const Header = () => (
  <header className="sticky top-0 backdrop-blur-sm bg-white/30 grid-in-header flex items-center p-4 justify-between">
    <Link href="/">
      <div className="flex gap-1 items-center">
        <Logo />
      </div>
    </Link>

    <nav>
      <ul className="flex items-center gap-5 [&_li]:cursor-pointer">
        <LinkActions />
        <AuthActions />
        <li>
          <UserDropdown />
        </li>
      </ul>
    </nav>
  </header>
);
