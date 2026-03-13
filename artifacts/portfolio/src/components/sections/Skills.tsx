import { motion } from "framer-motion";
import { MonitorSmartphone, Database, Network, Wrench } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Helpdesk & Suporte",
    icon: MonitorSmartphone,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    skills: ["Windows 10/11", "Active Directory", "Office 365", "ITSM / Ticketing", "Remote Desktop", "Gestão de Incidentes"]
  },
  {
    title: "Sistemas & Servidores",
    icon: Database,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    skills: ["Windows Server 2019/2022", "Linux (Ubuntu/CentOS)", "VMware/Hyper-V", "Backup & Recovery", "DNS/DHCP", "PowerShell"]
  },
  {
    title: "Redes",
    icon: Network,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
    skills: ["TCP/IP", "VLANs", "Cisco (CCNA level)", "Firewalls (pfSense)", "Monitorização", "VPN"]
  },
  {
    title: "Ferramentas",
    icon: Wrench,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    skills: ["Zabbix", "Nagios", "Wireshark", "Git", "Microsoft SCCM", "ServiceNow"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
};

export function Skills() {
  return (
    <section id="competencias" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Minhas <span className="text-secondary">Competências</span></h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={item}
              className="glass-panel p-8 rounded-2xl group hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${category.bg} ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${category.border} bg-background/50 hover:${category.bg} transition-colors cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
