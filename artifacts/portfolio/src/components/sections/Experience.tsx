import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Técnico de Helpdesk N1/N2",
    company: "TechSupport Portugal Lda",
    period: "2022 - Presente",
    description: "Suporte técnico presencial e remoto para mais de 300 utilizadores. Resolução de incidentes de hardware e software, gestão de acessos no Active Directory e Office 365. Implementação de scripts em PowerShell para automatização de tarefas repetitivas.",
    current: true
  },
  {
    role: "Técnico de Redes",
    company: "NetServices Lisboa",
    period: "2021 - 2022",
    description: "Instalação, configuração e manutenção de equipamentos de rede em clientes empresariais. Configuração de switches e routers Cisco, implementação de VLANs e troubleshooting de conectividade (TCP/IP, DNS, DHCP).",
    current: false
  },
  {
    role: "Estagiário IT",
    company: "Empresa XYZ",
    period: "2020 - 2021",
    description: "Apoio técnico de primeira linha. Manutenção preventiva de parque informático, formatação de equipamentos, inventariação de hardware e apoio na gestão de backups diários.",
    current: false
  }
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Percurso <span className="text-primary">Profissional</span></h2>
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
              <div className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-4 border-background flex items-center justify-center ${exp.current ? 'bg-primary' : 'bg-muted-foreground'}`}>
                <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-white' : 'bg-background'}`} />
              </div>

              <div className="glass-panel p-6 rounded-2xl hover:border-white/10 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium mt-1">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
