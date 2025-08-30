'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ButtonVariant } from '@/lib/constants/enums';
import { navigationItems } from '@/lib/data/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {navigationItems.map(item => (
        <Link key={item.href} href={item.href}>
          <Button variant={pathname === item.href ? ButtonVariant.DEFAULT : ButtonVariant.GHOST} className="text-sm font-medium">
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  );
}
