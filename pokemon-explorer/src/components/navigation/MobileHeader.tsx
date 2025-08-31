import { useState } from 'react';
import { MobileNavigationMenu } from '@/components/navigation/MobileNavigationMenu';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/navigation/Logo';

export function MobileHeader() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-white border-b border-red-200 px-4 py-3">
        <Logo />
        <Menu className="h-5 w-5" onClick={() => setIsNavMenuOpen(true)} />
      </div>

      <MobileNavigationMenu isOpen={isNavMenuOpen} onClose={() => setIsNavMenuOpen(false)} />
    </>
  );
}
