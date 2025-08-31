export function MoveRowSkeleton() {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded" />
      </td>
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-16" />
      </td>
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-12" />
      </td>
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-8" />
      </td>
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-20" />
      </td>
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-16" />
      </td>
      <td className="px-4 py-3">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-16" />
      </td>
    </tr>
  );
}
