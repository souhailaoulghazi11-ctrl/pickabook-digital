"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setMessage("You're on the list. Welcome to PickaBook.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <section className="bg-dark py-20">
      <div className="mx-auto max-w-content px-6 text-center lg:px-10">
        <h2 className="font-display text-[28px] text-paper">
          Subscribe to PickaBook
        </h2>
        <p className="mx-auto mt-3 max-w-[46ch] font-body text-[15px] text-paper/70">
          New releases, quiet recommendations, and the occasional discount —
          a few times a month, never more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full border border-paper/25 bg-transparent px-4 py-3 font-body text-[14px] text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 border border-paper bg-paper px-6 py-3 font-body text-[13px] tracking-wide text-ink transition-colors hover:bg-transparent hover:text-paper disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 font-body text-[13px] ${
              status === "error" ? "text-red-300" : "text-paper/70"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
