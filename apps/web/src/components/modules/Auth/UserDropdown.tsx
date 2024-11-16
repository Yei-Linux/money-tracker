'use client';

import {
  BookMarkedIcon,
  LogOut,
  SettingsIcon,
  UserCircle2,
} from 'lucide-react';

import { Button } from '@moneytrack/web/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@moneytrack/web/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOut } from '@moneytrack/web/lib/auth/auth';
import { useAuthStore } from '@moneytrack/web/store/auth';

export const UserDropdown = () => {
  const session = useAuthStore((store) => store.session);

  return (
    <>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-0 border-none outline-none ![box-shadow:none]"
            >
              <UserCircle2 size={35} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <Link href="/my-categories" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <BookMarkedIcon className="mr-2 h-4 w-4" />
                  <span>My categories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />

              <p>Log out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
