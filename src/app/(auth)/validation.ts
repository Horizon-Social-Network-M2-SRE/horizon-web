// Client-side checks shared by the login and register forms.
// The server stays the source of truth once the API contract exists.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export function validateCredentials(email: string, password: string): string | null {
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Enter a valid email address.";
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return null;
}

export const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100";

export const labelClass = "flex flex-col gap-1 text-sm font-medium";

export const buttonClass =
  "w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-base font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300";
