import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize } from '@/lib/constants/enums';

interface CloseButtonProps {
  onClose: () => void;
  className?: string;
}

export function CloseButton({ onClose, className = '' }: CloseButtonProps) {
  return (
    <Button
      variant={ButtonVariant.GHOST}
      size={ButtonSize.ICON}
      onClick={onClose}
      className={`h-10 w-10 text-white hover:bg-white/20 text-xl font-bold ${className}`}
    >
      ×
    </Button>
  );
}
