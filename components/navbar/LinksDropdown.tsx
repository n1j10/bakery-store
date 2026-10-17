"use client"

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserIcon from './UserIcon';
import Link from 'next/link';
import { dropDownMenuLinks } from '@/utils/links';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { logoutAction } from "@/utils/api";

type LinksDropdownProps = {
  isSignedIn?: boolean;
  isAdmin?: boolean;
  imageUrl?: string | null;
  userName?: string;
};

function LinksDropdown({ isSignedIn = false, isAdmin = false, imageUrl, userName }: LinksDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant='outline' className='h-9 gap-2 rounded-full ps-3 pe-1' aria-label="القائمة" />}
      >
        <Menu className='size-4' />
        <UserIcon imageUrl={imageUrl} name={userName} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-52' align='end' sideOffset={10}>
        {!isSignedIn ? (
          <>
            <DropdownMenuItem render={<Link href='/sign-in' />}>تسجيل الدخول</DropdownMenuItem>
            <DropdownMenuItem render={<Link href='/sign-up' />}>إنشاء حساب</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href='/products' />}>كل المنتجات</DropdownMenuItem>
            <DropdownMenuItem render={<Link href='/about' />}>من نحن</DropdownMenuItem>
          </>
        ) : (
          <>
            {userName && (
              <>
                <div className='px-2 py-1.5 text-xs text-muted-foreground'>أهلاً، {userName}</div>
                <DropdownMenuSeparator />
              </>
            )}
            {dropDownMenuLinks.map((link) => {
              // GET /reviews/all is admin-only on the backend
              if ((link.name === 'dashboard' || link.name === 'reviews') && !isAdmin) return null;
              return (
                <DropdownMenuItem key={link.name} render={<Link href={link.href} />}>
                  {link.label}
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' onClick={() => logoutAction()}>
              <LogOut className='size-4' />
              تسجيل الخروج
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
