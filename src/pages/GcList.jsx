import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import GcForm from '../components/GcForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatCurrency } from '../utils/formatters';

export default function GcList() {
  const { generalContractors, deleteGc } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [editGc, setEditGc] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = () => {
    if (deleteTarget) {
      deleteGc(deleteTarget.id);
      toast.success(`${deleteTarget.company_name} deleted`);
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General Contractors</h1>
          <p className="text-sm text-gray-500 mt-1">{generalContractors.length} contractors</p>
        </div>
        <button
          onClick={() => { setEditGc(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Contractor
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subs</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Compliance</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">GL Min</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">WC Min</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {generalContractors.map((gc) => (
              <tr
                key={gc.id}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/general-contractors/${gc.id}`)}
              >
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{gc.company_name}</p>
                  <p className="text-xs text-gray-500">{gc.email}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-900">{gc.contact_name}</p>
                  <p className="text-xs text-gray-500">{gc.phone}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{gc.subCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${gc.compliancePercent >= 80 ? 'bg-green-500' : gc.compliancePercent >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${gc.compliancePercent}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{gc.compliancePercent}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(gc.gl_minimum_cents)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(gc.wc_minimum_cents)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditGc(gc); setFormOpen(true); }}
                      className="p-1.5 text-gray-400 hover:text-shield-600 hover:bg-shield-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget(gc); }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-1" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {generalContractors.map((gc) => (
          <div
            key={gc.id}
            onClick={() => navigate(`/general-contractors/${gc.id}`)}
            className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-shield-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{gc.company_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{gc.contact_name} &middot; {gc.phone}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setEditGc(gc); setFormOpen(true); }}
                  className="p-1.5 text-gray-400 hover:text-shield-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget(gc); }}
                  className="p-1.5 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-gray-500">{gc.subCount} subs</span>
              <div className="flex items-center gap-1.5 flex-1">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${gc.compliancePercent >= 80 ? 'bg-green-500' : gc.compliancePercent >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${gc.compliancePercent}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{gc.compliancePercent}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GcForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditGc(null); }}
        editGc={editGc}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete General Contractor"
        message={`Are you sure you want to delete ${deleteTarget?.company_name}? All subcontractor associations will be removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
