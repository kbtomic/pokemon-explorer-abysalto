import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { accessibilityUtils } from '@/lib/utils/accessibility';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = ({ className, isOpen, onClose, title, children, ...props }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Store current focus
      previousFocus.current = document.activeElement as HTMLElement;

      // Add event listeners
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (modalRef.current) {
          accessibilityUtils.focusManagement.trapFocus(modalRef.current, e);
        }
      };

      document.addEventListener('keydown', handleTab);

      // Focus first focusable element in modal
      setTimeout(() => {
        if (modalRef.current) {
          accessibilityUtils.focusManagement.focusFirstElement(modalRef.current);
        }
      }, 100);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
        document.body.style.overflow = 'unset';

        // Restore previous focus
        if (previousFocus.current) {
          accessibilityUtils.focusManagement.restoreFocus(previousFocus.current);
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        className={cn('relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-lg border', className)}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b">
            <h2 id="pokemon-modal-title" className="text-xl font-semibold">
              {title}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 focus-visible" aria-label="Close modal">
              ×
            </Button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export { Modal };
