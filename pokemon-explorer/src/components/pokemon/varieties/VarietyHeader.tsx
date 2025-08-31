import { VarietyLabel } from '@/lib/constants/enums';

interface VarietyHeaderProps {
  varietyCount: number;
  className?: string;
}

export function VarietyHeader({ varietyCount, className = '' }: VarietyHeaderProps) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${className}`}>
      {VarietyLabel.FORMS_VARIETIES} ({varietyCount})
    </h3>
  );
}
