import { Modal } from '@/components/ui/Modal';
import { ModalHeaderMobile } from '@/components/common/ModalHeaderMobile';
import { SearchInput } from '@/components/filters/search/SearchInput';
import { useMobileSearch } from '@/lib/hooks/ui/useMobileSearch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { localSearchValue, setLocalSearchValue, handleApplyAndClose, handleClear, handleKeyDownAndClose } = useMobileSearch(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-none w-full h-full md:h-auto md:max-w-md bg-white">
      <div className="flex flex-col h-full md:h-auto">
        <ModalHeaderMobile onClose={onClose} title="Search" />

        <SearchInput
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
