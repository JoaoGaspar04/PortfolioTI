import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function Experience() {
  const { lang, t } = useLang();
  const { config } = useSiteConfig();

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.experience.title} <span className="text-primary">{t.experience.titleAccent}</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative border-l border-border/50 ml-4 md:ml-8 space-y-12">
          {config.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative pl-8 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-4 border-background flex items-center justify-center ${exp.current ? "bg-primary" : "bg-muted-foreground"}`}>
                <div className={`w-2 h-2 rounded-full ${exp.current ? "bg-white" : "bg-background"}`} />
              </div>

              <div className="glass-panel p-6 rounded-2xl hover:border-white/10 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role[lang]}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium mt-1">
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      {exp.company}
                      <span className="text-muted-foreground text-sm font-normal">· {exp.type[lang]}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-start sm:items-end flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period[lang]}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location[lang]}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">{exp.description[lang]}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags[lang].map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
