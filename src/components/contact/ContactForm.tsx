"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const labelBase =
  "pointer-events-none absolute left-4 text-sm text-muted transition-all duration-200 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:text-xs";

const fieldBase =
  "peer w-full rounded-2xl border border-border bg-surface-2/40 px-4 text-foreground placeholder-transparent outline-none transition focus:border-accent focus:ring-2 focus:ring-ring";

const initialForm = { name: "", email: "", message: "", website: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function update(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
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
      setError(
        caught instanceof Error ? caught.message : "Something went wrong.",
      );
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative">
          <input
            id="name"
            name="name"
            placeholder=" "
            required
            value={form.name}
            onChange={update}
            className={cn(fieldBase, "h-14 pt-4")}
          />
          <label
            htmlFor="name"
            className={cn(
              labelBase,
              "top-1/2 -translate-y-1/2 peer-focus:top-3 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0",
            )}
          >
            Full name
          </label>
        </div>

        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            required
            value={form.email}
            onChange={update}
            className={cn(fieldBase, "h-14 pt-4")}
          />
          <label
            htmlFor="email"
            className={cn(
              labelBase,
              "top-1/2 -translate-y-1/2 peer-focus:top-3 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0",
            )}
          >
            Email address
          </label>
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder=" "
          required
          value={form.message}
          onChange={update}
          className={cn(fieldBase, "resize-none pb-3 pt-7")}
        />
        <label
          htmlFor="message"
          className={cn(
            labelBase,
            "top-4 peer-focus:top-2.5 peer-[:not(:placeholder-shown)]:top-2.5",
          )}
        >
          Your message
        </label>
      </div>

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

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" magnetic disabled={sending}>
          {sending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-accent/40 border-t-on-accent" />
              Sending…
            </>
          ) : (
            <>
              <FiSend />
              Send message
            </>
          )}
        </Button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-400"
            >
              <FiCheckCircle /> Message sent — I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-red-400"
            >
              <FiAlertCircle /> {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
