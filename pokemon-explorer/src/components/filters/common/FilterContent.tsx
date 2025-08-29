'use client';

import { GenericFilter } from '@/components/filters/common/GenericFilter';
import { StatsFilter } from '@/components/filters/stats/StatsFilter';
import { SortSelector } from '@/components/sort/SortSelector';
import { useTypeFilterConfig, useGenerationFilterConfig, useAbilitiesFilterConfig } from '@/lib/utils/filters/filters';

interface FilterContentProps {
  className?: string;
}

export function FilterContent({ className = '' }: FilterContentProps) {
  const typeFilterConfig = useTypeFilterConfig();
  const generationFilterConfig = useGenerationFilterConfig();
  const abilitiesFilterConfig = useAbilitiesFilterConfig();

  return (
    <div className={className}>
      <GenericFilter {...typeFilterConfig} />
      <GenericFilter {...generationFilterConfig} />
      <StatsFilter />
      <GenericFilter {...abilitiesFilterConfig} />
      <SortSelector />
    </div>
  );
}
