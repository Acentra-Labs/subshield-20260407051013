import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/formatters';

export default function ComplianceTable({ data, showGcColumn = false, onRowClick }) {
  if (data.length === 0) {
    return (
      <div className="px-4 py-12 text-center text-sm text-gray-500">
        No subcontractors found
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subcontractor</th>
              {showGcColumn && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">GC</th>
              )}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">GL Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">GL Exp.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">WC Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">WC Exp.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((sub) => (
              <tr
                key={sub.id}
                onClick={() => onRowClick?.(sub)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{sub.company_name}</p>
                  <p className="text-xs text-gray-500">{sub.contact_name}</p>
                </td>
                {showGcColumn && (
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {sub.gcs?.map((g) => g.company_name).join(', ') || '—'}
                  </td>
                )}
                <td className="px-4 py-3"><StatusBadge status={sub.glStatus} /></td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(sub.glPolicy?.expiration_date)}</td>
                <td className="px-4 py-3"><StatusBadge status={sub.wcStatus} /></td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(sub.wcPolicy?.expiration_date)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{sub.agent?.agent_name || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {data.map((sub) => (
          <div
            key={sub.id}
            onClick={() => onRowClick?.(sub)}
            className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{sub.company_name}</p>
                <p className="text-xs text-gray-500">{sub.contact_name}</p>
              </div>
              <StatusBadge status={sub.overallStatus} />
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs text-gray-500">GL: {formatDate(sub.glPolicy?.expiration_date)}</span>
              <span className="text-xs text-gray-500">WC: {formatDate(sub.wcPolicy?.expiration_date)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
