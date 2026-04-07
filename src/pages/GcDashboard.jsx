import { useState, useMemo } from 'react';
import { Users, CheckCircle, AlertTriangle, XCircle, Clock, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import KpiCard from '../components/KpiCard';
import SearchFilterBar from '../components/SearchFilterBar';
import ComplianceTable from '../components/ComplianceTable';
import SubcontractorDrawer from '../components/SubcontractorDrawer';
import EmailPreviewModal from '../components/EmailPreviewModal';

export default function GcDashboard() {
  const { user } = useAuth();
  const { getSubsForGc, getKpis, generalContractors } = useData();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);

  const gc = generalContractors.find((g) => g.id === user?.gc_id);
  const subs = getSubsForGc(user?.gc_id);
  const kpis = getKpis(subs);

  const filtered = useMemo(() => {
    let result = subs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.company_name.toLowerCase().includes(q) ||
          s.contact_name.toLowerCase().includes(q) ||
          s.agent?.agent_name?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.overallStatus === statusFilter);
    }
    return result;
  }, [subs, search, statusFilter]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{gc?.company_name || 'Dashboard'}</h1>
        <p className="text-sm text-gray-500 mt-1">Your subcontractor insurance compliance overview</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <KpiCard title="Total Subs" count={kpis.total} color="blue" icon={Users} />
        <KpiCard title="Compliant" count={kpis.compliant} color="green" icon={CheckCircle} />
        <KpiCard title="Expiring Soon" count={kpis.expiring} color="amber" icon={AlertTriangle} />
        <KpiCard title="Expired" count={kpis.expired} color="red" icon={XCircle} />
        <KpiCard title="Pending" count={kpis.pending} color="gray" icon={Clock} />
      </div>

      <div className="mb-4">
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <ComplianceTable
          data={filtered}
          showGcColumn={false}
          onRowClick={(sub) => setSelectedSub(sub)}
        />
      </div>

      {selectedSub && (
        <SubcontractorDrawer
          sub={selectedSub}
          onClose={() => setSelectedSub(null)}
          onEdit={() => {
            toast.info('Contact your administrator to edit subcontractor details.');
          }}
        />
      )}

      {emailPreview && (
        <EmailPreviewModal
          open={!!emailPreview}
          onClose={() => setEmailPreview(null)}
          sub={emailPreview.sub}
          agent={emailPreview.agent}
        />
      )}
    </div>
  );
}
