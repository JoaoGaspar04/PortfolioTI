import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle2, Linkedin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

export function Contact() {
  const { t } = useLang();
  const f = t.contact.form;

  const contactSchema = z.object({
    name: z.string().min(2, f.nameError),
    email: z.string().email(f.emailError),
    message: z.string().min(10, f.messageError),
  });
  type ContactForm = z.infer<typeof contactSchema>;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setSendError(null);
    try {
      const url = (`${import.meta.env.BASE_URL}/api/contact`).replace(/([^:])\/\//g, "$1/");
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        setSendError(err.error ?? "Failed to send. Please try again.");
        return;
      }
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 7000);
    } catch {
      setSendError("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.contact.title} <span className="text-primary">{t.contact.titleAccent}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: MapPin, label: t.contact.location, value: t.contact.locationValue, color: "text-primary", bg: "bg-primary/10", href: undefined },
              { icon: Mail, label: t.contact.email, value: "joaogaspar04@exemplo.pt", color: "text-secondary", bg: "bg-secondary/10", href: "mailto:joaogaspar04@exemplo.pt" },
              { icon: Phone, label: t.contact.phone, value: "+351 912 345 678", color: "text-accent", bg: "bg-accent/10", href: "tel:+351912345678" },
              { icon: Linkedin, label: t.contact.linkedin, value: "linkedin.com/in/joacgaspar", color: "text-blue-400", bg: "bg-blue-500/10", href: "https://www.linkedin.com/in/joacgaspar/" },
            ].map(({ icon: Icon, label, value, color, bg, href }) => (
              <div key={label} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
                <div className={`p-4 rounded-full ${bg} ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{label}</h4>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={`text-muted-foreground hover:${color} transition-colors`}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="lg:col-span-3 glass-panel p-8 rounded-3xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">{t.contact.success.title}</h3>
                <p className="text-muted-foreground">{t.contact.success.body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {[
                  { id: "name", label: f.name, type: "text", placeholder: f.namePlaceholder, field: "name" as const, error: errors.name },
                  { id: "email", label: f.email, type: "email", placeholder: f.emailPlaceholder, field: "email" as const, error: errors.email },
                ].map(({ id, label, type, placeholder, field, error }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">{label}</label>
                    <input
                      id={id}
                      type={type}
                      {...register(field)}
                      className={cn(
                        "w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50",
                        error && "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                      )}
                      placeholder={placeholder}
                    />
                    {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{f.message}</label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={cn(
                      "w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50 resize-none",
                      errors.message && "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    )}
                    placeholder={f.messagePlaceholder}
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {sendError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {sendError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <><Send className="w-5 h-5" /> {f.submit}</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
