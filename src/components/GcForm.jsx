import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { validateEmail, validatePhone, validateRequired, validateForm } from '../utils/validators';

export default function GcForm({ open, onClose, editGc }) {
  const { addGc, updateGc } = useData();
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    gl_minimum_cents: 100000000,
    wc_minimum_cents: 50000000,
    requires_additional_insured: false,
  });
  const dialogRef = useRef(null);

  // Reset form state when the modal opens or editGc changes (setState during render)
  // See https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevEditGc, setPrevEditGc] = useState(editGc);
  if (open && (prevOpen !== open || prevEditGc !== editGc)) {
    setPrevOpen(open);
    setPrevEditGc(editGc);
    if (editGc) {
      setForm({
        company_name: editGc.company_name || '',
        contact_name: editGc.contact_name || '',
        email: editGc.email || '',
        phone: editGc.phone || '',
        gl_minimum_cents: editGc.gl_minimum_cents || 100000000,
        wc_minimum_cents: editGc.wc_minimum_cents || 50000000,
        requires_additional_insured: editGc.requires_additional_insured || false,
      });
    } else {
      setForm({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        gl_minimum_cents: 100000000,
        wc_minimum_cents: 50000000,
        requires_additional_insured: false,
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
    if (editGc) {
      updateGc(editGc.id, form);
      toast.success(`${form.company_name} updated`);
    } else {
      addGc(form);
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
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="gc-form-title" tabIndex={-1} className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto outline-none">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex items-center justify-between rounded-t-xl">
          <h2 id="gc-form-title" className="text-lg font-bold text-gray-900">
            {editGc ? 'Edit General Contractor' : 'Add General Contractor'}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="gc-company_name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              id="gc-company_name"
              type="text"
              value={form.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
              required
            />
            {errors.company_name && <p className="text-xs text-red-600 mt-1">{errors.company_name}</p>}
          </div>

          <div>
            <label htmlFor="gc-contact_name" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
            <input
              id="gc-contact_name"
              type="text"
              value={form.contact_name}
              onChange={(e) => handleChange('contact_name', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
              required
            />
            {errors.contact_name && <p className="text-xs text-red-600 mt-1">{errors.contact_name}</p>}
          </div>

          <div>
            <label htmlFor="gc-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="gc-email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
              required
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="gc-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              id="gc-phone"
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="gc-gl_minimum_cents" className="block text-sm font-medium text-gray-700 mb-1">GL Minimum ($ per occurrence)</label>
            <input
              id="gc-gl_minimum_cents"
              type="number"
              value={form.gl_minimum_cents / 100}
              onChange={(e) => handleChange('gl_minimum_cents', Number(e.target.value) * 100)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="gc-wc_minimum_cents" className="block text-sm font-medium text-gray-700 mb-1">WC Minimum ($ employer liability)</label>
            <input
              id="gc-wc_minimum_cents"
              type="number"
              value={form.wc_minimum_cents / 100}
              onChange={(e) => handleChange('wc_minimum_cents', Number(e.target.value) * 100)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.requires_additional_insured} onChange={(e) => handleChange('requires_additional_insured', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-shield-600 focus:ring-shield-500" />
            <span className="text-sm text-gray-700">Require Additional Insured endorsement</span>
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
              {editGc ? 'Save Changes' : 'Add Contractor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
