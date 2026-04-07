import { Search, X } from 'lucide-react';

const STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'compliant', label: 'Compliant', color: 'bg-green-100 text-green-800 border-green-300' },
  { key: 'expiring_soon', label: 'Expiring', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { key: 'expired', label: 'Expired', color: 'bg-red-100 text-red-800 border-red-300' },
  { key: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-700 border-gray-300' },
];

export default function SearchFilterBar({ search, onSearchChange, statusFilter, onStatusFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative flex-1 w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search subcontractors..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent bg-white"
        />
        {search && (
          <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onStatusFilterChange(statusFilter === f.key ? 'all' : f.key)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
              statusFilter === f.key
                ? f.color || 'bg-shield-500 text-white border-shield-500'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
