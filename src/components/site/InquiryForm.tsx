import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919503675335";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  message: "",
};

export function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim()))
      return "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Please enter a valid email address.";
    if (!form.address.trim()) return "Please enter your city or address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);

    const text = `Hello, I want to inquire about your services.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}\nMessage: ${form.message || "—"}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
    toast.success("Inquiry ready — opening WhatsApp…");

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        setSent(false);
        setForm(initialState);
      }, 1200);
    }, 700);
  };

  return (
    <section id="inquiry" className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 -z-10 mesh-gradient opacity-60" />
      <div className="absolute left-1/2 top-1/3 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center md:mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="size-1.5 animate-pulse-glow rounded-full bg-accent" />
            Inquiry
          </div>
          <h2 className="font-display mx-auto max-w-[18ch] text-balance text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
            Start a <em className="font-light text-muted-foreground">conversation.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Tell us a little about your project. We'll reply on WhatsApp within minutes.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="glass relative mx-auto max-w-[860px] rounded-[28px] p-6 shadow-elevated md:p-12"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <Field
              label="Full Name"
              value={form.name}
              onChange={update("name")}
              placeholder="Your name"
              required
            />
            <Field
              label="Phone Number"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+91 00000 00000"
              required
            />
            <Field
              label="Email Address"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@domain.com"
              required
            />
            <Field
              label="City / Address"
              value={form.address}
              onChange={update("address")}
              placeholder="Mumbai, India"
              required
            />
            <div className="md:col-span-2">
              <FieldTextarea
                label="Message"
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us about your project (optional)"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={loading || sent}
              className="group relative inline-flex min-w-[240px] items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground px-10 py-5 text-base font-medium tracking-tight text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-glow disabled:opacity-90"
            >
              {loading ? (
                <span className="inline-flex items-center gap-3">
                  <span className="size-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  Sending…
                </span>
              ) : sent ? (
                <span className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Sent
                </span>
              ) : (
                <>
                  Send Inquiry
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </>
              )}
            </button>
            <span className="text-xs text-muted-foreground">
              We usually reply within a few minutes on WhatsApp.
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-focus-within:text-foreground">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] focus:border-accent/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(91,127,255,0.12)]"
      />
    </label>
  );
}

function FieldTextarea({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-focus-within:text-foreground">
        {label}
      </span>
      <textarea
        rows={4}
        {...props}
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] focus:border-accent/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(91,127,255,0.12)]"
      />
    </label>
  );
}