import { MobileHeader } from '@/components/navigation/MobileHeader';
import { DesktopHeader } from '@/components/navigation/DesktopHeader';

export function Header() {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
      <div className="border-b border-red-200" />
    </>
  );
}
