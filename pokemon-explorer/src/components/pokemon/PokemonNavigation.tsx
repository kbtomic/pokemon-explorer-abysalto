'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ButtonVariant } from '@/lib/constants/enums';
import { ArrowLeft, Home } from 'lucide-react';

export function PokemonNavigation() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/explorer">
          <Button
            variant={ButtonVariant.OUTLINE}
            className="inline-flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant={ButtonVariant.OUTLINE}
            className="inline-flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
