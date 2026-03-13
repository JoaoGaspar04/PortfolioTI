import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Network, Server, Cloud, Lock, BookOpen,
  Headphones, Star, Search, ArrowUpDown, ChevronDown, ChevronUp, Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category =
  | "Todos"
  | "Cisco"
  | "Fortinet"
  | "Palo Alto"
  | "Microsoft"
  | "Cibersegurança"
  | "Linux & Sistemas"
  | "IT Support"
  | "Ferramentas"
  | "Formação";

type SortOption = "recente" | "az" | "za";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  dateOrder: number; // year*12 + month
  category: Exclude<Category, "Todos">;
  featured?: boolean;
}

const C = (
  name: string,
  issuer: string,
  date: string,
  dateOrder: number,
  category: Exclude<Category, "Todos">,
  featured?: boolean
): Cert => ({ name, issuer, date, dateOrder, category, featured });

const CERTS: Cert[] = [
  // ── Formação ─────────────────────────────────────────────────────────
  C("Técnico de Informática e Gestão de Redes", "Ensiguarda – Escola Profissional da Guarda", "2022", 2022 * 12 + 6, "Formação", true),
  C("CTesp de Cibersegurança", "Politécnico da Guarda", "2025", 2025 * 12 + 6, "Formação", true),

  // ── IT Support ───────────────────────────────────────────────────────
  C("Google IT Support", "Google / Coursera", "nov 2025", 2025 * 12 + 11, "IT Support", true),
  C("IBM IT Support", "IBM / Coursera", "dez 2025", 2025 * 12 + 12, "IT Support", true),
  C("Microsoft IT Support Specialist", "Microsoft", "nov 2025", 2025 * 12 + 11, "IT Support", true),
  C("Technical Support Fundamentals", "Google", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("Operating Systems and You: Becoming a Power User", "Google", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("The Bits and Bytes of Computer Networking", "Google", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("System Administration and IT Infrastructure Services", "Google", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("IT Security: Defense against the digital dark arts", "Google", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("Tech Support Career Guide and Interview Preparation", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Technical Support (IT) Case Studies and Capstone", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Practice Exam for CompTIA Tech+ Certification", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Introduction to Cloud Computing", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Introduction to Cybersecurity Essentials", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Introduction to Networking and Storage", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Introduction to Software, Programming, and Databases", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Introduction to Hardware and Operating Systems", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Introduction to Technical Support", "IBM", "dez 2025", 2025 * 12 + 12, "IT Support"),
  C("Technical Diagnostics and Troubleshooting Techniques", "Microsoft", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("The Microsoft 365 Ecosystem", "Microsoft", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("Essential Aspects of Software, Hardware, and Data Backup", "Microsoft", "nov 2025", 2025 * 12 + 11, "IT Support"),
  C("Introduction to Secure Networking", "Microsoft", "nov 2025", 2025 * 12 + 11, "IT Support"),

  // ── Cisco ────────────────────────────────────────────────────────────
  C("CCNA 1 – Introdução a Redes de Computadores", "Universidade da Beira Interior", "fev 2026", 2026 * 12 + 2, "Cisco", true),
  C("Hacker Ético", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Cyber Threat Management", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Trilha Profissionalizante do Analista de Cibersegurança Júnior", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Introdução à Cibersegurança", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Defesa de Rede", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Segurança de Endpoint", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Dispositivos de Rede e Configuração Inicial", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Conceitos Básicos de Redes", "Cisco Networking Academy", "jan 2026", 2026 * 12 + 1, "Cisco"),
  C("Começando com o Cisco Packet Tracer", "Cisco Networking Academy", "fev 2024", 2024 * 12 + 2, "Cisco"),

  // ── Fortinet ─────────────────────────────────────────────────────────
  C("Network Security Support Engineer", "Fortinet", "dez 2025", 2025 * 12 + 12, "Fortinet"),
  C("Fortinet Network Security", "Fortinet", "dez 2025", 2025 * 12 + 12, "Fortinet"),
  C("FortiGate Administrator", "Fortinet", "dez 2025", 2025 * 12 + 12, "Fortinet"),
  C("Enterprise Firewall Administrator", "Fortinet", "dez 2025", 2025 * 12 + 12, "Fortinet"),
  C("FortiAnalyzer Administrator", "Fortinet", "dez 2025", 2025 * 12 + 12, "Fortinet"),
  C("FortiManager Administrator", "Fortinet", "dez 2025", 2025 * 12 + 12, "Fortinet"),

  // ── Palo Alto ────────────────────────────────────────────────────────
  C("Palo Alto Networks Cybersecurity", "Palo Alto Networks", "dez 2025", 2025 * 12 + 12, "Palo Alto"),
  C("Palo Alto Networks Cybersecurity Foundation", "Palo Alto Networks", "dez 2025", 2025 * 12 + 12, "Palo Alto"),
  C("Palo Alto Networks Network Security Fundamentals", "Palo Alto Networks", "dez 2025", 2025 * 12 + 12, "Palo Alto"),
  C("Palo Alto Networks Cloud Security Fundamentals", "Palo Alto Networks", "dez 2025", 2025 * 12 + 12, "Palo Alto"),
  C("Palo Alto Networks Security Operations Fundamentals", "Palo Alto Networks", "dez 2025", 2025 * 12 + 12, "Palo Alto"),

  // ── Microsoft ────────────────────────────────────────────────────────
  C("Microsoft 365 Fundamentals", "Academy Microsoft 365 atWork", "fev 2026", 2026 * 12 + 2, "Microsoft"),
  C("BE COPILOT READY", "Academy Microsoft 365 atWork", "fev 2026", 2026 * 12 + 2, "Microsoft"),
  C("Microsoft Cloud Support Associate", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("Azure Backup, Security and Compliance Administration", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("Fundamentos do Monitoramento e da Análise do Azure", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("Azure Network Configuration", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("Azure Identity and Networking Essentials", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("Azure Cloud Services", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("Cloud Computing Essentials with Azure Management", "Microsoft", "dez 2025", 2025 * 12 + 12, "Microsoft"),
  C("A Complete Course on Windows Server Administration", "Packt", "dez 2025", 2025 * 12 + 12, "Microsoft"),

  // ── Cibersegurança ───────────────────────────────────────────────────
  C("Enterprise and Infrastructure Security", "New York University", "jan 2026", 2026 * 12 + 1, "Cibersegurança"),
  C("Real-Time Cyber Threat Detection and Mitigation", "New York University", "dez 2025", 2025 * 12 + 12, "Cibersegurança"),
  C("Introduction to Cyber Attacks", "New York University", "dez 2025", 2025 * 12 + 12, "Cibersegurança"),
  C("Cyber Incident Response", "InfoSEC", "dez 2025", 2025 * 12 + 12, "Cibersegurança"),
  C("Technical Deep Dive with Incident Response Tools", "InfoSEC", "dez 2025", 2025 * 12 + 12, "Cibersegurança"),
  C("Stages of Incident Response", "InfoSEC", "dez 2025", 2025 * 12 + 12, "Cibersegurança"),

  // ── Linux & Sistemas ─────────────────────────────────────────────────
  C("Linux Foundation Certified System Administrator (LFCS)", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas", true),
  C("LFCS: Unit 1", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 2", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 3", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 4", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 5", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 6", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 7", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 8", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("LFCS: Unit 9", "Pearson", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("Linux for AIX System Administrators", "IBM", "dez 2025", 2025 * 12 + 12, "Linux & Sistemas"),
  C("cPanel Professional", "cPanel", "nov 2025", 2025 * 12 + 11, "Linux & Sistemas", true),
  C("cPanel & WHM System Administrator I", "cPanel", "nov 2025", 2025 * 12 + 11, "Linux & Sistemas", true),
  C("cPanel & WHM System Administrator II", "cPanel", "nov 2025", 2025 * 12 + 11, "Linux & Sistemas"),
  C("Certified Calico Operator: Level 1", "Tigera", "nov 2025", 2025 * 12 + 11, "Linux & Sistemas"),

  // ── Ferramentas ──────────────────────────────────────────────────────
  C("Remote Desktop Manager", "Devolutions", "dez 2025", 2025 * 12 + 12, "Ferramentas"),
  C("Remote Desktop Manager - Basic", "Devolutions", "dez 2025", 2025 * 12 + 12, "Ferramentas"),
  C("Remote Desktop Manager - Intermediate", "Devolutions", "dez 2025", 2025 * 12 + 12, "Ferramentas"),
  C("Remote Desktop Manager - Advanced", "Devolutions", "dez 2025", 2025 * 12 + 12, "Ferramentas"),
  C("Remote Desktop Manager - Devolutions Integrations", "Devolutions", "dez 2025", 2025 * 12 + 12, "Ferramentas"),
  C("Remote Desktop Manager - Devolutions Ecosystem", "Devolutions", "dez 2025", 2025 * 12 + 12, "Ferramentas"),
  C("Excel", "Santander Open Academy", "out 2024", 2024 * 12 + 10, "Ferramentas"),
  C("Internet das Coisas", "Santander Open Academy", "out 2024", 2024 * 12 + 10, "Ferramentas"),
];

const CATEGORIES: Category[] = [
  "Todos", "Formação", "IT Support", "Cisco", "Fortinet",
  "Palo Alto", "Microsoft", "Cibersegurança", "Linux & Sistemas", "Ferramentas",
];

const CATEGORY_STYLES: Record<Exclude<Category, "Todos">, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  "Formação":         { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   icon: BookOpen },
  "IT Support":       { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/30",    icon: Headphones },
  "Cisco":            { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30",    icon: Network },
  "Fortinet":         { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30",     icon: Shield },
  "Palo Alto":        { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30",  icon: Shield },
  "Microsoft":        { bg: "bg-sky-500/10",     text: "text-sky-400",     border: "border-sky-500/30",     icon: Cloud },
  "Cibersegurança":   { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/30",  icon: Lock },
  "Linux & Sistemas": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", icon: Server },
  "Ferramentas":      { bg: "bg-gray-500/10",    text: "text-gray-400",    border: "border-gray-500/30",    icon: Wrench },
};

const FEATURED = CERTS.filter((c) => c.featured);
const SORT_LABELS: Record<SortOption, string> = {
  recente: "Mais recente",
  az: "A → Z",
  za: "Z → A",
};

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [sort, setSort] = useState<SortOption>("recente");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const featuredFiltered = useMemo(() =>
    activeCategory === "Todos"
      ? FEATURED
      : CERTS.filter((c) => c.featured && c.category === activeCategory),
    [activeCategory]
  );

  const allFiltered = useMemo(() => {
    let list = activeCategory === "Todos" ? CERTS : CERTS.filter((c) => c.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)
      );
    }
    if (sort === "recente") list = [...list].sort((a, b) => b.dateOrder - a.dateOrder);
    else if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [activeCategory, search, sort]);

  const INITIAL = 12;
  const visible = showAll ? allFiltered : allFiltered.slice(0, INITIAL);
  const hasMore = allFiltered.length > INITIAL;

  const catCount = (cat: Category) =>
    cat === "Todos" ? CERTS.length : CERTS.filter((c) => c.category === cat).length;

  return (
    <section id="certificacoes" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
          className="flex flex-wrap justify-center gap-2 mb-8"
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
              <span className="ml-1.5 text-xs opacity-60">({catCount(cat)})</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* ── Em Destaque ── */}
            {featuredFiltered.length > 0 && !search && (
              <div className="mb-12">
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
                        transition={{ delay: idx * 0.05 }}
                        className={cn(
                          "relative glass-panel p-5 rounded-xl flex items-start gap-4 border hover:-translate-y-1 transition-transform",
                          style.border
                        )}
                      >
                        <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-amber-400" /> Destaque
                        </span>
                        <div className={cn("p-3 rounded-lg flex-shrink-0", style.bg, style.text)}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 pr-20">
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

            {/* ── Todas as Certificações ── */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Todas as certificações
                </span>
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground">{allFiltered.length} resultado{allFiltered.length !== 1 ? "s" : ""}</span>
              </div>

              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Pesquisar certificação ou emissor..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setShowAll(false); }}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all min-w-[160px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      {SORT_LABELS[sort]}
                    </span>
                    {sortOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 glass-panel border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl">
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSort(opt); setSortOpen(false); setShowAll(false); }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm transition-colors",
                            sort === opt
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                          )}
                        >
                          {SORT_LABELS[opt]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Grid */}
              {visible.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  Nenhuma certificação encontrada para "{search}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((cert, idx) => {
                    const style = CATEGORY_STYLES[cert.category];
                    const Icon = style.icon;
                    return (
                      <motion.div
                        key={cert.name + idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx, 11) * 0.03 }}
                        className={cn(
                          "glass-panel p-5 rounded-xl flex items-start gap-4 hover:-translate-y-1 transition-transform group border border-transparent",
                          cert.featured && style.border
                        )}
                      >
                        <div className={cn("p-2.5 rounded-lg flex-shrink-0", style.bg, style.text)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-start gap-1.5 mb-1">
                            {cert.featured && (
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />
                            )}
                            <h4 className="font-semibold text-sm leading-tight group-hover:text-accent transition-colors">
                              {cert.name}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", style.bg, style.text)}>
                              {cert.date}
                            </span>
                            <span className="text-[10px] text-muted-foreground/50">{cert.category}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Show More / Less */}
              {hasMore && (
                <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    onClick={() => setShowAll((v) => !v)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 font-medium"
                  >
                    {showAll ? (
                      <><ChevronUp className="w-4 h-4" /> Mostrar menos</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> Ver todas ({allFiltered.length - INITIAL} restantes)</>
                    )}
                  </button>
                </motion.div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
