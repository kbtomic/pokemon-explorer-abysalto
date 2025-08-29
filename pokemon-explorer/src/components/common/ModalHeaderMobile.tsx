'use client';

import { X } from 'lucide-react';

interface ModalHeaderMobileProps {
  title: string;
  onClose: () => void;
}

export function ModalHeaderMobile({ onClose, title }: ModalHeaderMobileProps) {
  return (
    <div className="flex items-center justify-between pb-4">
      <h2 className="text-xl font-bold text-red-600">{title}</h2>
      <X className="h-5 w-5 text-red-600 mr-1 cursor-pointer" onClick={onClose} />
    </div>
  );
}
