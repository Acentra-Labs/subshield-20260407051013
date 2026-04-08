import { useState, useMemo } from 'react';
import { Plus, Trash2, Pencil, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { useSearchParams } from 'react-router-dom';
import SearchFilterBar from '../components/SearchFilterBar';
import ComplianceTable from '../components/ComplianceTable';
import SubcontractorDrawer from '../components/SubcontractorDrawer';
import SubcontractorForm from '../components/SubcontractorForm';
import EmailPreviewModal from '../components/EmailPreviewModal';
import ConfirmDialog from '../components/ConfirmDialog';

export default function SubcontractorList() {
  const { isAdmin, user } = useAuth();
  const { subcontractors, getSubsForGc, deleteSubcontractor } = useData();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editSub, setEditSub] = useState(null);
  const [deleteSub, setDeleteSub] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);

  const detailId = searchParams.get('detail');
  const subs = isAdmin ? subcontractors : getSubsForGc(user?.gc_id);
  const selectedSub = detailId ? subs.find((s) => s.id === detailId) : null;

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

  const handleRowClick = (sub) => {
    setSearchParams({ detail: sub.id });
  };

  const handleCloseDrawer = () => {
    setSearchParams({});
  };

  const handleDelete = () => {
    if (deleteSub) {
      deleteSubcontractor(deleteSub.id);
      toast.success(`${deleteSub.company_name} deleted`);
      setDeleteSub(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subcontractors</h1>
          <p className="text-sm text-gray-500 mt-1">{subs.length} subcontractors total</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => { setEditSub(null); setFormOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Subcontractor
          </button>
        )}
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
          showGcColumn={isAdmin}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedSub && (
        <SubcontractorDrawer
          sub={selectedSub}
          onClose={handleCloseDrawer}
          onEdit={(sub) => {
            handleCloseDrawer();
            setEditSub(sub);
            setFormOpen(true);
          }}
          onSendEmail={(sub) => setEmailPreview({ sub, agent: sub.agent })}
        />
      )}

      <SubcontractorForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditSub(null); }}
        editSub={editSub}
      />

      <ConfirmDialog
        open={!!deleteSub}
        title="Delete Subcontractor"
        message={`Are you sure you want to delete ${deleteSub?.company_name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteSub(null)}
      />

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
