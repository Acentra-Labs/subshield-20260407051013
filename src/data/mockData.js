// ============================================================
// SubShield Mock Data
// Maps to Supabase tables defined in supabase/schema-stub.sql
// All IDs use sequential integers for prototype readability
// Monetary values stored in cents
// ============================================================

// -- Table: organizations --
export const organizations = [
  {
    id: 'org-001',
    name: 'Brubaker Consulting LLC',
    slug: 'brubaker-consulting',
    plan: 'pro',
    created_at: '2024-06-15T08:00:00Z',
    updated_at: '2025-01-10T14:30:00Z',
  },
];

// -- Table: profiles (extends auth.users) --
export const profiles = [
  {
    id: 'user-001',
    org_id: 'org-001',
    role: 'admin',
    full_name: 'Dawn Brubaker',
    email: 'dawn@brubakerconsulting.com',
    phone: '(208) 555-0101',
    gc_id: null,
    created_at: '2024-06-15T08:00:00Z',
    updated_at: '2025-01-10T14:30:00Z',
  },
  {
    id: 'user-002',
    org_id: 'org-001',
    role: 'gc',
    full_name: 'Mike Sorensen',
    email: 'mike@mountainwestbuilders.com',
    phone: '(208) 555-0201',
    gc_id: 'gc-001',
    created_at: '2024-07-01T09:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
  },
];

// -- Table: general_contractors --
export const generalContractors = [
  {
    id: 'gc-001',
    org_id: 'org-001',
    company_name: 'Mountain West Builders',
    contact_name: 'Mike Sorensen',
    phone: '(208) 555-0201',
    email: 'mike@mountainwestbuilders.com',
    gl_minimum_cents: 100000000,
    wc_minimum_cents: 50000000,
    require_additional_insured: true,
    created_at: '2024-07-01T09:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
  },
  {
    id: 'gc-002',
    org_id: 'org-001',
    company_name: 'Boise Valley Construction',
    contact_name: 'Travis Henning',
    phone: '(208) 555-0301',
    email: 'travis@boisevalley.build',
    gl_minimum_cents: 100000000,
    wc_minimum_cents: 50000000,
    require_additional_insured: false,
    created_at: '2024-08-10T11:00:00Z',
    updated_at: '2025-03-01T09:00:00Z',
  },
  {
    id: 'gc-003',
    org_id: 'org-001',
    company_name: 'Gem State Contracting',
    contact_name: 'Rachel Dillon',
    phone: '(208) 555-0401',
    email: 'rachel@gemstatecontracting.com',
    gl_minimum_cents: 200000000,
    wc_minimum_cents: 50000000,
    require_additional_insured: true,
    created_at: '2024-09-20T08:30:00Z',
    updated_at: '2025-03-15T15:00:00Z',
  },
];

// -- Table: insurance_agents --
export const insuranceAgents = [
  {
    id: 'agent-001',
    org_id: 'org-001',
    agent_name: 'Karen McAllister',
    agency_name: 'Idaho Farm Bureau Insurance',
    phone: '(208) 555-1001',
    email: 'karen.mcallister@idfbins.com',
    created_at: '2024-07-05T10:00:00Z',
    updated_at: '2025-01-20T13:00:00Z',
  },
  {
    id: 'agent-002',
    org_id: 'org-001',
    agent_name: 'Derek Pham',
    agency_name: 'State Farm - Boise',
    phone: '(208) 555-1002',
    email: 'derek.pham@statefarm.com',
    created_at: '2024-07-10T09:00:00Z',
    updated_at: '2025-02-01T11:00:00Z',
  },
  {
    id: 'agent-003',
    org_id: 'org-001',
    agent_name: 'Lisa Nguyen',
    agency_name: 'Farmers Insurance - Meridian',
    phone: '(208) 555-1003',
    email: 'lisa.nguyen@farmersagent.com',
    created_at: '2024-08-01T14:00:00Z',
    updated_at: '2025-02-20T16:00:00Z',
  },
  {
    id: 'agent-004',
    org_id: 'org-001',
    agent_name: 'Tom Bridwell',
    agency_name: 'Bridwell Insurance Group',
    phone: '(208) 555-1004',
    email: 'tom@bridwellinsurance.com',
    created_at: '2024-08-15T08:00:00Z',
    updated_at: '2025-03-05T10:00:00Z',
  },
  {
    id: 'agent-005',
    org_id: 'org-001',
    agent_name: 'Sandra Hoffman',
    agency_name: 'Allstate - Eagle',
    phone: '(208) 555-1005',
    email: 'sandra.hoffman@allstate.com',
    created_at: '2024-09-01T11:00:00Z',
    updated_at: '2025-03-10T09:00:00Z',
  },
  {
    id: 'agent-006',
    org_id: 'org-001',
    agent_name: 'Ryan Whitaker',
    agency_name: 'Treasure Valley Insurance',
    phone: '(208) 555-1006',
    email: 'ryan@tvinsurance.com',
    created_at: '2024-09-15T10:00:00Z',
    updated_at: '2025-03-15T14:00:00Z',
  },
];

