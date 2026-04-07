import { useState, useMemo, useRef } from 'react';
import { FileCheck, CheckCircle, XCircle, AlertTriangle, Clock, Printer, Building2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import StatusBadge from '../components/StatusBadge';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function DrawVerification() {
  const { isAdmin, user } = useAuth();
  const { generalContractors, getSubsForGc } = useData();
  const [selectedGcId, setSelectedGcId] = useState(isAdmin ? '' : user?.gc_id || '');
  const [selectedSubIds, setSelectedSubIds] = useState(new Set());
  const [showReport, setShowReport] = useState(false);
  const reportRef = useRef(null);

  const subs = selectedGcId ? getSubsForGc(selectedGcId) : [];
  const gc = generalContractors.find((g) => g.id === selectedGcId);

  const selectedSubs = useMemo(
    () => subs.filter((s) => selectedSubIds.has(s.id)),
    [subs, selectedSubIds]
  );

  const toggleSub = (subId) => {
    setSelectedSubIds((prev) => {
      const next = new Set(prev);
      if (next.has(subId)) next.delete(subId);
      else next.add(subId);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedSubIds.size === subs.length) {
      setSelectedSubIds(new Set());
    } else {
      setSelectedSubIds(new Set(subs.map((s) => s.id)));
    }
  };

  const allCompliant = selectedSubs.every((s) => s.overallStatus === 'compliant' || s.overallStatus === 'exempt');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Draw Verification</h1>
        <p className="text-sm text-gray-500 mt-1">Verify subcontractor compliance before issuing draw payments</p>
      </div>

      {/* GC Selector */}
      {isAdmin && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select General Contractor</label>
          <select
            value={selectedGcId}
            onChange={(e) => { setSelectedGcId(e.target.value); setSelectedSubIds(new Set()); setShowReport(false); }}
            className="w-full max-w-sm px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent bg-white"
          >
            <option value="">Choose a contractor...</option>
            {generalContractors.map((gc) => (
              <option key={gc.id} value={gc.id}>{gc.company_name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedGcId && !showReport && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">{subs.length} subcontractors for {gc?.company_name}</p>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {selectedSubIds.size === subs.length ? 'Deselect All' : 'Select All'}
              </button>
              <button
                onClick={() => setShowReport(true)}
                disabled={selectedSubIds.size === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5" />
                Generate Report
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {subs.map((sub) => (
              <label
                key={sub.id}
                className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedSubIds.has(sub.id)}
                  onChange={() => toggleSub(sub.id)}
                  className="w-4 h-4 rounded border-gray-300 text-shield-600 focus:ring-shield-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{sub.company_name}</p>
                  <p className="text-xs text-gray-500">{sub.contact_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={sub.glStatus} />
                  <StatusBadge status={sub.wcStatus} />
                </div>
              </label>
            ))}
            {subs.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-gray-500">No subcontractors for this contractor</p>
            )}
          </div>
        </>
      )}

      {/* Report */}
      {showReport && (
        <div>
          <div className="flex items-center justify-between mb-4 no-print">
            <button
              onClick={() => setShowReport(false)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              &larr; Back to selection
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-shield-500 rounded-lg hover:bg-shield-600 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
          </div>

          <div ref={reportRef} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Draw Compliance Verification Report</h2>
                <p className="text-sm text-gray-500 mt-0.5">{gc?.company_name} &middot; Generated {formatDate(new Date())}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${allCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {allCompliant ? 'ALL COMPLIANT' : 'NON-COMPLIANT SUBS'}
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              <p>{selectedSubs.length} subcontractor(s) included in this draw</p>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold text-gray-700">Subcontractor</th>
                  <th className="text-left py-2 font-semibold text-gray-700">GL Status</th>
                  <th className="text-left py-2 font-semibold text-gray-700">GL Exp.</th>
                  <th className="text-left py-2 font-semibold text-gray-700">WC Status</th>
                  <th className="text-left py-2 font-semibold text-gray-700">WC Exp.</th>
                  <th className="text-center py-2 font-semibold text-gray-700">Pass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {selectedSubs.map((sub) => {
                  const pass = sub.overallStatus === 'compliant' || sub.overallStatus === 'exempt';
                  return (
                    <tr key={sub.id}>
                      <td className="py-2.5 font-medium text-gray-900">{sub.company_name}</td>
                      <td className="py-2.5"><StatusBadge status={sub.glStatus} /></td>
                      <td className="py-2.5 text-gray-600">{formatDate(sub.glPolicy?.expiration_date)}</td>
                      <td className="py-2.5"><StatusBadge status={sub.wcStatus} /></td>
                      <td className="py-2.5 text-gray-600">{formatDate(sub.wcPolicy?.expiration_date)}</td>
                      <td className="py-2.5 text-center">
                        {pass ? (
                          <CheckCircle className="w-5 h-5 text-green-500 inline" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 inline" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-400">
              <p>This report was generated by SubShield on behalf of Brubaker Consulting LLC.</p>
              <p>Compliance status is based on insurance certificate expiration dates on file.</p>
            </div>
          </div>
        </div>
      )}

      {!selectedGcId && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Select a general contractor to begin draw verification</p>
        </div>
      )}
    </div>
  );
}
