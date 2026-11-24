"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { buttonClass, inputClass, labelClass, validateCredentials } from "../validation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    const message = validateCredentials(email, password);
    setError(message);
    if (message) return;

    // TODO(#3): call the login endpoint through src/lib/api once the API contract is published.
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <label className={labelClass}>
        Email
        <input name="email" type="email" autoComplete="email" required className={inputClass} />
      </label>
      <label className={labelClass}>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button type="submit" className={buttonClass}>
        Sign in
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        No account yet?{" "}
        <Link href="/register" className="font-medium text-zinc-900 underline dark:text-zinc-100">
          Create one
        </Link>
      </p>
    </form>
  );
}
