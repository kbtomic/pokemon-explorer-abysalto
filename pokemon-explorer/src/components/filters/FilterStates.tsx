import { Loader2 } from 'lucide-react';

interface FilterStatesProps {
  isLoading: boolean;
  error: Error | null;
  title: string;
}

export function FilterStates({ isLoading, error, title }: FilterStatesProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-red-600" />
        <span className="ml-2 text-gray-600">Loading {title.toLowerCase()}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">Failed to load {title.toLowerCase()}</div>
        <div className="text-sm text-gray-600">{error.message}</div>
      </div>
    );
  }

  return null;
}
