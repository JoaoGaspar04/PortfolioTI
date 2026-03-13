import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Técnico de Informática e Gestão de Redes",
    company: "Torre Confecções",
    type: "Estágio Curricular Nível 5",
    period: "fev 2025 – jun 2025 · 5 meses",
    location: "Comeal da Torre · Presencial",
    description: "Estágio curricular de nível 5 com foco em cibersegurança, gestão de redes e infraestrutura informática. Responsável pela administração e monitorização da rede local, implementação de medidas de segurança e suporte técnico aos utilizadores.",
    tags: ["Cibersegurança", "Gestão de Redes", "Suporte Técnico", "Infraestrutura IT"],
    current: true,
  },
  {
    role: "Técnico de TI",
    company: "SuporteDreams",
    type: "Estágio Curricular Nível 4",
    period: "abr 2022 – jun 2022 · 3 meses",
    location: "Guarda, Portugal · Presencial",
    description: "Estágio curricular de nível 4 com foco em redes de computadores e suporte técnico. Configuração e manutenção de equipamentos de rede, diagnóstico e resolução de incidentes de hardware e software.",
    tags: ["Redes de Computadores", "Suporte Técnico", "Hardware", "Diagnóstico"],
    current: false,
  },
  {
    role: "Técnico de TI",
    company: "ClickMed.pt",
    type: "Estágio Curricular Nível 4",
    period: "ago 2020 – nov 2020 · 4 meses",
    location: "Covilhã, Castelo Branco · Presencial",
    description: "Estágio curricular de nível 4 na área de tecnologias de informação. Apoio técnico, manutenção de sistemas informáticos e suporte aos utilizadores.",
    tags: ["Suporte Técnico", "Manutenção de Sistemas", "Help Desk"],
    current: false,
  },
];

export function Experience() {
  return (
    <section id="experiencia" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Percurso <span className="text-primary">Profissional</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative border-l border-border/50 ml-4 md:ml-8 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative pl-8 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2 }}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-4 border-background flex items-center justify-center ${
                  exp.current ? "bg-primary" : "bg-muted-foreground"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${exp.current ? "bg-white" : "bg-background"}`}
                />
              </div>

              <div className="glass-panel p-6 rounded-2xl hover:border-white/10 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium mt-1">
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      {exp.company}
                      <span className="text-muted-foreground text-sm font-normal">· {exp.type}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-start sm:items-end flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-medium px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20"
                    >
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
