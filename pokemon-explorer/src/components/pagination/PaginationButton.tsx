import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize } from '@/lib/constants/enums';

interface PaginationButtonProps {
  page: number;
  isActive: boolean;
}

export function PaginationButton({ page, isActive }: PaginationButtonProps) {
  return (
    <Button
      variant={isActive ? ButtonVariant.DEFAULT : ButtonVariant.OUTLINE}
      size={ButtonSize.SM}
      className="h-12 w-12 p-0 text-base sm:h-10 sm:w-10 sm:text-sm md:h-8 md:w-8 md:text-sm"
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </Button>
  );
}
