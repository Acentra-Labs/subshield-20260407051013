import { useState } from 'react';
import { Phone, Mail, Users, X, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import StatusBadge from '../components/StatusBadge';

export default function AgentList() {
  const { insuranceAgents } = useData();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = search
    ? insuranceAgents.filter(
        (a) =>
          a.agent_name.toLowerCase().includes(search.toLowerCase()) ||
          a.agency_name?.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase())
      )
    : insuranceAgents;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Insurance Agents</h1>
        <p className="text-sm text-gray-500 mt-1">{insuranceAgents.length} agents managing subcontractor coverage</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-shield-400 focus:border-transparent bg-white"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agency</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subs Served</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((agent) => (
              <tr
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{agent.agent_name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{agent.agency_name || '—'}</td>
                <td className="px-4 py-3">
                  <a href={`tel:${agent.phone}`} className="text-sm text-shield-600 hover:text-shield-800" onClick={(e) => e.stopPropagation()}>
                    {agent.phone}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <a href={`mailto:${agent.email}`} className="text-sm text-shield-600 hover:text-shield-800" onClick={(e) => e.stopPropagation()}>
                    {agent.email}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    <Users className="w-3 h-3" /> {agent.subCount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">No agents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-shield-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{agent.agent_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{agent.agency_name}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                <Users className="w-3 h-3" /> {agent.subCount}
              </span>
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <a href={`tel:${agent.phone}`} className="text-shield-600" onClick={(e) => e.stopPropagation()}>{agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="text-shield-600 truncate" onClick={(e) => e.stopPropagation()}>{agent.email}</a>
            </div>
          </div>
        ))}
      </div>

      {/* Agent detail drawer */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSelectedAgent(null)} />
          <div className="relative w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{selectedAgent.agent_name}</h2>
              <button onClick={() => setSelectedAgent(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div>
                <p className="text-sm text-gray-500">{selectedAgent.agency_name}</p>
                <div className="mt-3 space-y-2">
                  <a href={`tel:${selectedAgent.phone}`} className="flex items-center gap-2 text-sm text-shield-600 hover:text-shield-800">
                    <Phone className="w-4 h-4" /> {selectedAgent.phone}
                  </a>
                  <a href={`mailto:${selectedAgent.email}`} className="flex items-center gap-2 text-sm text-shield-600 hover:text-shield-800">
                    <Mail className="w-4 h-4" /> {selectedAgent.email}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Subcontractors Served ({selectedAgent.subCount})
                </h3>
                <div className="space-y-2">
                  {selectedAgent.subcontractors?.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{sub.company_name}</p>
                        <p className="text-xs text-gray-500">{sub.contact_name}</p>
                      </div>
                      <StatusBadge status={sub.overallStatus} />
                    </div>
                  ))}
                  {(!selectedAgent.subcontractors || selectedAgent.subcontractors.length === 0) && (
                    <p className="text-sm text-gray-500">No subcontractors linked</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
