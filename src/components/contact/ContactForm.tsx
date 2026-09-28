"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { RiCheckboxCircleFill, RiErrorWarningFill, RiSendPlaneFill } from "react-icons/ri";
import { PrimaryButton } from "@/components/bento/Primitives";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const labelClass = "text-[13px] font-medium text-muted";
const fieldClass =
  "w-full rounded-tile border border-line bg-surface px-4 text-sm font-medium text-fg placeholder:text-[#5f5f5f] outline-none transition-colors duration-200 hover:border-line-strong focus:border-primary focus:ring-2 focus:ring-primary/30";

const initialForm = { name: "", email: "", message: "", website: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-5 sm:p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Full name</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            value={form.name}
            onChange={update}
            className={cn(fieldClass, "h-12")}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={update}
            className={cn(fieldClass, "h-12")}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Your message</span>
        <textarea
          name="message"
          rows={7}
          placeholder="Tell me about your project, timeline and goals…"
          required
          value={form.message}
          onChange={update}
          className={cn(fieldClass, "resize-none py-3 leading-relaxed")}
        />
      </label>

      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={update}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <PrimaryButton type="submit" disabled={sending}>
          {sending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              <RiSendPlaneFill aria-hidden className="size-4" />
              Send message
            </>
          )}
        </PrimaryButton>

        <p role="status" aria-live="polite" className="text-sm font-medium">
          {status === "success" && (
            <span className="flex animate-[fade-up_0.4s_ease-out] items-center gap-2 text-[#34c759]">
              <RiCheckboxCircleFill aria-hidden /> Message sent — I&apos;ll get back to you soon.
            </span>
          )}
          {status === "error" && (
            <span className="flex animate-[fade-up_0.4s_ease-out] items-center gap-2 text-[#ff6b6b]">
              <RiErrorWarningFill aria-hidden /> {error}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
