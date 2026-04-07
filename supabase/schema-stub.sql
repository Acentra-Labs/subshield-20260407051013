-- ============================================================
-- SubShield — Supabase Schema Stub
-- Insurance compliance management for Idaho construction
-- ============================================================

-- Organizations (multi-tenant support)
CREATE TABLE public.organizations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  plan          TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id        UUID NOT NULL REFERENCES public.organizations(id),
  role          TEXT NOT NULL CHECK (role IN ('admin', 'consultant', 'gc')),
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  gc_id         UUID REFERENCES public.general_contractors(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_profiles_org_id ON public.profiles(org_id);

-- General Contractors
CREATE TABLE public.general_contractors (
  id                         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                     UUID NOT NULL REFERENCES public.organizations(id),
  company_name               TEXT NOT NULL,
  contact_name               TEXT NOT NULL,
  phone                      TEXT NOT NULL,
  email                      TEXT NOT NULL,
  gl_minimum_cents           INTEGER NOT NULL DEFAULT 100000000,   -- $1,000,000
  wc_minimum_cents           INTEGER NOT NULL DEFAULT 50000000,    -- $500,000
  require_additional_insured BOOLEAN NOT NULL DEFAULT false,
  created_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                 TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_gc_org_id ON public.general_contractors(org_id);

-- Insurance Agents
CREATE TABLE public.insurance_agents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id        UUID NOT NULL REFERENCES public.organizations(id),
  agent_name    TEXT NOT NULL,
  agency_name   TEXT,
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_agent_org_id ON public.insurance_agents(org_id);
CREATE INDEX idx_agent_email ON public.insurance_agents(email);

-- Subcontractors
CREATE TABLE public.subcontractors (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id              UUID NOT NULL REFERENCES public.organizations(id),
  company_name        TEXT NOT NULL,
  contact_name        TEXT NOT NULL,
  phone               TEXT NOT NULL,
  email               TEXT NOT NULL,
  is_sole_proprietor  BOOLEAN NOT NULL DEFAULT false,
  has_ghost_policy    BOOLEAN NOT NULL DEFAULT false,
  agent_id            UUID REFERENCES public.insurance_agents(id),
  w9_storage_path     TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_sub_org_id ON public.subcontractors(org_id);
CREATE INDEX idx_sub_agent_id ON public.subcontractors(agent_id);

-- GC ↔ Subcontractor (many-to-many)
CREATE TABLE public.gc_subcontractors (
  gc_id              UUID NOT NULL REFERENCES public.general_contractors(id) ON DELETE CASCADE,
  subcontractor_id   UUID NOT NULL REFERENCES public.subcontractors(id) ON DELETE CASCADE,
  additional_insured BOOLEAN NOT NULL DEFAULT false,
  wc_required        BOOLEAN NOT NULL DEFAULT true,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (gc_id, subcontractor_id)
);
CREATE INDEX idx_gc_sub_gc ON public.gc_subcontractors(gc_id);
CREATE INDEX idx_gc_sub_sub ON public.gc_subcontractors(subcontractor_id);

-- Insurance Policies (GL and WC per subcontractor)
CREATE TABLE public.insurance_policies (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                   UUID NOT NULL REFERENCES public.organizations(id),
  subcontractor_id         UUID NOT NULL REFERENCES public.subcontractors(id) ON DELETE CASCADE,
  policy_type              TEXT NOT NULL CHECK (policy_type IN ('gl', 'wc')),
  policy_number            TEXT,
  carrier_name             TEXT,
  effective_date           DATE,
  expiration_date          DATE,
  each_occurrence_cents    INTEGER,
  aggregate_limit_cents    INTEGER,
  employer_liability_cents INTEGER,
  compliance_status        TEXT NOT NULL DEFAULT 'pending'
    CHECK (compliance_status IN ('pending', 'compliant', 'expiring_soon', 'expired', 'exempt')),
  is_exempt                BOOLEAN NOT NULL DEFAULT false,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (subcontractor_id, policy_type)
);
CREATE INDEX idx_policy_sub ON public.insurance_policies(subcontractor_id);
CREATE INDEX idx_policy_org_status ON public.insurance_policies(org_id, compliance_status);
CREATE INDEX idx_policy_expiration ON public.insurance_policies(expiration_date);

-- Certificates (uploaded documents)
CREATE TABLE public.certificates (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                 UUID NOT NULL REFERENCES public.organizations(id),
  policy_id              UUID NOT NULL REFERENCES public.insurance_policies(id) ON DELETE CASCADE,
  subcontractor_id       UUID NOT NULL REFERENCES public.subcontractors(id),
  storage_path           TEXT NOT NULL,
  file_name              TEXT NOT NULL,
  file_size_bytes        INTEGER,
  mime_type              TEXT NOT NULL DEFAULT 'application/pdf',
  uploaded_by_user_id    UUID REFERENCES auth.users(id),
  uploaded_by_agent_token UUID REFERENCES public.agent_tokens(id),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_cert_policy ON public.certificates(policy_id);
CREATE INDEX idx_cert_sub ON public.certificates(subcontractor_id);

-- Verification Requests (audit trail)
CREATE TABLE public.verification_requests (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id             UUID NOT NULL REFERENCES public.organizations(id),
  subcontractor_id   UUID NOT NULL REFERENCES public.subcontractors(id),
  policy_id          UUID REFERENCES public.insurance_policies(id),
  agent_id           UUID REFERENCES public.insurance_agents(id),
  request_type       TEXT NOT NULL
    CHECK (request_type IN ('initial_verification', 'expiration_reminder', 'lapse_notification', 'manual_request')),
  status             TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'completed', 'expired', 'failed')),
  sent_at            TIMESTAMPTZ,
  responded_at       TIMESTAMPTZ,
  response_type      TEXT CHECK (response_type IN ('confirmed', 'uploaded_cert', 'no_longer_agent')),
  notes              TEXT,
  created_by         UUID REFERENCES auth.users(id),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_vr_sub ON public.verification_requests(subcontractor_id);
CREATE INDEX idx_vr_org_status ON public.verification_requests(org_id, status);

-- Agent Tokens (magic link tokens — FUTURE)
CREATE TABLE public.agent_tokens (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token                   TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  org_id                  UUID NOT NULL REFERENCES public.organizations(id),
  agent_id                UUID NOT NULL REFERENCES public.insurance_agents(id),
  subcontractor_id        UUID NOT NULL REFERENCES public.subcontractors(id),
  verification_request_id UUID REFERENCES public.verification_requests(id),
  purpose                 TEXT NOT NULL CHECK (purpose IN ('upload_cert', 'confirm_coverage', 'update_info')),
  expires_at              TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '7 days',
  used_at                 TIMESTAMPTZ,
  max_uses                INTEGER NOT NULL DEFAULT 3,
  use_count               INTEGER NOT NULL DEFAULT 0,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_agent_token_lookup ON public.agent_tokens(token) WHERE used_at IS NULL;

-- ============================================================
-- updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.general_contractors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.subcontractors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.insurance_agents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.insurance_policies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.verification_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- Row Level Security (RLS) policy stubs
-- ============================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.general_contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcontractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gc_subcontractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_tokens ENABLE ROW LEVEL SECURITY;

-- Admin/Consultant: full access within org
CREATE POLICY "admin_full_access" ON public.general_contractors
  FOR ALL USING (
    org_id IN (SELECT org_id FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'consultant'))
  );

CREATE POLICY "admin_full_access" ON public.subcontractors
  FOR ALL USING (
    org_id IN (SELECT org_id FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'consultant'))
  );

-- GC: read-only access to their own subcontractors
CREATE POLICY "gc_read_own_subs" ON public.subcontractors
  FOR SELECT USING (
    id IN (
      SELECT subcontractor_id FROM public.gc_subcontractors
      WHERE gc_id = (SELECT gc_id FROM public.profiles WHERE id = auth.uid())
    )
  );

CREATE POLICY "gc_read_own_policies" ON public.insurance_policies
  FOR SELECT USING (
    subcontractor_id IN (
      SELECT subcontractor_id FROM public.gc_subcontractors
      WHERE gc_id = (SELECT gc_id FROM public.profiles WHERE id = auth.uid())
    )
  );

-- ============================================================
-- Storage buckets (reference)
-- ============================================================
-- Bucket: "certificates" (private)
--   Path: {org_id}/{subcontractor_id}/{policy_type}/{uuid}_{date}.pdf
--   Max: 10MB, MIME: application/pdf, image/png, image/jpeg

-- Bucket: "documents" (private)
--   Path: {org_id}/{subcontractor_id}/w9/{uuid}_{date}.pdf
--   Max: 10MB, MIME: application/pdf, image/png, image/jpeg
