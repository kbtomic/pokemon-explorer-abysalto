import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize, ChartType } from '@/lib/constants/enums';
import { capitalize } from '@/lib/utils/stringUtils';

interface ChartSelectorProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

export function ChartSelector({ chartType, onChartTypeChange }: ChartSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      {Object.values(ChartType).map(type => (
        <Button
          key={type}
          variant={chartType === type ? ButtonVariant.DEFAULT : ButtonVariant.OUTLINE}
          size={ButtonSize.SM}
          onClick={() => onChartTypeChange(type)}
          className={
            chartType === type ? 'bg-white text-red-600 hover:bg-red-50' : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
          }
        >
          {capitalize(type)}
        </Button>
      ))}
    </div>
  );
}
