'use client';

import { LogOut, User, UserCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOut } from '@/lib/auth/auth';
import { useAuthStore } from '@/store/auth';

export const UserDropdown = () => {
  const session = useAuthStore((store) => store.session);

  return (
    <>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-none outline-none ![box-shadow:none]"
            >
              <UserCircle2 size={35} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="#">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="#">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />

              <Button
                variant="outline"
                className="border-none outline-none ![box-shadow:none]"
                onClick={() => signOut()}
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
