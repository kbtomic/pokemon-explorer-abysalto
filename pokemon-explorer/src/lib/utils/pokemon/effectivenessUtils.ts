export const getMultiplierColor = (multiplier: number) => {
  switch (multiplier) {
    case 0:
      return 'bg-gray-100 text-gray-600';
    case 0.25:
      return 'bg-green-100 text-green-800';
    case 0.5:
      return 'bg-lime-100 text-lime-800 ';
    case 1:
      return 'bg-gray-100 text-gray-600';
    case 2:
      return 'bg-red-100 text-red-800 ';
    case 4:
      return 'bg-red-200 text-red-900';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const getMultiplierText = (multiplier: number) => {
  if (multiplier === 0) return 'No Effect';
  if (multiplier === 0.25) return '¼×';
  if (multiplier === 0.5) return '½×';
  if (multiplier === 1) return '1×';
  if (multiplier === 2) return '2×';
  if (multiplier === 4) return '4×';
  return `${multiplier}×`;
};
