import { Modal } from '@/components/ui/Modal';
import { ModalHeaderMobile } from '@/components/common/ModalHeaderMobile';
import { Navigation } from '@/components/navigation/Navigation';

interface MobileNavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigationMenu({ isOpen, onClose }: MobileNavigationMenuProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-none w-full h-full md:h-auto md:max-w-sm bg-white">
      <div className="flex flex-col h-full md:h-auto">
        <ModalHeaderMobile onClose={onClose} title="Navigation" />

        <nav className="flex flex-col gap-3s mt-4 items-start">
          <Navigation />
        </nav>
      </div>
    </Modal>
  );
}
