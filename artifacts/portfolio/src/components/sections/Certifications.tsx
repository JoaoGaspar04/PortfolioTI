import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Network, Server, Cloud, Lock, ChevronDown, Star, BookOpen, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Todos" | "Cisco" | "Fortinet" | "Microsoft" | "Cibersegurança" | "Linux & Sistemas" | "IT Support" | "Formação";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  category: Exclude<Category, "Todos">;
  featured?: boolean;
}

const CERTS: Cert[] = [
  // Formação Académica / Profissional
  { name: "Técnico de Informática e Gestão de Redes", issuer: "Ensiguarda – Escola Profissional da Guarda", date: "2022", category: "Formação", featured: true },
  { name: "CTesp de Cibersegurança", issuer: "Politécnico da Guarda", date: "2025", category: "Formação", featured: true },

  // IT Support
  { name: "Google IT Support", issuer: "Google / Coursera", date: "2025", category: "IT Support", featured: true },
  { name: "IBM IT Support", issuer: "IBM / Coursera", date: "2025", category: "IT Support", featured: true },
  { name: "Microsoft IT Support Specialist", issuer: "Microsoft / Coursera", date: "2025", category: "IT Support", featured: true },

  // Cisco
  { name: "CCNA 1 – Introdução a Redes de Computadores", issuer: "Universidade da Beira Interior", date: "fev 2026", category: "Cisco", featured: true },
  { name: "Hacker Ético", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Cyber Threat Management", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Trilha: Analista de Cibersegurança Júnior", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Introdução à Cibersegurança", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Defesa de Rede", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Segurança de Endpoint", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Dispositivos de Rede e Configuração Inicial", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Conceitos Básicos de Redes", issuer: "Cisco Networking Academy", date: "jan 2026", category: "Cisco" },
  { name: "Cisco Packet Tracer", issuer: "Cisco Networking Academy", date: "fev 2024", category: "Cisco" },

  // Fortinet
  { name: "Network Security Support Engineer", issuer: "Fortinet", date: "dez 2025", category: "Fortinet" },
  { name: "FortiGate Administrator", issuer: "Fortinet", date: "dez 2025", category: "Fortinet" },
  { name: "Enterprise Firewall Administrator", issuer: "Fortinet", date: "dez 2025", category: "Fortinet" },
  { name: "FortiAnalyzer Administrator", issuer: "Fortinet", date: "dez 2025", category: "Fortinet" },
  { name: "FortiManager Administrator", issuer: "Fortinet", date: "dez 2025", category: "Fortinet" },
  { name: "Fortinet Network Security", issuer: "Fortinet", date: "dez 2025", category: "Fortinet" },

  // Microsoft
  { name: "Microsoft 365 Fundamentals", issuer: "Academy Microsoft 365 atWork", date: "fev 2026", category: "Microsoft" },
  { name: "BE COPILOT READY", issuer: "Academy Microsoft 365 atWork", date: "fev 2026", category: "Microsoft" },
  { name: "Microsoft Cloud Support Associate", issuer: "Microsoft", date: "dez 2025", category: "Microsoft" },
  { name: "Azure Backup, Security & Compliance Administration", issuer: "Microsoft", date: "dez 2025", category: "Microsoft" },
  { name: "Windows Server Administration", issuer: "Packt", date: "dez 2025", category: "Microsoft" },

  // Cibersegurança
  { name: "Enterprise and Infrastructure Security", issuer: "New York University", date: "jan 2026", category: "Cibersegurança" },
  { name: "Real-Time Cyber Threat Detection and Mitigation", issuer: "New York University", date: "dez 2025", category: "Cibersegurança" },
  { name: "Introduction to Cyber Attacks", issuer: "New York University", date: "dez 2025", category: "Cibersegurança" },
  { name: "Cyber Incident Response", issuer: "InfoSEC", date: "dez 2025", category: "Cibersegurança" },
  { name: "Technical Deep Dive with Incident Response Tools", issuer: "InfoSEC", date: "dez 2025", category: "Cibersegurança" },
  { name: "Stages of Incident Response", issuer: "InfoSEC", date: "dez 2025", category: "Cibersegurança" },

  // Linux & Sistemas
  { name: "Linux Foundation Certified System Administrator (LFCS)", issuer: "Pearson", date: "dez 2025", category: "Linux & Sistemas", featured: true },
  { name: "cPanel Professional", issuer: "cPanel", date: "dez 2025", category: "Linux & Sistemas", featured: true },
  { name: "cPanel & WHM System Administrator I", issuer: "cPanel", date: "dez 2025", category: "Linux & Sistemas", featured: true },
  { name: "Linux for AIX System Administrators", issuer: "IBM", date: "dez 2025", category: "Linux & Sistemas" },
];

const CATEGORIES: Category[] = ["Todos", "Formação", "IT Support", "Cisco", "Fortinet", "Microsoft", "Cibersegurança", "Linux & Sistemas"];

const CATEGORY_STYLES: Record<Exclude<Category, "Todos">, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  "Formação":         { bg: "bg-amber-500/10",   text: "text-amber-400",  border: "border-amber-500/30",  icon: BookOpen },
  "IT Support":       { bg: "bg-teal-500/10",    text: "text-teal-400",   border: "border-teal-500/30",   icon: Headphones },
  "Cisco":            { bg: "bg-blue-500/10",    text: "text-blue-400",   border: "border-blue-500/30",   icon: Network },
  "Fortinet":         { bg: "bg-red-500/10",     text: "text-red-400",    border: "border-red-500/30",    icon: Shield },
  "Microsoft":        { bg: "bg-sky-500/10",     text: "text-sky-400",    border: "border-sky-500/30",    icon: Cloud },
  "Cibersegurança":   { bg: "bg-purple-500/10",  text: "text-purple-400", border: "border-purple-500/30", icon: Lock },
  "Linux & Sistemas": { bg: "bg-emerald-500/10", text: "text-emerald-400",border: "border-emerald-500/30",icon: Server },
};

