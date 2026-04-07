import { X, Send, Mail } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function EmailPreviewModal({ open, onClose, sub, agent }) {
  const { toast } = useToast();

  if (!open || !sub || !agent) return null;

  const gcName = sub.gcs?.[0]?.company_name || 'N/A';

  const handleSend = () => {
    toast.success(`Verification request sent to ${agent.agent_name} at ${agent.email}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-shield-500" />
            <h2 className="text-lg font-bold text-gray-900">Email Preview</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-500 w-12">To:</span>
              <span className="text-gray-900">{agent.agent_name} &lt;{agent.email}&gt;</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-500 w-12">Subject:</span>
              <span className="text-gray-900">Insurance Verification Required — {sub.company_name}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
            <div className="prose prose-sm max-w-none">
              <p>Dear {agent.agent_name},</p>
              <p>
                We are writing to request verification of insurance coverage for <strong>{sub.company_name}</strong>,
                a subcontractor working with <strong>{gcName}</strong>.
              </p>
              <p>Please verify the following coverage is current and active:</p>
              <ul>
                <li>General Liability: Minimum $1,000,000 per occurrence / $2,000,000 aggregate</li>
                <li>Workers&apos; Compensation: Minimum $500,000 per accident</li>
              </ul>
              <p>You can respond by clicking the secure link below:</p>
              <p>
                <span className="inline-block px-4 py-2 bg-shield-500 text-white rounded-lg text-sm font-medium">
                  Verify Coverage &rarr;
                </span>
              </p>
              <p className="text-gray-500 text-xs">This link expires in 7 days.</p>
              <p>
                If you have questions, contact Dawn Brubaker at dawn@brubakerconsulting.com.
              </p>
              <p>
                Thank you,<br />
                Dawn Brubaker<br />
                Brubaker Consulting LLC
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSend} className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors">
            <Send className="w-4 h-4" />
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
