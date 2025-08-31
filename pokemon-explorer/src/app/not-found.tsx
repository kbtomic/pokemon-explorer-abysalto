'use client';

import { PageLayout } from '@/components/common/PageLayout';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Pokemon-themed 404 illustration */}
        <div className="mb-8">
          <div className="text-6xl mb-2">404</div>
        </div>

        {/* Main message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Oops! This Pokemon got lost!</h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
          The page you&apos;re looking for seems to have wandered off into the tall grass. Don&apos;t worry, we&apos;ll help you find your
          way back!
        </p>

        {/* Search suggestion */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 max-w-md">
          <div className="flex items-center justify-center mb-3">
            <Search className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800 font-medium">Looking for something specific?</span>
          </div>
          <p className="text-red-700 text-sm">Try searching for Pokemon, berries, items, or locations in our database.</p>
        </div>
      </div>
    </PageLayout>
  );
}
