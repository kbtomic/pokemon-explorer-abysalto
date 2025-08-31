import { Modal } from '@/components/ui/modal';
import { FilterContent } from '@/components/filters/common/FilterContent';
import { ClearAllButton } from '@/components/filters/common/ClearAllButton';
import { ModalHeaderMobile } from '@/components/common/ModalHeaderMobile';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilters({ isOpen, onClose }: MobileFiltersProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-none w-full h-full md:h-auto md:max-w-md bg-white">
      <div className="flex flex-col h-full md:h-auto">
        <ModalHeaderMobile onClose={onClose} title="Filters" />

        <div className="flex-1 overflow-y-auto space-y-6 items-center">
          <FilterContent className="space-y-6" />
        </div>

        <div className="p-4">
          <ClearAllButton className="w-full" alwaysVisible />
        </div>
      </div>
    </Modal>
  );
}
