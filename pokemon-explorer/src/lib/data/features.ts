import { Filter, BarChart3, Search, Leaf, Package, MapPin } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export const features: Feature[] = [
  {
    icon: Filter,
    title: 'Advanced Filtering',
    description: "Filter Pokemon by type, generation, stats, abilities, and more. Find exactly what you're looking for.",
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Detailed Statistics',
    description: 'View comprehensive stats, abilities, evolution chains, and detailed information for every Pokemon.',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Search across Pokemon, berries, items, and locations with intelligent filtering and sorting.',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: Leaf,
    title: 'Berry Database',
    description: 'Explore the complete berry database with growth times, flavors, and effects for every berry.',
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    icon: Package,
    title: 'Item Collection',
    description: 'Browse the complete item database with categories, effects, and detailed information.',
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    icon: MapPin,
    title: 'Location Guide',
    description: 'Discover Pokemon locations and encounters across all regions with detailed area information.',
    iconBgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
];
