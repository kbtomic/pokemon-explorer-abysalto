import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/formatting/cn';
import { Button } from './button';
import { ButtonVariant, ButtonSize } from '@/lib/constants/ui/buttons';
import { handleDocumentEscape } from '@/lib/utils/interaction/keyboard';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = ({ className, isOpen, onClose, title, children, ...props }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocus.current = document.activeElement as HTMLElement;

      // Add event listeners
      const handleEscapeKey = (e: KeyboardEvent) => handleDocumentEscape(e, onClose);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';

      // Focus first focusable element in modal
      setTimeout(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      }, 100);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'unset';

        // Restore previous focus
        if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
          previousFocus.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className={cn('relative w-full h-full max-w-2xl bg-background rounded-lg shadow-lg border flex flex-col', className)}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b shrink-0">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button variant={ButtonVariant.GHOST} size={ButtonSize.ICON} onClick={onClose} className="h-8 w-8">
              ×
            </Button>
          </div>
        )}
        <div className="p-6 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export { Modal };
