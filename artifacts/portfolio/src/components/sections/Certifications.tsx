import { motion } from "framer-motion";
import { Shield, Clock } from "lucide-react";

const CERTS = [
  {
    name: "Microsoft Certified: Azure Fundamentals",
    code: "AZ-900",
    status: "Concluído",
    icon: Shield,
    color: "text-blue-400"
  },
  {
    name: "CompTIA A+",
    code: "Core 1 & Core 2",
    status: "Concluído",
    icon: Shield,
    color: "text-red-400"
  },
  {
    name: "Cisco CCNA",
    code: "200-301",
    status: "Em Progresso",
    icon: Clock,
    color: "text-amber-400"
  },
  {
    name: "ITIL 4 Foundation",
    code: "IT Service Management",
    status: "Concluído",
    icon: Shield,
    color: "text-emerald-400"
  }
];

export function Certifications() {
  return (
    <section className="py-12 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold">Certificações</h2>
          <div className="flex-1 h-px bg-border/50" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-5 rounded-xl flex items-start gap-4 hover:-translate-y-1 transition-transform"
            >
              <div className={`p-3 rounded-lg bg-white/5 ${cert.color}`}>
                <cert.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{cert.code}</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cert.status === 'Concluído' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
                  {cert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
