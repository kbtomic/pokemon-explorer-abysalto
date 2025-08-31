import { MapPin, Trees, Mountain, Waves, Building } from 'lucide-react';
import { getLocationIcon } from '@/lib/utils/locations/locationDataUtils';
import { LocationIconType } from '@/lib/constants/locations/icons';

interface LocationIconProps {
  locationName: string;
  size?: number;
  className?: string;
}

export function LocationIcon({ locationName, size = 24, className = '' }: LocationIconProps) {
  const iconType = getLocationIcon(locationName);

  const iconProps = {
    width: size,
    height: size,
    className: `text-green-600 ${className}`,
  };

  switch (iconType) {
    case LocationIconType.TREES:
      return <Trees {...iconProps} />;
    case LocationIconType.MOUNTAIN:
      return <Mountain {...iconProps} />;
    case LocationIconType.WAVES:
      return <Waves {...iconProps} />;
    case LocationIconType.BUILDING:
      return <Building {...iconProps} />;
    case LocationIconType.ROAD:
      return <MapPin {...iconProps} />;
    case LocationIconType.ISLAND:
      return <MapPin {...iconProps} />;
    case LocationIconType.CAVE:
      return <Mountain {...iconProps} />;
    default:
      return <MapPin {...iconProps} />;
  }
}