const INITIAL_VISIBLE = 9;
const FEATURED = CERTS.filter((c) => c.featured);

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [showAll, setShowAll] = useState(false);

  const nonFeatured = activeCategory === "Todos"
    ? CERTS.filter((c) => !c.featured)
    : CERTS.filter((c) => c.category === activeCategory && !c.featured);

  const featuredFiltered = activeCategory === "Todos"
    ? FEATURED
    : CERTS.filter((c) => c.category === activeCategory && c.featured);

  const visibleNonFeatured = showAll ? nonFeatured : nonFeatured.slice(0, INITIAL_VISIBLE);
  const hasMore = nonFeatured.length > INITIAL_VISIBLE;

  return (
    <section id="certificacoes" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Licenças & <span className="text-accent">Certificações</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">
            {CERTS.length} certificações obtidas em plataformas internacionais de referência
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                activeCategory === cat
                  ? "bg-accent text-background border-accent"
                  : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground"
              )}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-60">
                ({cat === "Todos" ? CERTS.length : CERTS.filter(c => c.category === cat).length})
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* Featured Section */}
            {featuredFiltered.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Em Destaque</span>
                  <div className="flex-1 h-px bg-amber-400/20" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredFiltered.map((cert, idx) => {
                    const style = CATEGORY_STYLES[cert.category];
                    const Icon = style.icon;
                    return (
                      <motion.div
                        key={cert.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className={cn(
                          "relative glass-panel p-5 rounded-xl flex items-start gap-4 border hover:-translate-y-1 transition-transform group",
                          style.border
                        )}
                      >
                        <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-amber-400" /> Destaque
                        </span>
                        <div className={cn("p-3 rounded-lg flex-shrink-0", style.bg, style.text)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 pr-16">
                          <h4 className={cn("font-bold text-sm leading-tight mb-1", style.text)}>
                            {cert.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                          <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", style.bg, style.text)}>
                            {cert.date}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Other Certs */}
            {visibleNonFeatured.length > 0 && (
              <>
                {featuredFiltered.length > 0 && (
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Todas as certificações</span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleNonFeatured.map((cert, idx) => {
                    const style = CATEGORY_STYLES[cert.category];
                    const Icon = style.icon;
                    return (
                      <motion.div
                        key={cert.name + idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="glass-panel p-5 rounded-xl flex items-start gap-4 hover:-translate-y-1 transition-transform group"
                      >
                        <div className={cn("p-2.5 rounded-lg flex-shrink-0", style.bg, style.text)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm leading-tight mb-1 group-hover:text-accent transition-colors">
                            {cert.name}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">{cert.issuer}</p>
                          <span className={cn("inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", style.bg, style.text)}>
                            {cert.date}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Show More */}
        {hasMore && !showAll && (
          <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 font-medium"
            >
              Ver todas as {nonFeatured.length} certificações <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
