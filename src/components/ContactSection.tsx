"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!emailPattern.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message =
        "Please add a short project brief (at least 10 characters).";
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 550));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard write unavailable in restricted contexts
    }
  };

  const inputClass =
    "mt-2 w-full min-h-[46px] rounded-[12px] border border-[rgba(211,227,255,0.18)] bg-[#0B1020]/65 px-4 py-3 text-sm text-[#F3F6FC] placeholder:text-[#B7C1D6]/45 transition-colors focus:border-[#9EDBFF] focus:outline-none focus:ring-2 focus:ring-[#9EDBFF]/40";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-[rgba(211,227,255,0.08)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(158,219,255,0.19) 0%, rgba(169,167,248,0.13) 45%, rgba(11,16,32,0) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[680px] px-5 sm:px-8">
        {/* Centered Header + Accent Bar (matching video 33.0s & 36.0s) */}
        <Reveal>
          <SectionHeading
            align="center"
            accentBar
            eyebrow="GET IN TOUCH"
            heading="CONTACT."
            intro="Open to internships, AI/web collaborations, hackathons, and design projects."
            id="contact-heading"
          />
        </Reveal>

        {/* Single Sleek Pill Direct-Contact Strip Above Form */}
        <Reveal delay={0.06}>
          <div className="glass-panel mt-8 flex flex-col justify-between gap-3.5 rounded-2xl px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(211,227,255,0.2)] bg-[#0B1020]/55 text-[#9EDBFF]">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.14em] text-[#B7C1D6] uppercase">
                  Direct Email
                </p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="block truncate text-sm font-medium text-[#F3F6FC] transition-colors hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={PERSONAL_INFO.discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#A9A7F8]/40 bg-[#A9A7F8]/12 px-3.5 text-xs font-medium text-[#C9B8F4] transition-colors hover:bg-[#A9A7F8]/22 hover:text-[#F3F6FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9A7F8]"
              >
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Discord</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="glass-button inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 text-xs text-[#F3F6FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                {copied ? (
                  <>
                    <Check
                      className="h-3.5 w-3.5 text-[#8FE3CB]"
                      aria-hidden="true"
                    />
                    <span className="text-[#8FE3CB]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Centered Frosted Glass Form with Centered Glowing Pill CTA */}
        <Reveal delay={0.12}>
          <div className="glass-panel mt-5 p-6 sm:p-8">
            {isSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="py-8 text-center sm:py-10"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#8FE3CB]/40 bg-[#8FE3CB]/12 text-[#8FE3CB]">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-medium text-[#F3F6FC]">
                  Message received.
                </h3>
                <p className="mx-auto mt-2 max-w-[42ch] text-sm text-[#B7C1D6]">
                  Thanks, {name.trim()}! I’ve noted your message — you can also
                  ping me directly in my Discord server anytime.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setMessage("");
                      setErrors({});
                      setIsSubmitted(false);
                    }}
                    className="glass-button inline-flex min-h-[42px] items-center rounded-full px-5 text-xs font-medium text-[#F3F6FC]"
                  >
                    Send another message
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                      `Portfolio Enquiry from ${name.trim()}`
                    )}&body=${encodeURIComponent(message.trim())}`}
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#8FE3CB] px-5 text-xs font-medium text-[#0B1020]"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[11px] tracking-wider text-[#B7C1D6] uppercase"
                    >
                      Your Name{" "}
                      <span aria-hidden="true" className="text-[#9EDBFF]">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className={inputClass}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[#C9B8F4]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[11px] tracking-wider text-[#B7C1D6] uppercase"
                    >
                      Your Email{" "}
                      <span aria-hidden="true" className="text-[#9EDBFF]">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className={inputClass}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[#C9B8F4]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[11px] tracking-wider text-[#B7C1D6] uppercase"
                  >
                    Message & Project Scope{" "}
                    <span aria-hidden="true" className="text-[#9EDBFF]">
                      *
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Let's build something impactful together..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message)
                        setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className={`${inputClass} min-h-[120px] resize-y`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 text-xs text-[#C9B8F4]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#9EDBFF] px-9 text-sm font-medium text-[#0B1020] shadow-[0_8px_28px_rgba(158,219,255,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B8E5FF] hover:shadow-[0_12px_34px_rgba(158,219,255,0.4)] active:translate-y-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111A33]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>

                  <ul
                    aria-label="Direct profile links"
                    className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-[rgba(211,227,255,0.1)] pt-4"
                  >
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          target={social.id === "email" ? undefined : "_blank"}
                          rel={
                            social.id === "email"
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="group inline-flex min-h-[40px] items-center gap-1 text-xs text-[#B7C1D6] transition-colors hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
                        >
                          <span>{social.label}</span>
                          <ArrowUpRight
                            className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
