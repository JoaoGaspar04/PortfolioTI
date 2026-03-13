import { motion } from "framer-motion";
import { FolderGit2, Activity, Terminal } from "lucide-react";

const PROJECTS = [
  {
    title: "Implementação de AD",
    description: "Migração de grupo de trabalho local para domínio estruturado. Implementação de Active Directory do zero para uma empresa com 150 utilizadores, incluindo GPOs de segurança e mapeamento de drives.",
    icon: FolderGit2,
    tags: ["Windows Server", "Active Directory", "GPO", "Segurança"]
  },
  {
    title: "Monitoring Dashboard",
    description: "Desenvolvimento e configuração de um dashboard centralizado para monitorização pró-ativa da rede. Integração do Zabbix com o Grafana para visualização em tempo real de latência, CPU e tráfego.",
    icon: Activity,
    tags: ["Zabbix", "Grafana", "SNMP", "Linux"]
  },
  {
    title: "Automatização PowerShell",
    description: "Criação de um conjunto de scripts complexos em PowerShell para automatizar o onboarding e offboarding de colaboradores, garantindo criação de contas (AD/Exchange) e atribuição de permissões corretas em segundos.",
    icon: Terminal,
    tags: ["PowerShell", "Office 365", "Automação", "Scripting"]
  }
];

export function Projects() {
  return (
    <section id="projetos" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Projetos em <span className="text-accent">Destaque</span></h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all duration-300 border-t-2 border-t-transparent hover:border-t-accent flex flex-col h-full"
            >
              <div className="p-4 rounded-xl bg-accent/10 text-accent w-fit mb-6 group-hover:scale-110 transition-transform">
                <project.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 text-foreground/80">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
