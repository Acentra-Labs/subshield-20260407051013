import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  subcontractors as mockSubs,
  generalContractors as mockGcs,
  insuranceAgents as mockAgents,
  insurancePolicies as mockPolicies,
  gcSubcontractors as mockGcSubs,
  certificates as mockCerts,
  verificationRequests as mockVrs,
  notifications as mockNotifs,
} from '../data/mockData';
import { getComplianceStatus, getOverallStatus } from '../utils/compliance';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [subcontractors, setSubcontractors] = useState(mockSubs);
  const [generalContractors, setGeneralContractors] = useState(mockGcs);
  const [insuranceAgents] = useState(mockAgents);
  const [policies, setPolicies] = useState(mockPolicies);
  const [gcSubcontractors, setGcSubcontractors] = useState(mockGcSubs);
  const [certificates] = useState(mockCerts);
  const [verificationRequests] = useState(mockVrs);
  const [notifications, setNotifications] = useState(mockNotifs);

  // Compute enriched subcontractor data with compliance status
  const enrichedSubcontractors = useMemo(() => {
    return subcontractors.map((sub) => {
      const glPolicy = policies.find((p) => p.subcontractor_id === sub.id && p.policy_type === 'gl');
      const wcPolicy = policies.find((p) => p.subcontractor_id === sub.id && p.policy_type === 'wc');
      const agent = insuranceAgents.find((a) => a.id === sub.agent_id);
      const gcLinks = gcSubcontractors.filter((gs) => gs.subcontractor_id === sub.id);
      const gcs = gcLinks.map((gl) => generalContractors.find((gc) => gc.id === gl.gc_id)).filter(Boolean);
      const subCerts = certificates.filter((c) => c.subcontractor_id === sub.id);
      const subVrs = verificationRequests.filter((v) => v.subcontractor_id === sub.id);

      const glStatus = getComplianceStatus(glPolicy?.expiration_date, glPolicy?.is_exempt);
      const wcStatus = getComplianceStatus(wcPolicy?.expiration_date, wcPolicy?.is_exempt);
      const overallStatus = getOverallStatus(glStatus, wcStatus);

      return {
        ...sub,
        glPolicy,
        wcPolicy,
        glStatus,
        wcStatus,
        overallStatus,
        agent,
        gcs,
        gcLinks,
        certificates: subCerts,
        verificationRequests: subVrs,
      };
    });
  }, [subcontractors, policies, insuranceAgents, gcSubcontractors, generalContractors, certificates, verificationRequests]);

  // Get subs for a specific GC
  const getSubsForGc = useCallback(
    (gcId) => {
      const subIds = gcSubcontractors.filter((gs) => gs.gc_id === gcId).map((gs) => gs.subcontractor_id);
      return enrichedSubcontractors.filter((s) => subIds.includes(s.id));
    },
    [gcSubcontractors, enrichedSubcontractors]
  );

  // Get enriched GC data
  const enrichedGcs = useMemo(() => {
    return generalContractors.map((gc) => {
      const subs = getSubsForGc(gc.id);
      const compliantCount = subs.filter((s) => s.overallStatus === 'compliant' || s.overallStatus === 'exempt').length;
      const compliancePercent = subs.length > 0 ? Math.round((compliantCount / subs.length) * 100) : 100;
      return { ...gc, subCount: subs.length, compliantCount, compliancePercent };
    });
  }, [generalContractors, getSubsForGc]);

  // Get enriched agent data
  const enrichedAgents = useMemo(() => {
    return insuranceAgents.map((agent) => {
      const agentSubs = enrichedSubcontractors.filter((s) => s.agent_id === agent.id);
      return { ...agent, subCount: agentSubs.length, subcontractors: agentSubs };
    });
  }, [insuranceAgents, enrichedSubcontractors]);

  // KPI calculations
  const getKpis = useCallback(
    (subs) => {
      const total = subs.length;
      const compliant = subs.filter((s) => s.overallStatus === 'compliant' || s.overallStatus === 'exempt').length;
      const expiring = subs.filter((s) => s.overallStatus === 'expiring_soon').length;
      const expired = subs.filter((s) => s.overallStatus === 'expired').length;
      const pending = subs.filter((s) => s.overallStatus === 'pending').length;
      return { total, compliant, expiring, expired, pending };
    },
    []
  );

  // Add subcontractor
  const addSubcontractor = useCallback((sub, gcId) => {
    const newSub = { ...sub, id: `sub-${Date.now()}`, org_id: 'org-001', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    setSubcontractors((prev) => [...prev, newSub]);
    if (gcId) {
      setGcSubcontractors((prev) => [...prev, { gc_id: gcId, subcontractor_id: newSub.id, additional_insured: false, wc_required: true, created_at: new Date().toISOString() }]);
    }
    // Create empty policy stubs
    setPolicies((prev) => [
      ...prev,
      { id: `pol-${Date.now()}-gl`, org_id: 'org-001', subcontractor_id: newSub.id, policy_type: 'gl', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: `pol-${Date.now()}-wc`, org_id: 'org-001', subcontractor_id: newSub.id, policy_type: 'wc', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: sub.is_sole_proprietor, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]);
    return newSub;
  }, []);

  // Update subcontractor
  const updateSubcontractor = useCallback((id, updates) => {
    setSubcontractors((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s)));
  }, []);

  // Delete subcontractor
  const deleteSubcontractor = useCallback((id) => {
    setSubcontractors((prev) => prev.filter((s) => s.id !== id));
    setGcSubcontractors((prev) => prev.filter((gs) => gs.subcontractor_id !== id));
    setPolicies((prev) => prev.filter((p) => p.subcontractor_id !== id));
  }, []);

  // Add GC
  const addGc = useCallback((gc) => {
    const newGc = { ...gc, id: `gc-${Date.now()}`, org_id: 'org-001', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    setGeneralContractors((prev) => [...prev, newGc]);
    return newGc;
  }, []);

  // Update GC
  const updateGc = useCallback((id, updates) => {
    setGeneralContractors((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates, updated_at: new Date().toISOString() } : g)));
  }, []);

  // Delete GC
  const deleteGc = useCallback((id) => {
    setGeneralContractors((prev) => prev.filter((g) => g.id !== id));
    setGcSubcontractors((prev) => prev.filter((gs) => gs.gc_id !== id));
  }, []);

  // Mark notification read
  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <DataContext.Provider
      value={{
        subcontractors: enrichedSubcontractors,
        generalContractors: enrichedGcs,
        insuranceAgents: enrichedAgents,
        policies,
        gcSubcontractors,
        certificates,
        verificationRequests,
        notifications,
        unreadNotificationCount,
        getSubsForGc,
        getKpis,
        addSubcontractor,
        updateSubcontractor,
        deleteSubcontractor,
        addGc,
        updateGc,
        deleteGc,
        markNotificationRead,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
