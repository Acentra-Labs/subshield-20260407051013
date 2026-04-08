import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { validateEmail, validatePhone, validateRequired, validateForm } from '../utils/validators';

export default function SubcontractorForm({ open, onClose, editSub, gcId }) {
  const { addSubcontractor, updateSubcontractor, generalContractors, insuranceAgents } = useData();
  const { toast } = useToast();
  const dialogRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    is_sole_proprietor: false,
    has_ghost_policy: false,
    gc_id: gcId || '',
    agent_id: '',
  });

  // Reset form state when the modal opens or editSub changes (setState during render)
  // See https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevEditSub, setPrevEditSub] = useState(editSub);
  if (open && (prevOpen !== open || prevEditSub !== editSub)) {
    setPrevOpen(open);
    setPrevEditSub(editSub);
    if (editSub) {
      setForm({
        company_name: editSub.company_name || '',
        contact_name: editSub.contact_name || '',
        email: editSub.email || '',
        phone: editSub.phone || '',
        is_sole_proprietor: editSub.is_sole_proprietor || false,
        has_ghost_policy: editSub.has_ghost_policy || false,
        gc_id: gcId || editSub.gcLinks?.[0]?.gc_id || '',
        agent_id: editSub.agent_id || '',
      });
    } else {
      setForm({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        is_sole_proprietor: false,
        has_ghost_policy: false,
        gc_id: gcId || '',
        agent_id: '',
      });
    }
    setErrors({});
  } else if (!open && prevOpen !== open) {
    setPrevOpen(open);
  }

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm({
      company_name: [() => validateRequired(form.company_name, 'Company name')],
      contact_name: [() => validateRequired(form.contact_name, 'Contact name')],
      email: [() => validateRequired(form.email, 'Email'), () => validateEmail(form.email)],
      phone: [() => form.phone ? validatePhone(form.phone) : null],
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (editSub) {
      updateSubcontractor(editSub.id, form);
      toast.success(`${form.company_name} updated`);
    } else {
      addSubcontractor(form, form.gc_id);
      toast.success(`${form.company_name} added`);
    }
    onClose();
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="sub-form-title" tabIndex={-1} className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto outline-none">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex items-center justify-between rounded-t-xl">
          <h2 id="sub-form-title" className="text-lg font-bold text-gray-900">
            {editSub ? 'Edit Subcontractor' : 'Add Subcontractor'}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="sub-company_name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              id="sub-company_name"
              type="text"
              value={form.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
              required
            />
            {errors.company_name && <p className="text-xs text-red-600 mt-1">{errors.company_name}</p>}
          </div>

          <div>
            <label htmlFor="sub-contact_name" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
            <input
              id="sub-contact_name"
              type="text"
              value={form.contact_name}
              onChange={(e) => handleChange('contact_name', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
              required
            />
            {errors.contact_name && <p className="text-xs text-red-600 mt-1">{errors.contact_name}</p>}
          </div>

          <div>
            <label htmlFor="sub-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="sub-email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
              required
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="sub-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              id="sub-phone"
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {!gcId && (
            <div>
              <label htmlFor="sub-gc_id" className="block text-sm font-medium text-gray-700 mb-1">General Contractor</label>
              <select
                id="sub-gc_id"
                value={form.gc_id}
                onChange={(e) => handleChange('gc_id', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent bg-white"
              >
                <option value="">Select a contractor...</option>
                {generalContractors.map((gc) => (
                  <option key={gc.id} value={gc.id}>{gc.company_name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="sub-agent_id" className="block text-sm font-medium text-gray-700 mb-1">Insurance Agent</label>
            <select id="sub-agent_id" value={form.agent_id} onChange={(e) => handleChange('agent_id', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent bg-white">
              <option value="">Select an agent...</option>
              {insuranceAgents.map((a) => (
                <option key={a.id} value={a.id}>{a.agent_name} — {a.agency_name || 'Independent'}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_sole_proprietor}
              onChange={(e) => handleChange('is_sole_proprietor', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-shield-600 focus:ring-shield-500"
            />
            <span className="text-sm text-gray-700">Sole proprietor (WC exempt)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.has_ghost_policy} onChange={(e) => handleChange('has_ghost_policy', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-shield-600 focus:ring-shield-500" />
            <span className="text-sm text-gray-700">Has ghost policy</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors"
            >
              {editSub ? 'Save Changes' : 'Add Subcontractor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
