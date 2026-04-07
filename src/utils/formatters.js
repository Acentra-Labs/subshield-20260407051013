import { format, parseISO, formatDistanceToNow } from 'date-fns';

export function formatCurrency(cents) {
  if (cents == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cents / 100);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'MMM d, yyyy');
}

export function formatDateRelative(dateStr) {
  if (!dateStr) return '—';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatPhone(phone) {
  if (!phone) return '—';
  return phone;
}

export function formatPolicyType(type) {
  if (type === 'gl') return 'General Liability';
  if (type === 'wc') return 'Workers\' Comp';
  return type;
}

export function formatRequestType(type) {
  const map = {
    initial_verification: 'Initial Verification',
    expiration_reminder: 'Expiration Reminder',
    lapse_notification: 'Lapse Notification',
    manual_request: 'Manual Request',
  };
  return map[type] || type;
}

export function formatVerificationStatus(status) {
  const map = {
    pending: 'Pending',
    sent: 'Sent',
    delivered: 'Delivered',
    opened: 'Opened',
    completed: 'Completed',
    expired: 'Expired',
    failed: 'Failed',
  };
  return map[status] || status;
}

export function formatFileSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
