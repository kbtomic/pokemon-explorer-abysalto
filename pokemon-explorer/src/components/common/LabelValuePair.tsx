interface LabelValuePairProps {
  label: string;
  value: string;
  className?: string;
}

export function LabelValuePair({ label, value, className = '' }: LabelValuePairProps) {
  return (
    <div className={className}>
      <span className="text-xs text-gray-500">{label}:</span>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
}
