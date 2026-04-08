import { CheckCircle, AlertTriangle, XCircle, Clock, ShieldCheck } from 'lucide-react';
import { STATUS_CONFIG } from '../utils/compliance';

const ICONS = {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ShieldCheck,
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = ICONS[config.icon] || Clock;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
