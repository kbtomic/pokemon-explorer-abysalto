import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize } from '@/lib/constants/enums';

interface PaginationNavigationButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
}

export function PaginationNavigationButton({ icon: Icon, onClick, disabled, ariaLabel }: PaginationNavigationButtonProps) {
  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      size={ButtonSize.SM}
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 p-0"
      aria-label={ariaLabel}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
