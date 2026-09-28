"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    // No mailing-list backend is wired up yet; this only confirms the address locally.
    setState("done");
  }

  if (state === "done") {
    return (
      <p className="text-sm font-medium text-sea" role="status">
        Thanks. We&apos;ll write when there&apos;s something worth writing about.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="field"
        autoComplete="email"
      />
      <button type="submit" className="btn btn-primary shrink-0">
        Join
      </button>
    </form>
  );
}
