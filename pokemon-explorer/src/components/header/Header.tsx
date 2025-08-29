'use client';

import { MobileHeader } from '@/components/header/MobileHeader';
import { DesktopHeader } from '@/components/header/DesktopHeader';

export function Header() {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
      <div className="border-b border-red-200" />
    </>
  );
}
