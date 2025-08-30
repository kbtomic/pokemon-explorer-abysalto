import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize } from '@/lib/constants/enums';

interface PaginationButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

export function PaginationButton({ page, isActive, onClick }: PaginationButtonProps) {
  return (
    <Button
      variant={isActive ? ButtonVariant.DEFAULT : ButtonVariant.OUTLINE}
      size={ButtonSize.SM}
      onClick={onClick}
      className="h-8 w-8 p-0"
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </Button>
  );
}
