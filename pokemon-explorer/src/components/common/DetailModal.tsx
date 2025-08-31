import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Modal } from '@/components/ui/Modal';
import { CloseButton } from '@/components/common/CloseButton';
import { ReactNode } from 'react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  loadingText?: string;
  theme: {
    gradientFrom: string;
    gradientTo: string;
    borderColor: string;
    loadingColor: string;
  };
  header: {
    imageUrl: string | null;
    imageAlt: string;
    title: string;
    subtitle?: string;
    icon?: ReactNode;
  };
  children: ReactNode;
}

export function DetailModal({
  isOpen,
  onClose,
  isLoading = false,
  loadingText = 'Loading details...',
  theme,
  header,
  children,
}: DetailModalProps) {
  if (!isOpen && !isLoading) return null;

  return (
    <Modal
      isOpen={isOpen || isLoading}
      onClose={onClose}
      title=""
      className={`bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} ${theme.borderColor} backdrop-blur-xl`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${theme.loadingColor}`}></div>
          <span className="ml-2 text-gray-600">{loadingText}</span>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className={`relative w-20 h-20 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} rounded-full p-3`}>
                <ImageWithFallback
                  src={header.imageUrl || ''}
                  alt={header.imageAlt}
                  width={56}
                  height={56}
                  className="object-contain drop-shadow-sm"
                  fallbackClassName="object-contain opacity-60"
                  fallbackWidth={34}
                  fallbackHeight={34}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white capitalize">{header.title}</h2>
                {header.subtitle && <p className="text-white">{header.subtitle}</p>}
                {header.icon && <div className="flex items-center space-x-2 mt-2">{header.icon}</div>}
              </div>
            </div>

            <CloseButton onClose={onClose} />
          </div>

          {children}
        </>
      )}
    </Modal>
  );
}
