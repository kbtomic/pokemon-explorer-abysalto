'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explorer', label: 'Pokemon' },
    { href: '/berries', label: 'Berries' },
    { href: '/items', label: 'Items' },
    { href: '/locations', label: 'Locations' },
    { href: '/pokemon/species', label: 'Species' },
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
                  <span
                    className={`text-sm font-medium cursor-pointer transition-colors ${
                      pathname === item.href ? 'text-red-600' : 'text-red-500 hover:text-red-700'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
