import { useEffect, useRef } from 'react';
import { X, Pencil, Phone, Mail, Building2, Send } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function SubcontractorDrawer({ sub, onClose, onEdit, onSendEmail }) {
  const drawerRef = useRef(null);
  useEffect(() => {
    if (!sub) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    drawerRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sub, onClose]);

  if (!sub) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Subcontractor details" tabIndex={-1} className="relative w-full max-w-md bg-white shadow-xl overflow-y-auto outline-none">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 truncate">{sub.company_name}</h2>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(sub)}
                className="p-1.5 text-gray-400 hover:text-shield-600 hover:bg-shield-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            {onSendEmail && sub.agent && (
              <button
                onClick={() => onSendEmail(sub)}
                className="p-1.5 text-gray-400 hover:text-shield-600 hover:bg-shield-50 rounded-lg transition-colors"
                title="Send verification request"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact</h3>
            <p className="text-sm font-medium text-gray-900">{sub.contact_name}</p>
            <div className="mt-2 space-y-1.5">
              {sub.phone && (
                <a href={`tel:${sub.phone}`} className="flex items-center gap-2 text-sm text-shield-600 hover:text-shield-800">
                  <Phone className="w-4 h-4" /> {sub.phone}
                </a>
              )}
              {sub.email && (
                <a href={`mailto:${sub.email}`} className="flex items-center gap-2 text-sm text-shield-600 hover:text-shield-800">
                  <Mail className="w-4 h-4" /> {sub.email}
                </a>
              )}
            </div>
          </div>

          {/* Overall Status */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Compliance Status</h3>
            <StatusBadge status={sub.overallStatus} />
          </div>

          {/* Flags */}
          {(sub.is_sole_proprietor || sub.has_ghost_policy) && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Flags</h3>
              <div className="flex flex-wrap gap-2">
                {sub.is_sole_proprietor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
                    Sole Proprietor
                  </span>
                )}
                {sub.has_ghost_policy && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                    Ghost Policy
                  </span>
                )}
              </div>
            </div>
          )}

          {/* GL Policy */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">General Liability</h3>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <StatusBadge status={sub.glStatus} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Policy #</span>
                <span className="text-gray-900 font-medium">{sub.glPolicy?.policy_number || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Carrier</span>
                <span className="text-gray-900">{sub.glPolicy?.carrier_name || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expiration</span>
                <span className="text-gray-900">{formatDate(sub.glPolicy?.expiration_date)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Per Occurrence</span>
                <span className="text-gray-900">{formatCurrency(sub.glPolicy?.each_occurrence_cents)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Aggregate</span>
                <span className="text-gray-900">{formatCurrency(sub.glPolicy?.aggregate_limit_cents)}</span>
              </div>
            </div>
          </div>

          {/* WC Policy */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Workers&apos; Compensation</h3>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <StatusBadge status={sub.wcStatus} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Policy #</span>
                <span className="text-gray-900 font-medium">{sub.wcPolicy?.policy_number || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Carrier</span>
                <span className="text-gray-900">{sub.wcPolicy?.carrier_name || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expiration</span>
                <span className="text-gray-900">{formatDate(sub.wcPolicy?.expiration_date)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Employer Liability</span>
                <span className="text-gray-900">{formatCurrency(sub.wcPolicy?.employer_liability_cents)}</span>
              </div>
            </div>
          </div>

          {/* Agent */}
          {sub.agent && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Insurance Agent</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">{sub.agent.agent_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub.agent.agency_name}</p>
                <div className="mt-2 space-y-1">
                  <a href={`tel:${sub.agent.phone}`} className="flex items-center gap-2 text-xs text-shield-600">
                    <Phone className="w-3 h-3" /> {sub.agent.phone}
                  </a>
                  <a href={`mailto:${sub.agent.email}`} className="flex items-center gap-2 text-xs text-shield-600">
                    <Mail className="w-3 h-3" /> {sub.agent.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* GCs */}
          {sub.gcs && sub.gcs.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">General Contractors</h3>
              <div className="space-y-2">
                {sub.gcs.map((gc) => {
                  const link = sub.gcLinks?.find((gl) => gl.gc_id === gc.id);
                  return (
                    <div key={gc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{gc.company_name}</span>
                      </div>
                      {link?.additional_insured && (
                        <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">Add'l Insured</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
