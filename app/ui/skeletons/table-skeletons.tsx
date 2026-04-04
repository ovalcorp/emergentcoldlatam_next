'use client';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 2 }: TableSkeletonProps) {
  return (
    <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="bg-gray-200">
              {[...Array(columns)].map((_, i) => (
                <th key={i} className="px-5 py-3">
                  <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex} className="px-5 py-4">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
