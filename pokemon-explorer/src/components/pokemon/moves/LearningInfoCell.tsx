interface LearningInfo {
  method: string;
  level: number | null;
}

interface LearningInfoCellProps {
  learningInfo: LearningInfo;
  className?: string;
}

export function LearningInfoCell({ learningInfo, className = '' }: LearningInfoCellProps) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      <div className="flex flex-col">
        <span className="text-sm text-white">{learningInfo.method}</span>
        {learningInfo.level && <span className="text-xs text-white">Level {learningInfo.level}</span>}
      </div>
    </td>
  );
}
