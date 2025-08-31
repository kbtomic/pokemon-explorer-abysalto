'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileFilters } from '@/components/filters/mobile/MobileFilters';
import { MobileSearchModal } from '@/components/filters/mobile/MobileSearchModal/MobileSearchModal';
import { Search, Filter } from 'lucide-react';
import { ButtonSize, ButtonVariant } from '@/lib/constants/ui/buttons';

export function MobileFilterBar() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between space-x-4">
          <Button variant={ButtonVariant.OUTLINE} size={ButtonSize.ICON} onClick={() => setIsSearchModalOpen(true)} className="h-12 w-12">
            <Search className="h-6 w-6" />
          </Button>

          <Button variant={ButtonVariant.OUTLINE} size={ButtonSize.ICON} onClick={() => setIsFilterDrawerOpen(true)} className="h-12 w-12">
            <Filter className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <MobileFilters isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)} />

      <MobileSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </>
  );
}
