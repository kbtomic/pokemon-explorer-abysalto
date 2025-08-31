interface InfoCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function InfoCard({ label, value, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-gray-50 p-3 rounded-lg border border-gray-200 ${className}`}>
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
