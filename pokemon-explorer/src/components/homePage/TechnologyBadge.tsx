interface TechnologyBadgeProps {
  technology: string;
}

export default function TechnologyBadge({ technology }: TechnologyBadgeProps) {
  return (
    <span className="px-2 py-1 sm:px-3 bg-red-500/30 backdrop-blur-sm border border-red-400/30 rounded-full text-xs sm:text-sm">
      {technology}
    </span>
  );
}
