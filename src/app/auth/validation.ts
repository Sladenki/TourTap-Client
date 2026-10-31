const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function isEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/** Normalize RU phone to 11 digits starting with 7/8. */
export function normalizePhoneDigits(value: string) {
  let digits = digitsOnly(value);
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits.length === 10) digits = `7${digits}`;
  return digits.slice(0, 11);
}

export function formatPhone(value: string) {
  const digits = normalizePhoneDigits(value);
  if (!digits) return "";

  const local = digits.startsWith("7") ? digits.slice(1) : digits;
  const parts = [
    local.slice(0, 3),
    local.slice(3, 6),
    local.slice(6, 8),
    local.slice(8, 10),
  ].filter(Boolean);

  let result = "+7";
  if (parts[0]) result += ` (${parts[0]}`;
  if (parts[0]?.length === 3) result += ")";
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;
  return result;
}

export function isPhone(value: string) {
  const digits = normalizePhoneDigits(value);
  return digits.length === 11 && digits.startsWith("7");
}

export function looksLikePhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.includes("@")) return false;
  return /^[+]?[\d\s()-]+$/.test(trimmed) || /^\d/.test(trimmed);
}

export function emailError(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (!isEmail(trimmed)) return "Введите корректный email, например example@mail.ru";
  return "";
}

export function phoneError(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (!isPhone(trimmed)) return "Введите номер в формате +7 (999) 999-99-99";
  return "";
}

export function loginError(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (looksLikePhone(trimmed)) return phoneError(trimmed);
  return emailError(trimmed);
}

export function isValidLogin(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return looksLikePhone(trimmed) ? isPhone(trimmed) : isEmail(trimmed);
}

export function passwordRules(password: string) {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasDigit: /\d/.test(password),
  };
}

export function passwordScore(password: string) {
  if (!password) return 0;

  const rules = passwordRules(password);
  const met = [rules.minLength, rules.hasUppercase, rules.hasDigit].filter(Boolean).length;

  // Any input should immediately show a weak state.
  return met === 0 ? 1 : met;
}

export function passwordComplete(password: string) {
  const rules = passwordRules(password);
  return rules.minLength && rules.hasUppercase && rules.hasDigit;
}

/** Letters, spaces, hyphens and apostrophes only — no digits. */
export function formatName(value: string) {
  return value.replace(/[0-9]/g, "");
}
