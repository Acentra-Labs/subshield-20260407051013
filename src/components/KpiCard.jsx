const colorMap = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  gray: 'bg-gray-50 text-gray-700 border-gray-200',
};

const iconColorMap = {
  blue: 'text-blue-500',
  green: 'text-green-500',
  amber: 'text-amber-500',
  red: 'text-red-500',
  gray: 'text-gray-400',
};

export default function KpiCard({ title, count, color = 'blue', icon: Icon }) {
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color] || colorMap.blue}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wider opacity-70">{title}</span>
        {Icon && <Icon className={`w-4 h-4 ${iconColorMap[color] || iconColorMap.blue}`} />}
      </div>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
