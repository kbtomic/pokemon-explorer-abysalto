'use client';

import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pokemon Explorer</h1>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>•</span>
              <span>Advanced Filtering</span>
              <span>•</span>
              <span>Search & Sort</span>
            </div>
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
