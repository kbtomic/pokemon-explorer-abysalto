import { ReactNode } from 'react';

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function FilterDropdown({ isOpen, onClose, children, className = '' }: FilterDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={`absolute top-full left-0 mt-2 bg-white border border-red-200 rounded-lg shadow-lg z-50 min-w-[300px] ${className}`}>
        {children}
      </div>
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  );
}
