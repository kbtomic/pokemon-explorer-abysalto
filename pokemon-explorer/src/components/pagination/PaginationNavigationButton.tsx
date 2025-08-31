import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ButtonVariant, ButtonSize } from '@/lib/constants/ui/buttons';

interface PaginationNavigationButtonProps {
  icon: LucideIcon;
  disabled: boolean;
  ariaLabel: string;
}

export function PaginationNavigationButton({ icon: Icon, disabled, ariaLabel }: PaginationNavigationButtonProps) {
  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      size={ButtonSize.SM}
      disabled={disabled}
      className="h-12 w-12 p-0 sm:h-10 sm:w-10 md:h-8 md:w-8"
      aria-label={ariaLabel}
    >
      <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
    </Button>
  );
}
