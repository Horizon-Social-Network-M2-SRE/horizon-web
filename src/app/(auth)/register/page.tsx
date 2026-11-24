"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { buttonClass, inputClass, labelClass, validateCredentials } from "../validation";

type UserType = "student" | "staff" | "teacher";

// The one field that depends on the user type: its form name and label.
const EXTRA_FIELD: Record<UserType, { name: string; label: string }> = {
  student: { name: "major", label: "Major" },
  staff: { name: "adminRole", label: "Admin role" },
  teacher: { name: "speciality", label: "Speciality" },
};

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>("student");
  const [error, setError] = useState<string | null>(null);
  const extra = EXTRA_FIELD[userType];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    const message = validateCredentials(email, password);
    setError(message);
    if (message) return;

    // TODO(#3): call the register endpoint through src/lib/api once the API contract is published.
    // Payload: firstName, lastName, email, password, userType and the type-specific
    // field (major | adminRole | speciality).
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          First name
          <input name="firstName" autoComplete="given-name" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Last name
          <input name="lastName" autoComplete="family-name" required className={inputClass} />
        </label>
      </div>
      <label className={labelClass}>
        Email
        <input name="email" type="email" autoComplete="email" required className={inputClass} />
      </label>
      <label className={labelClass}>
        Password
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        I am a
        <select
          name="userType"
          value={userType}
          onChange={(event) => setUserType(event.target.value as UserType)}
          className={inputClass}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="teacher">Teacher</option>
        </select>
      </label>
      {/* The key resets the input when the type changes, so a major never ends up sent as adminRole. */}
      <label key={extra.name} className={labelClass}>
        {extra.label}
        <input name={extra.name} required className={inputClass} />
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button type="submit" className={buttonClass}>
        Create account
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-zinc-900 underline dark:text-zinc-100">
          Sign in
        </Link>
      </p>
    </form>
  );
}
