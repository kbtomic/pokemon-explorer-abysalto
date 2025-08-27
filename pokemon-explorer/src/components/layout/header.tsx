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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Pokemon Explorer
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`text-sm font-medium cursor-pointer transition-colors ${
                      pathname === item.href
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              About
            </Button>
            <Button size="sm">GitHub</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
