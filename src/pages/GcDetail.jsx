import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import KpiCard from '../components/KpiCard';
import SearchFilterBar from '../components/SearchFilterBar';
import ComplianceTable from '../components/ComplianceTable';
import SubcontractorDrawer from '../components/SubcontractorDrawer';
import SubcontractorForm from '../components/SubcontractorForm';
import { formatCurrency } from '../utils/formatters';

export default function GcDetail() {
  const { gcId } = useParams();
  const { generalContractors, getSubsForGc, getKpis } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);
  const [editSub, setEditSub] = useState(null);

  const gc = generalContractors.find((g) => g.id === gcId);
  const subs = getSubsForGc(gcId);
  const kpis = getKpis(subs);

  const filtered = useMemo(() => {
    let result = subs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.company_name.toLowerCase().includes(q) || s.contact_name.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.overallStatus === statusFilter);
    }
    return result;
  }, [subs, search, statusFilter]);

  if (!gc) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Contractor not found</p>
        <Link to="/general-contractors" className="text-shield-600 hover:text-shield-800 text-sm mt-2 inline-block">
          Back to contractors
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/general-contractors" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Contractors
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{gc.company_name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {gc.contact_name} &middot; {gc.phone} &middot; {gc.email}
          </p>
        </div>
        <div className="flex gap-3 text-xs text-gray-500">
          <span>GL Min: <strong className="text-gray-700">{formatCurrency(gc.gl_minimum_cents)}</strong></span>
          <span>WC Min: <strong className="text-gray-700">{formatCurrency(gc.wc_minimum_cents)}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <KpiCard title="Total Subs" count={kpis.total} color="blue" icon={Users} />
        <KpiCard title="Compliant" count={kpis.compliant} color="green" icon={CheckCircle} />
        <KpiCard title="Expiring" count={kpis.expiring} color="amber" icon={AlertTriangle} />
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
          onEdit={(sub) => {
            setSelectedSub(null);
            setEditSub(sub);
          }}
        />
      )}

      <SubcontractorForm
        open={!!editSub}
        onClose={() => setEditSub(null)}
        editSub={editSub}
        gcId={gcId}
      />
    </div>
  );
}
