import { ContentSection } from '@/components/common/ContentSection';
import { BerryCharacteristicItem } from '@/components/berries/BerryCharacteristicItem';

interface BerryDataSectionProps {
  title: string;
  data: Array<{
    label: string;
    value: string | number;
    formatValue?: (value: string | number) => string;
  }>;
}

export function BerryDataSection({ title, data }: BerryDataSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <ContentSection title={title}>
      <div className="space-y-3">
        {data.map((item, index) => (
          <BerryCharacteristicItem key={index} label={item.label} value={item.value} formatValue={item.formatValue} />
        ))}
      </div>
    </ContentSection>
  );
}
