'use client';

import { Input } from '@/components/ui/Input';
import { X, Search, ChevronRight } from 'lucide-react';

interface MobileSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function MobileSearchInput({ value, onChange, onApply, onClear, onKeyDown }: MobileSearchInputProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search by name..."
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="pl-10 pr-20 border-red-300 focus:border-red-500 focus:ring-red-500 focus:ring-2 transition-colors duration-200"
        />
        {value && (
          <X
            className="h-5 w-5 absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-red-600 rounded-md p-1 cursor-pointer"
            onClick={onClear}
          />
        )}
      </div>
      <ChevronRight className="h-8 w-8 ml-4 text-red-600 cursor-pointer" onClick={onApply} />
    </div>
  );
}
