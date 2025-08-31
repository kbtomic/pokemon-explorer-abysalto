import { Navigation } from '@/components/header/Navigation';
import { Logo } from '@/components/header/Logo';

export function DesktopHeader() {
  return (
    <header className="hidden md:flex bg-whiteitems-center justify-between container mx-auto px-4 py-4">
      <Logo />
      <nav className="flex items-center space-x-4">
        <Navigation />
      </nav>
    </header>
  );
}
