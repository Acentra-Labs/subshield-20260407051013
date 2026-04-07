import { differenceInDays, parseISO, isPast } from 'date-fns';

/**
 * Compute compliance status from an expiration date.
 * Returns: 'compliant' | 'expiring_soon' | 'expired' | 'pending' | 'exempt'
 */
export function getComplianceStatus(expirationDate, isExempt = false) {
  if (isExempt) return 'exempt';
  if (!expirationDate) return 'pending';

  const expDate = typeof expirationDate === 'string' ? parseISO(expirationDate) : expirationDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isPast(expDate) && differenceInDays(expDate, today) < 0) return 'expired';

  const daysUntil = differenceInDays(expDate, today);
  if (daysUntil <= 30) return 'expiring_soon';
  return 'compliant';
}

/**
 * Get the overall status for a subcontractor (worst of GL and WC)
 */
export function getOverallStatus(glStatus, wcStatus) {
  const priority = { expired: 0, expiring_soon: 1, pending: 2, exempt: 3, compliant: 4 };
  const glPri = priority[glStatus] ?? 2;
  const wcPri = priority[wcStatus] ?? 2;
  return glPri <= wcPri ? glStatus : wcStatus;
}

/**
 * Get days until expiration (negative = days past)
 */
export function getDaysUntilExpiration(expirationDate) {
  if (!expirationDate) return null;
  const expDate = typeof expirationDate === 'string' ? parseISO(expirationDate) : expirationDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return differenceInDays(expDate, today);
}

/**
 * Status display configuration
 */
export const STATUS_CONFIG = {
  compliant: { label: 'Compliant', color: 'bg-green-100 text-green-800 border-green-300', dotColor: 'bg-green-500', icon: 'CheckCircle' },
  expiring_soon: { label: 'Expiring Soon', color: 'bg-amber-100 text-amber-800 border-amber-300', dotColor: 'bg-amber-500', icon: 'AlertTriangle' },
  expired: { label: 'Expired', color: 'bg-red-100 text-red-800 border-red-300', dotColor: 'bg-red-500', icon: 'XCircle' },
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700 border-gray-300', dotColor: 'bg-gray-400', icon: 'Clock' },
  exempt: { label: 'Exempt', color: 'bg-purple-100 text-purple-800 border-purple-300', dotColor: 'bg-purple-500', icon: 'ShieldCheck' },
};

/**
 * Check if coverage amount is below Idaho industry standard minimums
 */
export function getCoverageWarnings(policy) {
  const warnings = [];
  if (policy.policy_type === 'gl') {
    if (policy.each_occurrence_cents && policy.each_occurrence_cents < 100000000) {
      warnings.push('GL per-occurrence below $1,000,000 industry standard');
    }
    if (policy.aggregate_limit_cents && policy.aggregate_limit_cents < 200000000) {
      warnings.push('GL aggregate below $2,000,000 industry standard');
    }
  }
  if (policy.policy_type === 'wc') {
    if (policy.employer_liability_cents && policy.employer_liability_cents < 50000000) {
      warnings.push('WC employer liability below $500,000 industry standard');
    }
  }
  return warnings;
}
