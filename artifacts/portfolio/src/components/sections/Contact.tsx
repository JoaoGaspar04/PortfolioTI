import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, CheckCircle2, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    // Fake submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Entrar em <span className="text-primary">Contacto</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Interessado em colaborar ou tem alguma oportunidade em mente? Sinta-se à vontade para me enviar uma mensagem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info Cards */}
          <motion.div 
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Localização</h4>
                <p className="text-muted-foreground">Lisboa, Portugal</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
              <div className="p-4 rounded-full bg-secondary/10 text-secondary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email</h4>
                <a href="mailto:joaogaspar04@exemplo.pt" className="text-muted-foreground hover:text-secondary transition-colors">
                  joaogaspar04@exemplo.pt
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
              <div className="p-4 rounded-full bg-accent/10 text-accent">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Telemóvel</h4>
                <a href="tel:+351912345678" className="text-muted-foreground hover:text-accent transition-colors">
                  +351 912 345 678
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">LinkedIn</h4>
                <a href="https://www.linkedin.com/in/joacgaspar/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors">
                  linkedin.com/in/joacgaspar
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
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
                <h3 className="text-2xl font-bold font-display mb-2">Mensagem Enviada!</h3>
                <p className="text-muted-foreground">Obrigado pelo seu contacto. Responderei o mais breve possível.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Nome Completo</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={cn(
                      "w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50",
                      errors.name && "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    )}
                    placeholder="O seu nome..."
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Endereço de Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={cn(
                      "w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50",
                      errors.email && "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    )}
                    placeholder="exemplo@empresa.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Mensagem</label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={cn(
                      "w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50 resize-none",
                      errors.message && "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    )}
                    placeholder="Como posso ajudar?..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Enviar Mensagem <Send className="w-5 h-5" />
                    </>
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
