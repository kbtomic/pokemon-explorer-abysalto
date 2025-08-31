import { StatName } from '@/lib/constants/enums';
import { Pokemon } from '@/types/pokemon/core';
import { StatConfig, SummaryItem, InfoCardConfig } from '@/types/ui/stats';

// Re-export SummaryItem for backward compatibility
export type { SummaryItem };

// ============================================================================
// STAT CONFIGURATION
// ============================================================================

export const STATS_CONFIG: StatConfig[] = [
  { name: StatName.HP, color: 'text-red-400', barColor: 'bg-red-500' },
  { name: StatName.ATTACK, color: 'text-orange-400', barColor: 'bg-orange-500' },
  { name: StatName.DEFENSE, color: 'text-blue-400', barColor: 'bg-blue-500' },
  { name: StatName.SPECIAL_ATTACK, color: 'text-purple-400', barColor: 'bg-purple-500' },
  { name: StatName.SPECIAL_DEFENSE, color: 'text-green-400', barColor: 'bg-green-500' },
  { name: StatName.SPEED, color: 'text-yellow-400', barColor: 'bg-yellow-500' },
];

export const MAX_STAT_VALUE = 255;

// ============================================================================
// SUMMARY STATS CONFIGURATION
// ============================================================================

export const SUMMARY_ITEMS_CONFIG: Omit<SummaryItem, 'value'>[] = [
  { label: 'Total Stats', color: 'text-white' },
  { label: 'Highest Stat', color: 'text-green-400' },
  { label: 'Lowest Stat', color: 'text-orange-400' },
  { label: 'Average', color: 'text-purple-400' },
];

// ============================================================================
// POKEMON INFO CARDS CONFIGURATION
// ============================================================================

export const TOTAL_STATS_LABEL = 'Total Stats';

export const POKEMON_INFO_CARDS_CONFIG: InfoCardConfig[] = [
  {
    label: 'Height',
    valueKey: 'height',
    formatter: (height: number) => (height ? `${(height / 10).toFixed(1)} m` : 'N/A'),
  },
  {
    label: 'Weight',
    valueKey: 'weight',
    formatter: (weight: number) => (weight ? `${(weight / 10).toFixed(1)} kg` : 'N/A'),
  },
  {
    label: 'Experience',
    valueKey: 'base_experience',
    formatter: (exp: number) => (exp ? exp.toString() : 'N/A'),
  },
  {
    label: TOTAL_STATS_LABEL,
    valueKey: 'stats' as keyof Pokemon, // Will be calculated separately
    formatter: (totalStats: number) => totalStats.toString(),
  },
];

// ============================================================================
// CHART CONFIGURATION
// ============================================================================

// Chart dimensions and positioning
export const CHART_CENTER = 100;
export const CHART_RADIUS = 80;
export const LABEL_RADIUS = 95;
export const CHART_HEIGHT = 64;

// Radar chart configuration
export const RADAR_ANGLES = 6; // Number of stats
export const RADAR_ANGLE_OFFSET = -90; // Start angle in degrees
export const RADAR_ANGLE_STEP = 60; // Angle between each stat

// Background circles for radar chart
export const BACKGROUND_CIRCLES = [80, 60, 40, 20];

// Stat value thresholds for color coding
export const STAT_THRESHOLDS = {
  EXCELLENT: 100,
  GOOD: 80,
  AVERAGE: 60,
} as const;

// Radial chart configuration
export const RADIAL_OUTER_RADIUS = 32;
export const RADIAL_INNER_RADIUS = 28;
export const RADIAL_STROKE_WIDTH = 4;
export const RADIAL_COMPARISON_STROKE_WIDTH = 2;

// Bar chart configuration
export const BAR_CHART_HEIGHT = 2; // Height of main bar in rem units
export const BAR_CHART_COMPARISON_HEIGHT = 1; // Height of comparison bar in rem units
export const BAR_CHART_SPACING = 4; // Space between bars in rem units
export const BAR_CHART_ICON_SIZE = 4; // Icon size in rem units
export const BAR_CHART_LABEL_WIDTH = 24; // Width for stat labels in rem units
export const BAR_CHART_VALUE_WIDTH = 12; // Width for stat values in rem units
export const BAR_CHART_INDICATOR_WIDTH = 4; // Width for comparison indicators in rem units
