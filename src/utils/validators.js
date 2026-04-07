export function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email format';
  return null;
}

export function validatePhone(phone) {
  if (!phone) return 'Phone is required';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) return 'Phone must be at least 10 digits';
  return null;
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateFutureDate(dateStr) {
  if (!dateStr) return null; // optional field
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return 'Date must be in the future';
  return null;
}

export function validatePositiveNumber(value, fieldName) {
  if (value == null || value === '') return null;
  const num = Number(value);
  if (isNaN(num) || num <= 0) return `${fieldName} must be a positive number`;
  return null;
}

export function validateForm(fields) {
  const errors = {};
  for (const [key, validators] of Object.entries(fields)) {
    for (const validate of validators) {
      const error = validate();
      if (error) {
        errors[key] = error;
        break;
      }
    }
  }
  return errors;
}
