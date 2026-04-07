# Discovery Brief: SubShield

**Generated:** 2026-04-07_00-57

---

## App Overview
**App Name:** SubShield
**Alternative Names:** CertReady, ComplianceHQ, SubCert

SubShield is a focused, lightweight compliance management tool that helps construction consultants and general contractors track subcontractor insurance (workers' comp and general liability), automate verification requests to insurance agents, and get alerts before coverage lapses. It replaces the current workflow of spreadsheets, manual phone calls, and digging through OneDrive files with a clean dashboard and automated email workflows. Built specifically for small-to-mid-size Idaho construction operations, it avoids the bloat and cost of enterprise platforms like Procore, Avetta, or HCSS.

## Target Users

**Primary:** Dawn Brubaker (and eventually other consultants like her) — acts as the administrator managing insurance compliance across multiple GCs.

**Secondary:**
- **General Contractors** — need at-a-glance visibility into their subcontractors' insurance status, especially before issuing payments on draws. Mobile-responsive access is critical since GCs are on job sites.
- **Insurance Agents** — receive automated verification/renewal emails and respond via simple links (no account required). Must be low-friction since they are external third parties.
- **Subcontractors** — passive participants who may need to upload certificates or W9s. Minimal interaction required.

## Core Problem

General contractors in Idaho are legally and financially liable if their subcontractors don't maintain proper workers' compensation and general liability insurance. Under Idaho Code Section 72-216, the GC becomes the "statutory employer" and is responsible for all workers' comp benefits if an uninsured sub's employee gets injured. Penalties include personal liability, a 10% surcharge, attorney fees, and potential misdemeanor charges.

**Current workarounds:**
- Spreadsheets and OneDrive folders tracking certificates manually
- Physical phone calls to 20+ different insurance agents per draw cycle
- Checking each certificate individually before approving payment
- No automated alerting when policies lapse or expire

**Why existing solutions don't work:**
Platforms like Procore, HCSS, Avetta, myCOI, and Jones are enterprise-grade, expensive (custom pricing, opaque billing), require lengthy onboarding, and bundle dozens of features Dawn doesn't need. TrustLayer offers a free tier for <50 vendors but still has more complexity than needed. Dawn needs a simple, purpose-built tool — not a Swiss Army knife.

## Platform Recommendation

**Web App (mobile-responsive)** — confirmed by client.

Reasoning: GCs need mobile access on job sites, but a native app is not required for Day 1. A responsive web app accessible via phone browser satisfies this need without the cost and maintenance burden of a separate native build. If adoption grows, a React Native mobile app could be a Phase 2 consideration.

## Recommended Tech Stack

**React + Vite + TailwindCSS (SPA) with Supabase backend**

Reasoning:
- No SEO requirement — this is an authenticated dashboard app, not a public-facing site. SPA is the right fit.
- Vite provides fast builds and excellent DX for rapid prototyping.
- TailwindCSS enables quick, consistent UI development with the clean/modern aesthetic Dawn wants.
- Supabase provides auth, database (Postgres), and edge functions out of the box — cost-efficient for a small-scale app (10 GCs, 100 subs) with room to grow.
- Email automation can be handled via Resend or SendGrid integration for agent verification workflows.
- No native mobile build needed — responsive TailwindCSS handles phone/tablet layouts.

## Key Requirements

### User Roles & Authentication
- **Consultant/Admin (Dawn):** Full access to all GCs, subs, agents, and settings. Can onboard all entities. Can view cross-GC data (e.g., which subs work for multiple GCs). [INFERRED] Can manage email templates.
- **General Contractor:** Scoped login showing only their subcontractors. Can see insurance status, expiration dates, agent info, and policy numbers. Can enter new subcontractors. Cannot see other GCs' subcontractors. [INFERRED] Can trigger manual verification requests.
- **Insurance Agent:** No account/login required. Interacts exclusively via emailed magic links — click to verify coverage is active (yes/no), upload a new certificate, or indicate they are no longer that sub's agent.
- **Subcontractor:** [INFERRED] No login required for MVP. Consultant enters their info. If certificate upload is needed, a magic link email flow (similar to agents) could be used in Phase 2.

### Subcontractor Onboarding
- Consultant enters subcontractor information manually (name, company, phone, email, insurance agent contact info)
- [INFERRED] Form should support W9 document upload with file storage
- [INFERRED] W9 parsing (OCR/AI extraction of name, EIN, address, business type) is a Phase 2 feature — for MVP, manual entry with W9 file attachment
- System checks if subcontractor already exists in the database — if so, pre-fills known insurance agent info
- Subcontractor is linked to one or more General Contractors
- Required fields: company name, contact name, phone, email, insurance agent name, agent phone, agent email

### Insurance Tracking
- Track two insurance types per subcontractor:
  - **General Liability:** policy number, carrier name, expiration date, coverage amount (typical minimum: $1M per occurrence / $2M aggregate — exceeds Idaho's statutory $300K minimum per industry standard)
  - **Workers' Compensation:** policy number, carrier name, expiration date, coverage amount (typical: $500K/$500K/$500K employer's liability)
- Track whether subcontractor is a sole proprietor (exempt from WC under Idaho Code §72-212(4) but GC may still require coverage contractually)
- [INFERRED] Track "Additional Insured" endorsement status per GC (checkbox — some GCs require being named on the sub's policy, some don't)
- [INFERRED] Track "Ghost Policy" status (some sole proprietors carry a ghost policy to satisfy GC requirements)
- Store uploaded certificate documents (PDFs/images) linked to the subcontractor record
- [INFERRED] Certificate upload must come from the insurance agent (not the sub) to prevent fraud — enforce this in the workflow

### Compliance Dashboard
- **Consultant view:** All GCs and all subs in a single view with filters. Summary KPI cards at top: total subs, compliant count, expiring within 30 days, expired, pending verification.
- **GC view:** Scoped to their subs only. Same KPI cards + filterable table showing: sub name, GL expiration, WC expiration, agent name, compliance status (color-coded).
- **Status color coding:** Green (compliant), Amber (expiring within 30 days), Red (expired), Gray (pending/not yet verified), Blue (verification in progress).
- [INFERRED] Status indicators should always include icons + text labels alongside color for accessibility (WCAG compliance).
- Clicking a subcontractor row opens a detail panel/drawer with full info, documents, and verification history.

### Automated Email Workflows
- **Agent verification request:** When a new sub is onboarded, system sends a templated email to the insurance agent requesting proof of GL and WC coverage. Email includes a magic link to upload certificates or confirm coverage.
- **Expiration warning:** Automated emails sent at 30 days before expiration to the insurance agent requesting a renewed certificate. [INFERRED] A 60-day warning for the consultant's awareness.
- **Lapse notification:** If a certificate expires, automated email to the GC and consultant notifying them that the sub is non-compliant.
- **Agent response flow:** Magic link in email leads to a simple page — no login required. Options: (a) upload new certificate, (b) confirm coverage is still active, (c) indicate they are no longer the agent for this subcontractor.
- [INFERRED] Email templates should be customizable per GC (with GC's company name, logo, contact info).
- [INFERRED] All email interactions should be logged in the system for audit trail purposes.

### Payment Draw Verification
- [INFERRED] "Draw verification" mode: Consultant or GC enters a list of subcontractors being paid in a draw. System generates a compliance report showing which subs are current vs. expired. Provides a printable/exportable report for the title company.
- Before approving payment, GC/consultant can see at a glance if all subs on the draw are compliant.

### Data & Reporting
- [INFERRED] Annual audit export: Generate a report showing insurance verification history for all subcontractors over a given time period — supports the annual audit requirement mentioned by Dawn.
- [INFERRED] Subcontractor history: Track all past certificates, verification dates, and agent communications per sub.
- [INFERRED] Cross-GC subcontractor view (consultant only): See which subcontractors work for multiple GCs.

## UX Considerations

### Information Architecture
- **Top-level navigation:** Dashboard (home), General Contractors, Subcontractors, Insurance Agents, [INFERRED] Notifications, [INFERRED] Settings
- **Dashboard:** Summary KPI cards → filterable compliance table → detail drawer on row click
- **Progressive disclosure:** Table rows show key info (name, status, expiration dates). Full detail (policy numbers, documents, history, agent contact) appears in a side drawer or detail page.

### Design Direction
- Clean, modern aesthetic. White/light gray backgrounds with a strong accent color (suggest a deep blue or teal for trustworthiness — appropriate for insurance/compliance).
- [INFERRED] Minimal use of construction-industry "rugged" aesthetics — Dawn wants professional/corporate.
- Typography: Modern sans-serif (Inter, DM Sans, or similar).
- [INFERRED] New brand identity needed. SubShield suggests protection/compliance. Logo concept: a shield icon with a checkmark or certificate motif.

### Key User Flows
1. **Onboard new sub:** Consultant → Add Subcontractor form → Enter sub info + agent info → System sends verification email to agent → Agent clicks link → Uploads cert or confirms → Status updates on dashboard.
2. **Pre-payment check:** GC logs in → Views dashboard → Filters by "upcoming draw" → Sees compliance status of all subs → Any red/amber triggers action → Consultant sends verification request → Agent confirms → GC approves payment.
3. **Expiration alert:** System detects 30-day expiration → Sends email to agent → Agent uploads renewal cert → Consultant reviews → Status returns to green. If agent doesn't respond, escalation email sent, consultant notified.

### Mobile Considerations
- Responsive breakpoints for phone and tablet.
- GC mobile view should prioritize: compliance status list with color indicators, ability to tap a sub to see detail, and a search/filter bar.
- [INFERRED] Minimize data entry on mobile — complex forms (add subcontractor, manage templates) are better on desktop.

## Technical Considerations

### Integrations
- **Email service:** Resend or SendGrid for transactional emails (verification requests, expiration alerts, lapse notifications). Must support HTML templates and tracking (open/click rates for verification links). [INFERRED]
- **File storage:** Supabase Storage or S3-compatible for certificate PDFs and W9 documents. [INFERRED]
- **Magic link generation:** Unique, time-limited URLs for agent verification responses. [INFERRED] Links should expire after 7 days with a resend option.
- **[INFERRED] Cron/scheduled jobs:** Background job to check expiration dates daily and trigger notification emails at appropriate thresholds (30-day, 14-day, 7-day, day-of, post-expiration).

### Data Model (Core Entities)
- **Consultants** (Dawn and potentially future consultants)
- **General Contractors** (linked to a consultant)
- **Subcontractors** (linked to one or more GCs; shared across GCs but scoped per GC view)
- **Insurance Agents** (linked to subcontractors; an agent may serve multiple subs)
- **Insurance Policies** (GL and WC per subcontractor, with expiration, status, coverage amount, policy number)
- **Certificates** (uploaded documents linked to a policy)
- **Verification Requests** (log of all emails sent and responses received)
- [INFERRED] **Email Templates** (customizable per GC)

### Compliance & Regulatory Notes
- Idaho sole proprietors are exempt from WC under Idaho Code §72-212(4), but GCs may contractually require it. System should flag sole proprietors and allow the GC to decide whether to require WC.
- Idaho statutory minimum for GL is $300K (Idaho Contractor Registration Act), but industry standard is $1M. System should default to $1M but allow customization per GC.
- Standard WC employer's liability is $500K/$500K/$500K.
- No Idaho state regulation governs digital COI verification — this is a private/contractual tool. No specific digital compliance requirements to meet.
- [INFERRED] The system should log all verification activities with timestamps for audit defense. The annual audit requirement means the system is effectively an audit trail.

### Hosting & Cost Considerations
- Dawn has no existing infrastructure. Supabase free tier supports up to 50K monthly active users and 1GB database — more than sufficient for MVP scale (10 GCs, 100 subs).
- [INFERRED] Estimated monthly cost for MVP: $0–$25/month (Supabase free/pro tier + email service free tier for low volume).
- Domain registration needed. Suggest purchasing subshield.com or similar.

## Competitive Landscape

### Direct Competitors

| Platform | Pricing | Free Tier | Target Market | Key Differentiator |
|---|---|---|---|---|
| **myCOI** | Custom quote (enterprise) | No | Mid-market, multi-industry | AI-powered OCR certificate review, dedicated CSM |
| **TrustLayer** | Free (<50 vendors), paid tiers via demo | Yes | SMB to mid-market | AI + RPA verification, vendors don't need accounts |
| **Jones** | Per-record/year, custom pricing | No | Construction & CRE only | Human auditors + AI, 24hr turnaround, Procore integration |
| **BCS** | Starts at $0.95/vendor/month | Freemium | SMB to enterprise | Most transparent pricing, real-time compliance feedback |
| **CertFocus** | $6–29/vendor/year | No | Mid-market | Fastest AI processing (Hawk-I), unlimited users |
| **Avetta** | $100–500+/year, opaque billing | No | Enterprise, global | Broadest supply chain coverage; worst user sentiment (38% satisfaction) |

### SubShield's Competitive Positioning

**SubShield wins on:**
- **Simplicity:** Single-purpose tool vs. enterprise platforms with dozens of unused features. Dawn's #1 pain point is that Procore/HCSS/Avetta are "too many functions" and "very cumbersome."
- **Cost:** Near-zero infrastructure cost at MVP scale vs. enterprise custom pricing or per-vendor fees.
- **Agent workflow:** Magic-link email flow for agents (no account needed) mirrors TrustLayer's approach — the best practice in this space.
- **Idaho-specific knowledge:** Built with Idaho regulatory requirements (sole proprietor exemptions, IIC registration, statutory employer liability) baked in, not as an afterthought.

**Potential competitive risks:**
- TrustLayer's free tier (up to 50 vendors) is a direct alternative at Dawn's current scale. However, TrustLayer is more complex and not tailored to the consultant-as-intermediary workflow.
- BCS at $0.95/vendor/month (~$95/month for 100 subs) is affordable and feature-rich. SubShield differentiates on simplicity and the consultant management layer.

## Open Questions

1. **W9 parsing priority:** The notes mention AI-based W9 ingestion ("can ingest and parse and fill out what it can"). Is this a Day 1 must-have or can manual entry with file upload suffice for the prototype? (Recommended: Phase 2 for AI parsing.)
2. **Ghost policy handling:** The notes mention "ghost policy is also an option." What specific workflow does Dawn envision around ghost policies? Just a status flag, or a different verification flow?
3. **Subcontract agreement signing:** Marked as "nice to have, not MVP." Confirm this is excluded from the prototype scope.
4. **Email sending domain:** Will Dawn register a custom domain for sending emails (e.g., notifications@subshield.com) or is sending from a generic service domain acceptable for the prototype?
5. **Endorsement details:** Notes mention "something about endorsement but missed it." Need to clarify what endorsement workflow Dawn expects beyond the Additional Insured checkbox.
6. **Future SaaS resale model:** Dawn initially wanted to resell but MVP is for her own use. Should the data model be multi-tenant from the start (minimal extra effort) to avoid a rewrite later, or truly single-tenant?
