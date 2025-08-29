'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NavigationLabel, ButtonVariant } from '@/types/enums';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: NavigationLabel.HOME },
    { href: '/explorer', label: NavigationLabel.POKEMON },
    { href: '/berries', label: NavigationLabel.BERRIES },
    { href: '/items', label: NavigationLabel.ITEMS },
    { href: '/locations', label: NavigationLabel.LOCATIONS },
    { href: '/pokemon/species', label: NavigationLabel.SPECIES },
  ];

  return (
    <header className="bg-white border-b border-red-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-xl sm:text-2xl font-bold text-red-600 cursor-pointer hover:text-red-700 transition-colors">
                Pokemon Explorer
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                  <Button variant={pathname === item.href ? ButtonVariant.DEFAULT : ButtonVariant.GHOST} className="text-sm font-medium">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
