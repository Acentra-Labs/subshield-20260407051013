import { useState, useMemo } from 'react';
import { Users, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import KpiCard from '../components/KpiCard';
import SearchFilterBar from '../components/SearchFilterBar';
import ComplianceTable from '../components/ComplianceTable';
import SubcontractorDrawer from '../components/SubcontractorDrawer';
import SubcontractorForm from '../components/SubcontractorForm';
import EmailPreviewModal from '../components/EmailPreviewModal';

export default function ConsultantDashboard() {
  const { subcontractors, getKpis } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);
  const [editSub, setEditSub] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);

  const kpis = getKpis(subcontractors);

  const filtered = useMemo(() => {
    let result = subcontractors;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.company_name.toLowerCase().includes(q) ||
          s.contact_name.toLowerCase().includes(q) ||
          s.agent?.agent_name?.toLowerCase().includes(q) ||
          s.gcs?.some((g) => g.company_name.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.overallStatus === statusFilter);
    }
    return result;
  }, [subcontractors, search, statusFilter]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">All subcontractors across all general contractors</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <KpiCard title="Total Subs" count={kpis.total} color="blue" icon={Users} />
        <KpiCard title="Compliant" count={kpis.compliant} color="green" icon={CheckCircle} />
        <KpiCard title="Expiring Soon" count={kpis.expiring} color="amber" icon={AlertTriangle} />
        <KpiCard title="Expired" count={kpis.expired} color="red" icon={XCircle} />
        <KpiCard title="Pending" count={kpis.pending} color="gray" icon={Clock} />
      </div>

      {/* Search & Filter */}
      <div className="mb-4">
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <ComplianceTable
          data={filtered}
          showGcColumn={true}
          onRowClick={(sub) => setSelectedSub(sub)}
        />
      </div>

      {/* Drawer */}
      {selectedSub && (
        <SubcontractorDrawer
          sub={selectedSub}
          onClose={() => setSelectedSub(null)}
          onEdit={(sub) => {
            setSelectedSub(null);
            setEditSub(sub);
          }}
          onSendEmail={(sub) => setEmailPreview({ sub, agent: sub.agent })}
        />
      )}

      {/* Edit Form */}
      <SubcontractorForm
        open={!!editSub}
        onClose={() => setEditSub(null)}
        editSub={editSub}
      />

      {/* Email Preview */}
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
