import { Navigation } from '@/components/navigation/Navigation';
import { Logo } from '@/components/navigation/Logo';

export function DesktopHeader() {
  return (
    <header className="hidden md:flex bg-white items-center justify-between container mx-auto px-4 py-4">
      <Logo />
      <nav className="flex items-center space-x-4">
        <Navigation />
      </nav>
    </header>
  );
}
