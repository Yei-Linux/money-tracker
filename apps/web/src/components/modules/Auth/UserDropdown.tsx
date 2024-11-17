'use client';

import {
  BarChartIcon,
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
import { Avatar, AvatarImage } from '../../ui/avatar';
import { avatarURL } from '@moneytrack/web/lib/utils';

export const UserDropdown = () => {
  const session = useAuthStore((store) => store.session);

  const avatar = avatarURL(session?.name!, session?.image!);

  return (
    <>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-0 border-none outline-none ![box-shadow:none]"
            >
              <Avatar className="shadow-md !w-[35px] !h-[35px]">
                <AvatarImage src={avatar} />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <Link href="/categories" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <BookMarkedIcon className="mr-2 h-4 w-4" />
                  <span>My Categories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>My Settings</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/summary" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <BarChartIcon className="mr-2 h-4 w-4" />
                  <span>My Summary</span>
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