// -- Table: subcontractors --
export const subcontractors = [
  { id: 'sub-001', org_id: 'org-001', company_name: 'Treasure Valley Plumbing', contact_name: 'Jake Morrison', phone: '(208) 555-2001', email: 'jake@tvplumbing.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-001', notes: null, created_at: '2024-07-10T09:00:00Z', updated_at: '2025-03-01T10:00:00Z' },
  { id: 'sub-002', org_id: 'org-001', company_name: 'Boise Electric Co.', contact_name: 'Maria Gonzalez', phone: '(208) 555-2002', email: 'maria@boiseelectric.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-002', notes: null, created_at: '2024-07-12T10:00:00Z', updated_at: '2025-03-05T11:00:00Z' },
  { id: 'sub-003', org_id: 'org-001', company_name: 'Alpine Framing LLC', contact_name: 'Cody Bennett', phone: '(208) 555-2003', email: 'cody@alpineframing.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-001', notes: null, created_at: '2024-07-15T08:00:00Z', updated_at: '2025-02-20T15:00:00Z' },
  { id: 'sub-004', org_id: 'org-001', company_name: 'Snake River HVAC', contact_name: 'Dennis Park', phone: '(208) 555-2004', email: 'dennis@snakeriverhvac.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-003', notes: null, created_at: '2024-07-20T11:00:00Z', updated_at: '2025-03-10T09:00:00Z' },
  { id: 'sub-005', org_id: 'org-001', company_name: 'Summit Roofing Idaho', contact_name: 'Tyler Christensen', phone: '(208) 555-2005', email: 'tyler@summitroofing.id', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-002', notes: null, created_at: '2024-08-01T09:00:00Z', updated_at: '2025-03-15T13:00:00Z' },
  { id: 'sub-006', org_id: 'org-001', company_name: 'Cascade Concrete Works', contact_name: 'Andrea Fisher', phone: '(208) 555-2006', email: 'andrea@cascadeconcrete.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-004', notes: null, created_at: '2024-08-05T10:00:00Z', updated_at: '2025-02-28T11:00:00Z' },
  { id: 'sub-007', org_id: 'org-001', company_name: 'Precision Painting Co.', contact_name: 'Sam Gutierrez', phone: '(208) 555-2007', email: 'sam@precisionpainting.com', is_sole_proprietor: true, has_ghost_policy: true, agent_id: 'agent-005', notes: 'Sole proprietor — carries ghost policy per GC requirement', created_at: '2024-08-10T14:00:00Z', updated_at: '2025-03-12T10:00:00Z' },
  { id: 'sub-008', org_id: 'org-001', company_name: 'Eagle Drywall & Texture', contact_name: 'Brandon Liu', phone: '(208) 555-2008', email: 'brandon@eagledrywall.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-003', notes: null, created_at: '2024-08-15T08:00:00Z', updated_at: '2025-03-08T16:00:00Z' },
  { id: 'sub-009', org_id: 'org-001', company_name: 'Clearwater Excavation', contact_name: 'Justin Keller', phone: '(208) 555-2009', email: 'justin@clearwaterexcavation.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-006', notes: null, created_at: '2024-08-20T09:00:00Z', updated_at: '2025-03-14T11:00:00Z' },
  { id: 'sub-010', org_id: 'org-001', company_name: 'Nate Wheeler Tile', contact_name: 'Nate Wheeler', phone: '(208) 555-2010', email: 'nate@wheelertile.com', is_sole_proprietor: true, has_ghost_policy: false, agent_id: 'agent-005', notes: 'Sole proprietor — WC exempt under Idaho Code §72-212(4)', created_at: '2024-09-01T10:00:00Z', updated_at: '2025-03-16T08:00:00Z' },
  { id: 'sub-011', org_id: 'org-001', company_name: 'Sawtooth Masonry', contact_name: 'Rich Delgado', phone: '(208) 555-2011', email: 'rich@sawtoothmasonry.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-004', notes: null, created_at: '2024-09-05T11:00:00Z', updated_at: '2025-03-09T14:00:00Z' },
  { id: 'sub-012', org_id: 'org-001', company_name: 'Gem State Flooring', contact_name: 'Kelly Yamamoto', phone: '(208) 555-2012', email: 'kelly@gemstateflooring.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-001', notes: null, created_at: '2024-09-10T08:00:00Z', updated_at: '2025-03-11T10:00:00Z' },
  { id: 'sub-013', org_id: 'org-001', company_name: 'Pioneer Landscaping', contact_name: 'Matt Trujillo', phone: '(208) 555-2013', email: 'matt@pioneerlandscaping.id', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-006', notes: null, created_at: '2024-09-15T09:00:00Z', updated_at: '2025-03-13T12:00:00Z' },
  { id: 'sub-014', org_id: 'org-001', company_name: 'Valley Fire Protection', contact_name: 'Chris Odom', phone: '(208) 555-2014', email: 'chris@valleyfire.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-002', notes: null, created_at: '2024-09-20T10:00:00Z', updated_at: '2025-03-07T15:00:00Z' },
  { id: 'sub-015', org_id: 'org-001', company_name: 'Boise Basin Insulation', contact_name: 'Amy Novak', phone: '(208) 555-2015', email: 'amy@boiseinsulation.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-003', notes: null, created_at: '2024-10-01T11:00:00Z', updated_at: '2025-03-06T09:00:00Z' },
  { id: 'sub-016', org_id: 'org-001', company_name: 'Idaho Structural Steel', contact_name: 'Wayne Mitchell', phone: '(208) 555-2016', email: 'wayne@idahosteel.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-004', notes: null, created_at: '2024-10-05T08:00:00Z', updated_at: '2025-03-04T10:00:00Z' },
  { id: 'sub-017', org_id: 'org-001', company_name: 'High Desert Glass', contact_name: 'Tina Chambers', phone: '(208) 555-2017', email: 'tina@highdesertglass.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-005', notes: null, created_at: '2024-10-10T14:00:00Z', updated_at: '2025-03-02T16:00:00Z' },
  { id: 'sub-018', org_id: 'org-001', company_name: 'Timberpine Cabinets', contact_name: 'Doug Ramirez', phone: '(208) 555-2018', email: 'doug@timberpine.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-006', notes: null, created_at: '2024-10-15T09:00:00Z', updated_at: '2025-03-03T11:00:00Z' },
  { id: 'sub-019', org_id: 'org-001', company_name: 'Blue Sky Siding', contact_name: 'Omar Hassan', phone: '(208) 555-2019', email: 'omar@blueskysiding.com', is_sole_proprietor: false, has_ghost_policy: false, agent_id: 'agent-001', notes: null, created_at: '2024-10-20T10:00:00Z', updated_at: '2025-03-17T08:00:00Z' },
  { id: 'sub-020', org_id: 'org-001', company_name: 'Rockwell Welding', contact_name: 'Pete Vasquez', phone: '(208) 555-2020', email: 'pete@rockwellwelding.com', is_sole_proprietor: true, has_ghost_policy: true, agent_id: 'agent-002', notes: 'Sole proprietor with ghost policy', created_at: '2024-10-25T11:00:00Z', updated_at: '2025-03-18T09:00:00Z' },
];

// -- Table: gc_subcontractors (many-to-many join) --
// Mountain West Builders: 12 subs, Boise Valley Construction: 5 subs, Gem State Contracting: 3 subs
export const gcSubcontractors = [
  // Mountain West Builders (gc-001) — 12 subs
  { gc_id: 'gc-001', subcontractor_id: 'sub-001', additional_insured: true, wc_required: true, created_at: '2024-07-10T09:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-002', additional_insured: true, wc_required: true, created_at: '2024-07-12T10:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-003', additional_insured: true, wc_required: true, created_at: '2024-07-15T08:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-004', additional_insured: false, wc_required: true, created_at: '2024-07-20T11:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-005', additional_insured: true, wc_required: true, created_at: '2024-08-01T09:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-006', additional_insured: false, wc_required: true, created_at: '2024-08-05T10:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-007', additional_insured: false, wc_required: false, created_at: '2024-08-10T14:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-008', additional_insured: true, wc_required: true, created_at: '2024-08-15T08:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-009', additional_insured: true, wc_required: true, created_at: '2024-08-20T09:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-010', additional_insured: false, wc_required: false, created_at: '2024-09-01T10:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-011', additional_insured: true, wc_required: true, created_at: '2024-09-05T11:00:00Z' },
  { gc_id: 'gc-001', subcontractor_id: 'sub-012', additional_insured: false, wc_required: true, created_at: '2024-09-10T08:00:00Z' },

  // Boise Valley Construction (gc-002) — 5 subs
  { gc_id: 'gc-002', subcontractor_id: 'sub-013', additional_insured: false, wc_required: true, created_at: '2024-09-15T09:00:00Z' },
  { gc_id: 'gc-002', subcontractor_id: 'sub-014', additional_insured: false, wc_required: true, created_at: '2024-09-20T10:00:00Z' },
  { gc_id: 'gc-002', subcontractor_id: 'sub-015', additional_insured: false, wc_required: true, created_at: '2024-10-01T11:00:00Z' },
  { gc_id: 'gc-002', subcontractor_id: 'sub-016', additional_insured: true, wc_required: true, created_at: '2024-10-05T08:00:00Z' },
  { gc_id: 'gc-002', subcontractor_id: 'sub-001', additional_insured: false, wc_required: true, created_at: '2024-10-10T09:00:00Z' },

  // Gem State Contracting (gc-003) — 3 subs
  { gc_id: 'gc-003', subcontractor_id: 'sub-017', additional_insured: true, wc_required: true, created_at: '2024-10-10T14:00:00Z' },
  { gc_id: 'gc-003', subcontractor_id: 'sub-018', additional_insured: true, wc_required: true, created_at: '2024-10-15T09:00:00Z' },
  { gc_id: 'gc-003', subcontractor_id: 'sub-019', additional_insured: true, wc_required: true, created_at: '2024-10-20T10:00:00Z' },
];

// Helper: get current date for relative expiration calculations
const today = new Date();
const daysFromNow = (d) => {
  const date = new Date(today);
  date.setDate(date.getDate() + d);
  return date.toISOString().split('T')[0];
};
const daysAgo = (d) => daysFromNow(-d);

// -- Table: insurance_policies --
// Status is computed client-side, stored here for reference
export const insurancePolicies = [
  // sub-001: Compliant GL + Compliant WC
  { id: 'pol-001', org_id: 'org-001', subcontractor_id: 'sub-001', policy_type: 'gl', policy_number: 'GL-2025-TV-4481', carrier_name: 'Hartford Insurance', effective_date: '2025-01-15', expiration_date: daysFromNow(120), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-01-15T09:00:00Z', updated_at: '2025-01-15T09:00:00Z' },
  { id: 'pol-002', org_id: 'org-001', subcontractor_id: 'sub-001', policy_type: 'wc', policy_number: 'WC-2025-TV-8812', carrier_name: 'Hartford Insurance', effective_date: '2025-01-15', expiration_date: daysFromNow(120), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-01-15T09:00:00Z', updated_at: '2025-01-15T09:00:00Z' },

  // sub-002: Compliant GL + Compliant WC
  { id: 'pol-003', org_id: 'org-001', subcontractor_id: 'sub-002', policy_type: 'gl', policy_number: 'GL-2025-BE-7721', carrier_name: 'State Farm', effective_date: '2025-02-01', expiration_date: daysFromNow(90), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-02-01T10:00:00Z', updated_at: '2025-02-01T10:00:00Z' },
  { id: 'pol-004', org_id: 'org-001', subcontractor_id: 'sub-002', policy_type: 'wc', policy_number: 'WC-2025-BE-3310', carrier_name: 'State Farm', effective_date: '2025-02-01', expiration_date: daysFromNow(90), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-02-01T10:00:00Z', updated_at: '2025-02-01T10:00:00Z' },

  // sub-003: Compliant GL + Compliant WC
  { id: 'pol-005', org_id: 'org-001', subcontractor_id: 'sub-003', policy_type: 'gl', policy_number: 'GL-2025-AF-1190', carrier_name: 'Idaho Farm Bureau', effective_date: '2024-12-01', expiration_date: daysFromNow(180), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2024-12-01T08:00:00Z', updated_at: '2024-12-01T08:00:00Z' },
  { id: 'pol-006', org_id: 'org-001', subcontractor_id: 'sub-003', policy_type: 'wc', policy_number: 'WC-2025-AF-5547', carrier_name: 'Idaho Farm Bureau', effective_date: '2024-12-01', expiration_date: daysFromNow(180), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2024-12-01T08:00:00Z', updated_at: '2024-12-01T08:00:00Z' },

  // sub-004: Expiring GL (18 days) + Compliant WC
  { id: 'pol-007', org_id: 'org-001', subcontractor_id: 'sub-004', policy_type: 'gl', policy_number: 'GL-2024-SR-6632', carrier_name: 'Farmers Insurance', effective_date: '2024-04-20', expiration_date: daysFromNow(18), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2024-04-20T11:00:00Z', updated_at: '2024-04-20T11:00:00Z' },
  { id: 'pol-008', org_id: 'org-001', subcontractor_id: 'sub-004', policy_type: 'wc', policy_number: 'WC-2025-SR-2245', carrier_name: 'Farmers Insurance', effective_date: '2025-01-01', expiration_date: daysFromNow(200), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-01-01T09:00:00Z', updated_at: '2025-01-01T09:00:00Z' },

  // sub-005: Compliant GL + Expiring WC (7 days)
  { id: 'pol-009', org_id: 'org-001', subcontractor_id: 'sub-005', policy_type: 'gl', policy_number: 'GL-2025-SR-9901', carrier_name: 'State Farm', effective_date: '2025-03-01', expiration_date: daysFromNow(150), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-01T09:00:00Z', updated_at: '2025-03-01T09:00:00Z' },
  { id: 'pol-010', org_id: 'org-001', subcontractor_id: 'sub-005', policy_type: 'wc', policy_number: 'WC-2024-SR-4478', carrier_name: 'State Farm', effective_date: '2024-04-15', expiration_date: daysFromNow(7), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2024-04-15T13:00:00Z', updated_at: '2024-04-15T13:00:00Z' },

  // sub-006: Expired GL (15 days ago) + Expired WC (15 days ago)
  { id: 'pol-011', org_id: 'org-001', subcontractor_id: 'sub-006', policy_type: 'gl', policy_number: 'GL-2024-CC-3356', carrier_name: 'Bridwell Insurance', effective_date: '2024-03-25', expiration_date: daysAgo(15), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2024-03-25T10:00:00Z', updated_at: '2024-03-25T10:00:00Z' },
  { id: 'pol-012', org_id: 'org-001', subcontractor_id: 'sub-006', policy_type: 'wc', policy_number: 'WC-2024-CC-7789', carrier_name: 'Bridwell Insurance', effective_date: '2024-03-25', expiration_date: daysAgo(15), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2024-03-25T10:00:00Z', updated_at: '2024-03-25T10:00:00Z' },

  // sub-007: Compliant GL + Exempt WC (sole proprietor with ghost policy)
  { id: 'pol-013', org_id: 'org-001', subcontractor_id: 'sub-007', policy_type: 'gl', policy_number: 'GL-2025-PP-2244', carrier_name: 'Allstate', effective_date: '2025-02-15', expiration_date: daysFromNow(100), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-02-15T14:00:00Z', updated_at: '2025-02-15T14:00:00Z' },
  { id: 'pol-014', org_id: 'org-001', subcontractor_id: 'sub-007', policy_type: 'wc', policy_number: 'WC-GHOST-PP-001', carrier_name: 'Allstate', effective_date: '2025-02-15', expiration_date: daysFromNow(100), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 10000000, is_exempt: true, created_at: '2025-02-15T14:00:00Z', updated_at: '2025-02-15T14:00:00Z' },

  // sub-008: Expiring GL (25 days) + Compliant WC
  { id: 'pol-015', org_id: 'org-001', subcontractor_id: 'sub-008', policy_type: 'gl', policy_number: 'GL-2024-ED-5567', carrier_name: 'Farmers Insurance', effective_date: '2024-05-01', expiration_date: daysFromNow(25), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2024-05-01T08:00:00Z', updated_at: '2024-05-01T08:00:00Z' },
  { id: 'pol-016', org_id: 'org-001', subcontractor_id: 'sub-008', policy_type: 'wc', policy_number: 'WC-2025-ED-1123', carrier_name: 'Farmers Insurance', effective_date: '2025-01-15', expiration_date: daysFromNow(160), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-01-15T08:00:00Z', updated_at: '2025-01-15T08:00:00Z' },

  // sub-009: Compliant GL + Compliant WC
  { id: 'pol-017', org_id: 'org-001', subcontractor_id: 'sub-009', policy_type: 'gl', policy_number: 'GL-2025-CE-8890', carrier_name: 'Treasure Valley Insurance', effective_date: '2025-03-01', expiration_date: daysFromNow(200), each_occurrence_cents: 200000000, aggregate_limit_cents: 400000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-01T09:00:00Z', updated_at: '2025-03-01T09:00:00Z' },
  { id: 'pol-018', org_id: 'org-001', subcontractor_id: 'sub-009', policy_type: 'wc', policy_number: 'WC-2025-CE-3367', carrier_name: 'Treasure Valley Insurance', effective_date: '2025-03-01', expiration_date: daysFromNow(200), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-03-01T09:00:00Z', updated_at: '2025-03-01T09:00:00Z' },

  // sub-010: Compliant GL + Exempt WC (sole proprietor, no ghost policy)
  { id: 'pol-019', org_id: 'org-001', subcontractor_id: 'sub-010', policy_type: 'gl', policy_number: 'GL-2025-NW-4456', carrier_name: 'Allstate', effective_date: '2025-01-01', expiration_date: daysFromNow(130), each_occurrence_cents: 50000000, aggregate_limit_cents: 100000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },
  { id: 'pol-020', org_id: 'org-001', subcontractor_id: 'sub-010', policy_type: 'wc', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: true, created_at: '2025-01-01T10:00:00Z', updated_at: '2025-01-01T10:00:00Z' },

  // sub-011: Expired GL (5 days ago) + Compliant WC
  { id: 'pol-021', org_id: 'org-001', subcontractor_id: 'sub-011', policy_type: 'gl', policy_number: 'GL-2024-SM-7712', carrier_name: 'Bridwell Insurance', effective_date: '2024-04-01', expiration_date: daysAgo(5), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2024-04-01T11:00:00Z', updated_at: '2024-04-01T11:00:00Z' },
  { id: 'pol-022', org_id: 'org-001', subcontractor_id: 'sub-011', policy_type: 'wc', policy_number: 'WC-2025-SM-9934', carrier_name: 'Bridwell Insurance', effective_date: '2025-02-01', expiration_date: daysFromNow(150), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-02-01T11:00:00Z', updated_at: '2025-02-01T11:00:00Z' },

  // sub-012: Compliant GL + Compliant WC
  { id: 'pol-023', org_id: 'org-001', subcontractor_id: 'sub-012', policy_type: 'gl', policy_number: 'GL-2025-GF-1188', carrier_name: 'Idaho Farm Bureau', effective_date: '2025-01-20', expiration_date: daysFromNow(170), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-01-20T08:00:00Z', updated_at: '2025-01-20T08:00:00Z' },
  { id: 'pol-024', org_id: 'org-001', subcontractor_id: 'sub-012', policy_type: 'wc', policy_number: 'WC-2025-GF-6643', carrier_name: 'Idaho Farm Bureau', effective_date: '2025-01-20', expiration_date: daysFromNow(170), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-01-20T08:00:00Z', updated_at: '2025-01-20T08:00:00Z' },

  // sub-013: Pending GL + Pending WC
  { id: 'pol-025', org_id: 'org-001', subcontractor_id: 'sub-013', policy_type: 'gl', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-13T09:00:00Z', updated_at: '2025-03-13T09:00:00Z' },
  { id: 'pol-026', org_id: 'org-001', subcontractor_id: 'sub-013', policy_type: 'wc', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-13T09:00:00Z', updated_at: '2025-03-13T09:00:00Z' },

  // sub-014: Compliant GL + Expiring WC (14 days)
  { id: 'pol-027', org_id: 'org-001', subcontractor_id: 'sub-014', policy_type: 'gl', policy_number: 'GL-2025-VF-5590', carrier_name: 'State Farm', effective_date: '2025-02-10', expiration_date: daysFromNow(160), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-02-10T10:00:00Z', updated_at: '2025-02-10T10:00:00Z' },
  { id: 'pol-028', org_id: 'org-001', subcontractor_id: 'sub-014', policy_type: 'wc', policy_number: 'WC-2024-VF-8801', carrier_name: 'State Farm', effective_date: '2024-04-22', expiration_date: daysFromNow(14), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2024-04-22T10:00:00Z', updated_at: '2024-04-22T10:00:00Z' },

  // sub-015: Pending GL + Pending WC
  { id: 'pol-029', org_id: 'org-001', subcontractor_id: 'sub-015', policy_type: 'gl', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-06T11:00:00Z', updated_at: '2025-03-06T11:00:00Z' },
  { id: 'pol-030', org_id: 'org-001', subcontractor_id: 'sub-015', policy_type: 'wc', policy_number: null, carrier_name: null, effective_date: null, expiration_date: null, each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-06T11:00:00Z', updated_at: '2025-03-06T11:00:00Z' },

  // sub-016: Compliant GL + Compliant WC
  { id: 'pol-031', org_id: 'org-001', subcontractor_id: 'sub-016', policy_type: 'gl', policy_number: 'GL-2025-IS-3345', carrier_name: 'Bridwell Insurance', effective_date: '2025-01-10', expiration_date: daysFromNow(140), each_occurrence_cents: 200000000, aggregate_limit_cents: 400000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-01-10T08:00:00Z', updated_at: '2025-01-10T08:00:00Z' },
  { id: 'pol-032', org_id: 'org-001', subcontractor_id: 'sub-016', policy_type: 'wc', policy_number: 'WC-2025-IS-7756', carrier_name: 'Bridwell Insurance', effective_date: '2025-01-10', expiration_date: daysFromNow(140), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-01-10T08:00:00Z', updated_at: '2025-01-10T08:00:00Z' },

  // sub-017: Compliant GL + Compliant WC
  { id: 'pol-033', org_id: 'org-001', subcontractor_id: 'sub-017', policy_type: 'gl', policy_number: 'GL-2025-HG-6678', carrier_name: 'Allstate', effective_date: '2025-02-20', expiration_date: daysFromNow(110), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-02-20T14:00:00Z', updated_at: '2025-02-20T14:00:00Z' },
  { id: 'pol-034', org_id: 'org-001', subcontractor_id: 'sub-017', policy_type: 'wc', policy_number: 'WC-2025-HG-2234', carrier_name: 'Allstate', effective_date: '2025-02-20', expiration_date: daysFromNow(110), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-02-20T14:00:00Z', updated_at: '2025-02-20T14:00:00Z' },

  // sub-018: Compliant GL + Compliant WC
  { id: 'pol-035', org_id: 'org-001', subcontractor_id: 'sub-018', policy_type: 'gl', policy_number: 'GL-2025-TC-9912', carrier_name: 'Treasure Valley Insurance', effective_date: '2025-03-05', expiration_date: daysFromNow(190), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-03-05T09:00:00Z', updated_at: '2025-03-05T09:00:00Z' },
  { id: 'pol-036', org_id: 'org-001', subcontractor_id: 'sub-018', policy_type: 'wc', policy_number: 'WC-2025-TC-5578', carrier_name: 'Treasure Valley Insurance', effective_date: '2025-03-05', expiration_date: daysFromNow(190), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-03-05T09:00:00Z', updated_at: '2025-03-05T09:00:00Z' },

  // sub-019: Expired GL (30 days ago) + Compliant WC
  { id: 'pol-037', org_id: 'org-001', subcontractor_id: 'sub-019', policy_type: 'gl', policy_number: 'GL-2024-BS-1134', carrier_name: 'Idaho Farm Bureau', effective_date: '2024-03-10', expiration_date: daysAgo(30), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2024-03-10T10:00:00Z', updated_at: '2024-03-10T10:00:00Z' },
  { id: 'pol-038', org_id: 'org-001', subcontractor_id: 'sub-019', policy_type: 'wc', policy_number: 'WC-2025-BS-7789', carrier_name: 'Idaho Farm Bureau', effective_date: '2025-01-05', expiration_date: daysFromNow(160), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 50000000, is_exempt: false, created_at: '2025-01-05T10:00:00Z', updated_at: '2025-01-05T10:00:00Z' },

  // sub-020: Compliant GL + Exempt WC (sole proprietor with ghost policy)
  { id: 'pol-039', org_id: 'org-001', subcontractor_id: 'sub-020', policy_type: 'gl', policy_number: 'GL-2025-RW-5567', carrier_name: 'State Farm', effective_date: '2025-02-01', expiration_date: daysFromNow(95), each_occurrence_cents: 100000000, aggregate_limit_cents: 200000000, employer_liability_cents: null, is_exempt: false, created_at: '2025-02-01T11:00:00Z', updated_at: '2025-02-01T11:00:00Z' },
  { id: 'pol-040', org_id: 'org-001', subcontractor_id: 'sub-020', policy_type: 'wc', policy_number: 'WC-GHOST-RW-002', carrier_name: 'State Farm', effective_date: '2025-02-01', expiration_date: daysFromNow(95), each_occurrence_cents: null, aggregate_limit_cents: null, employer_liability_cents: 10000000, is_exempt: true, created_at: '2025-02-01T11:00:00Z', updated_at: '2025-02-01T11:00:00Z' },
];

// -- Table: certificates (uploaded documents) --
export const certificates = [
  { id: 'cert-001', org_id: 'org-001', policy_id: 'pol-001', subcontractor_id: 'sub-001', storage_path: 'org-001/sub-001/gl/cert-001_2025-01-15.pdf', file_name: 'TV_Plumbing_GL_Certificate_2025.pdf', file_size_bytes: 245000, mime_type: 'application/pdf', uploaded_by_user_id: null, created_at: '2025-01-16T10:00:00Z' },
  { id: 'cert-002', org_id: 'org-001', policy_id: 'pol-002', subcontractor_id: 'sub-001', storage_path: 'org-001/sub-001/wc/cert-002_2025-01-15.pdf', file_name: 'TV_Plumbing_WC_Certificate_2025.pdf', file_size_bytes: 198000, mime_type: 'application/pdf', uploaded_by_user_id: null, created_at: '2025-01-16T10:05:00Z' },
  { id: 'cert-003', org_id: 'org-001', policy_id: 'pol-005', subcontractor_id: 'sub-003', storage_path: 'org-001/sub-003/gl/cert-003_2024-12-01.pdf', file_name: 'Alpine_Framing_GL_COI_2024.pdf', file_size_bytes: 312000, mime_type: 'application/pdf', uploaded_by_user_id: null, created_at: '2024-12-02T14:00:00Z' },
  { id: 'cert-004', org_id: 'org-001', policy_id: 'pol-017', subcontractor_id: 'sub-009', storage_path: 'org-001/sub-009/gl/cert-004_2025-03-01.pdf', file_name: 'Clearwater_Excavation_GL_2025.pdf', file_size_bytes: 278000, mime_type: 'application/pdf', uploaded_by_user_id: null, created_at: '2025-03-02T09:00:00Z' },
  { id: 'cert-005', org_id: 'org-001', policy_id: 'pol-018', subcontractor_id: 'sub-009', storage_path: 'org-001/sub-009/wc/cert-005_2025-03-01.pdf', file_name: 'Clearwater_Excavation_WC_2025.pdf', file_size_bytes: 205000, mime_type: 'application/pdf', uploaded_by_user_id: null, created_at: '2025-03-02T09:05:00Z' },
];

// -- Table: verification_requests (audit trail) --
export const verificationRequests = [
  // sub-001 verification history
  { id: 'vr-001', org_id: 'org-001', subcontractor_id: 'sub-001', policy_id: 'pol-001', agent_id: 'agent-001', request_type: 'initial_verification', status: 'completed', sent_at: '2025-01-10T09:00:00Z', responded_at: '2025-01-12T14:30:00Z', response_type: 'uploaded_cert', notes: 'Agent uploaded GL and WC certificates', created_by: 'user-001', created_at: '2025-01-10T09:00:00Z', updated_at: '2025-01-12T14:30:00Z' },
  { id: 'vr-002', org_id: 'org-001', subcontractor_id: 'sub-001', policy_id: 'pol-001', agent_id: 'agent-001', request_type: 'manual_request', status: 'completed', sent_at: '2025-02-15T10:00:00Z', responded_at: '2025-02-16T11:00:00Z', response_type: 'confirmed', notes: 'Coverage confirmed as active', created_by: 'user-001', created_at: '2025-02-15T10:00:00Z', updated_at: '2025-02-16T11:00:00Z' },

  // sub-004 verification history
  { id: 'vr-003', org_id: 'org-001', subcontractor_id: 'sub-004', policy_id: 'pol-007', agent_id: 'agent-003', request_type: 'expiration_reminder', status: 'sent', sent_at: '2025-03-20T08:00:00Z', responded_at: null, response_type: null, notes: '30-day expiration warning sent', created_by: 'user-001', created_at: '2025-03-20T08:00:00Z', updated_at: '2025-03-20T08:00:00Z' },

  // sub-006 verification history
  { id: 'vr-004', org_id: 'org-001', subcontractor_id: 'sub-006', policy_id: 'pol-011', agent_id: 'agent-004', request_type: 'expiration_reminder', status: 'completed', sent_at: '2025-02-25T09:00:00Z', responded_at: '2025-02-27T16:00:00Z', response_type: 'confirmed', notes: 'Agent confirmed renewal in progress', created_by: 'user-001', created_at: '2025-02-25T09:00:00Z', updated_at: '2025-02-27T16:00:00Z' },
  { id: 'vr-005', org_id: 'org-001', subcontractor_id: 'sub-006', policy_id: 'pol-011', agent_id: 'agent-004', request_type: 'lapse_notification', status: 'sent', sent_at: '2025-03-25T08:00:00Z', responded_at: null, response_type: null, notes: 'Policy lapsed — awaiting renewal certificate', created_by: 'user-001', created_at: '2025-03-25T08:00:00Z', updated_at: '2025-03-25T08:00:00Z' },

  // sub-009 verification history
  { id: 'vr-006', org_id: 'org-001', subcontractor_id: 'sub-009', policy_id: 'pol-017', agent_id: 'agent-006', request_type: 'initial_verification', status: 'completed', sent_at: '2025-02-28T10:00:00Z', responded_at: '2025-03-02T09:00:00Z', response_type: 'uploaded_cert', notes: 'New certificates uploaded for GL and WC', created_by: 'user-001', created_at: '2025-02-28T10:00:00Z', updated_at: '2025-03-02T09:00:00Z' },
  { id: 'vr-007', org_id: 'org-001', subcontractor_id: 'sub-009', policy_id: 'pol-017', agent_id: 'agent-006', request_type: 'manual_request', status: 'completed', sent_at: '2025-03-10T14:00:00Z', responded_at: '2025-03-11T10:30:00Z', response_type: 'confirmed', notes: 'Additional insured endorsement confirmed', created_by: 'user-001', created_at: '2025-03-10T14:00:00Z', updated_at: '2025-03-11T10:30:00Z' },

  // sub-011 verification history
  { id: 'vr-008', org_id: 'org-001', subcontractor_id: 'sub-011', policy_id: 'pol-021', agent_id: 'agent-004', request_type: 'expiration_reminder', status: 'sent', sent_at: '2025-03-15T08:00:00Z', responded_at: null, response_type: null, notes: '30-day expiration warning sent for GL policy', created_by: 'user-001', created_at: '2025-03-15T08:00:00Z', updated_at: '2025-03-15T08:00:00Z' },
];

// -- Table: notifications (UI mock data) --
export const notifications = [
  { id: 'notif-001', title: 'GL Policy Expiring Soon', message: 'Snake River HVAC GL expires in 18 days', type: 'warning', sub_id: 'sub-004', read: false, created_at: '2025-04-05T08:00:00Z' },
  { id: 'notif-002', title: 'WC Policy Expiring Soon', message: 'Summit Roofing Idaho WC expires in 7 days', type: 'danger', sub_id: 'sub-005', read: false, created_at: '2025-04-05T08:00:00Z' },
  { id: 'notif-003', title: 'Policy Expired', message: 'Cascade Concrete Works GL & WC expired 15 days ago', type: 'danger', sub_id: 'sub-006', read: false, created_at: '2025-03-25T08:00:00Z' },
  { id: 'notif-004', title: 'Verification Completed', message: 'Karen McAllister confirmed coverage for Treasure Valley Plumbing', type: 'success', sub_id: 'sub-001', read: true, created_at: '2025-02-16T11:00:00Z' },
  { id: 'notif-005', title: 'Pending Verification', message: 'Pioneer Landscaping — awaiting initial insurance verification', type: 'info', sub_id: 'sub-013', read: false, created_at: '2025-03-13T09:00:00Z' },
  { id: 'notif-006', title: 'Policy Expired', message: 'Blue Sky Siding GL expired 30 days ago', type: 'danger', sub_id: 'sub-019', read: false, created_at: '2025-03-10T08:00:00Z' },
  { id: 'notif-007', title: 'GL Policy Expiring Soon', message: 'Eagle Drywall & Texture GL expires in 25 days', type: 'warning', sub_id: 'sub-008', read: true, created_at: '2025-04-01T08:00:00Z' },
];

// -- Email templates (mock) --
export const emailTemplates = [
  {
    id: 'tmpl-001',
    name: 'Initial Verification Request',
    subject: 'Insurance Verification Required — {{sub_company_name}}',
    body: `Dear {{agent_name}},

We are writing to request verification of insurance coverage for {{sub_company_name}}, a subcontractor working with {{gc_company_name}}.

Please verify the following coverage is current and active:
- General Liability: Minimum \${{gl_minimum}} per occurrence
- Workers' Compensation: Minimum \${{wc_minimum}} per accident

You can respond by clicking the secure link below:
{{magic_link}}

This link expires in 7 days. If you have questions, contact {{consultant_name}} at {{consultant_email}}.

Thank you,
{{consultant_name}}
{{org_name}}`,
  },
  {
    id: 'tmpl-002',
    name: 'Expiration Reminder (30-day)',
    subject: 'Insurance Renewal Needed — {{sub_company_name}} (Expires {{expiration_date}})',
    body: `Dear {{agent_name}},

This is a reminder that the {{policy_type}} insurance policy for {{sub_company_name}} is set to expire on {{expiration_date}}.

Policy Details:
- Policy Number: {{policy_number}}
- Carrier: {{carrier_name}}
- Expiration: {{expiration_date}}

Please upload the renewal certificate using the link below:
{{magic_link}}

Thank you,
{{consultant_name}}
{{org_name}}`,
  },
];
