import { Modal } from '@/components/ui/modal';
import { ModalHeaderMobile } from '@/components/common/ModalHeaderMobile';
import { MobileSearchInput } from '@/components/filters/mobile/MobileSearchModal/MobileSearchInput';
import { useMobileSearch } from '@/lib/hooks/useMobileSearch';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
  const { localSearchValue, setLocalSearchValue, handleApplyAndClose, handleClear, handleKeyDownAndClose } = useMobileSearch(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-none w-full h-full md:h-auto md:max-w-md bg-white">
      <div className="flex flex-col h-full md:h-auto">
        <ModalHeaderMobile onClose={onClose} title="Search" />

        <MobileSearchInput
          value={localSearchValue}
          onChange={setLocalSearchValue}
          onApply={handleApplyAndClose}
          onClear={handleClear}
          onKeyDown={handleKeyDownAndClose}
        />
      </div>
    </Modal>
  );
}
