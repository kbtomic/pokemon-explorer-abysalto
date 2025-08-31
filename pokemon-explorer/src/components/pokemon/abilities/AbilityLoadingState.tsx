export function AbilityLoadingState() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
      <span className="text-sm text-gray-600">Loading ability details...</span>
    </div>
  );
}
