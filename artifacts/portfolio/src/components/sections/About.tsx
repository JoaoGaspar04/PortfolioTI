import { motion } from "framer-motion";
import { Server, Users, Award, ShieldCheck } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export function About() {
  const { t } = useLang();

  const STATS = [
    { icon: Award,      value: "3+",   label: t.about.stats.experience, color: "text-primary" },
    { icon: Users,      value: "500+", label: t.about.stats.tickets,    color: "text-secondary" },
    { icon: ShieldCheck,value: "99%",  label: t.about.stats.satisfaction,color: "text-accent" },
    { icon: Server,     value: "10+",  label: t.about.stats.systems,    color: "text-emerald-400" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.about.title} <span className="text-primary">{t.about.titleAccent}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto border border-border/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
              <img
                src={`${import.meta.env.BASE_URL}images/avatar.png`}
                alt="João Gaspar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 blur-3xl rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">{t.about.subtitle}</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-xl text-center hover:-translate-y-1 transition-transform duration-300">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground font-display">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
