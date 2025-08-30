interface PaginationDotsProps {
  className?: string;
}

export function PaginationDots({ className = '' }: PaginationDotsProps) {
  return (
    <span className={`px-2 py-1 text-sm text-gray-500 ${className}`} aria-hidden="true">
      ...
    </span>
  );
}
