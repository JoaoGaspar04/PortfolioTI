import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Network, Server, Cloud, Lock, BookOpen,
  Headphones, Star, Search, ArrowUpDown, ChevronDown, ChevronUp,
  Wrench, X, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

type Category =
  | "All" | "Cisco" | "Fortinet" | "Palo Alto" | "Microsoft"
  | "Cybersecurity" | "Linux & Systems" | "IT Support" | "Tools" | "Education";

type SortOption = "recent" | "az" | "za";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  dateOrder: number;
  category: Exclude<Category, "All">;
  featured?: boolean;
  credentialCode?: string;
  credentialUrl?: string;
}

const C = (
  name: string, issuer: string, date: string, dateOrder: number,
  category: Exclude<Category, "All">, featured?: boolean,
  credentialCode?: string, credentialUrl?: string
): Cert => ({ name, issuer, date, dateOrder, category, featured, credentialCode, credentialUrl });

const CERTS: Cert[] = [
  // Education
  C("Técnico de Informática e Gestão de Redes", "Ensiguarda – Escola Profissional da Guarda", "2022", 2022*12+6, "Education", true),
  C("CTesp de Cibersegurança", "Politécnico da Guarda", "2025", 2025*12+6, "Education", true),

  // IT Support
  C("Google IT Support", "Google / Coursera", "Nov 2025", 2025*12+11, "IT Support", true),
  C("IBM IT Support", "IBM / Coursera", "Dec 2025", 2025*12+12, "IT Support", true),
  C("Microsoft IT Support Specialist", "Microsoft", "Nov 2025", 2025*12+11, "IT Support", true, "IX9GJA118Q13"),
  C("Technical Support Fundamentals", "Google", "Nov 2025", 2025*12+11, "IT Support", false, "M9K4Q0K3HBTW"),
  C("Operating Systems and You: Becoming a Power User", "Google", "Nov 2025", 2025*12+11, "IT Support", false, "N9EGCGOOTTID"),
  C("The Bits and Bytes of Computer Networking", "Google", "Nov 2025", 2025*12+11, "IT Support", false, "08VCMO470WF5"),
  C("System Administration and IT Infrastructure Services", "Google", "Nov 2025", 2025*12+11, "IT Support", false, "BIJCZGH40QOJ"),
  C("IT Security: Defense against the digital dark arts", "Google", "Nov 2025", 2025*12+11, "IT Support"),
  C("Tech Support Career Guide and Interview Preparation", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "9BZ9YTRZ2C76"),
  C("Technical Support (IT) Case Studies and Capstone", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "8E1FFI0JIP8C"),
  C("Practice Exam for CompTIA Tech+ Certification", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "G8U9G3O2NH5E"),
  C("Introduction to Cloud Computing", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "N1VB4AMWXMA1"),
  C("Introduction to Cybersecurity Essentials", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "A5RE3738HZSK"),
  C("Introduction to Networking and Storage", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "JTH59BL6B7V1"),
  C("Introduction to Software, Programming, and Databases", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "WBUF35AUWM16"),
  C("Introduction to Hardware and Operating Systems", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "3BA4O52W8190"),
  C("Introduction to Technical Support", "IBM", "Dec 2025", 2025*12+12, "IT Support", false, "YIY75V4X5A4F"),
  C("Technical Diagnostics and Troubleshooting Techniques", "Microsoft", "Nov 2025", 2025*12+11, "IT Support", false, "L6VVQRJD01XS"),
  C("The Microsoft 365 Ecosystem", "Microsoft", "Nov 2025", 2025*12+11, "IT Support", false, "4ZCM563R2DRV"),
  C("Essential Aspects of Software, Hardware, and Data Backup", "Microsoft", "Nov 2025", 2025*12+11, "IT Support", false, "8O9WO3146OJE"),
  C("Introduction to Secure Networking", "Microsoft", "Nov 2025", 2025*12+11, "IT Support", false, "XKZY705NGD94"),

  // Cisco
  C("CCNA 1 – Introduction to Computer Networks", "Universidade da Beira Interior", "Feb 2026", 2026*12+2, "Cisco", true, "09559395"),
  C("Ethical Hacker", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Cyber Threat Management", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Junior Cybersecurity Analyst Career Path", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Introduction to Cybersecurity", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Network Defense", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Endpoint Security", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Networking Devices and Initial Configuration", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Networking Basics", "Cisco Networking Academy", "Jan 2026", 2026*12+1, "Cisco"),
  C("Getting Started with Cisco Packet Tracer", "Cisco Networking Academy", "Feb 2024", 2024*12+2, "Cisco"),

  // Fortinet
  C("Network Security Support Engineer", "Fortinet", "Dec 2025", 2025*12+12, "Fortinet", false, "9XCCKJFLXDR4"),
  C("Fortinet Network Security", "Fortinet", "Dec 2025", 2025*12+12, "Fortinet", false, "U8BRAX1GAK25"),
  C("FortiGate Administrator", "Fortinet", "Dec 2025", 2025*12+12, "Fortinet", false, "8LC5DHRBHKWH"),
  C("Enterprise Firewall Administrator", "Fortinet", "Dec 2025", 2025*12+12, "Fortinet", false, "OP0YH1H44VXW"),
  C("FortiAnalyzer Administrator", "Fortinet", "Dec 2025", 2025*12+12, "Fortinet", false, "66Z1PNTCS3H1"),
  C("FortiManager Administrator", "Fortinet", "Dec 2025", 2025*12+12, "Fortinet", false, "GQMSTLHFDX7F"),

  // Palo Alto
  C("Palo Alto Networks Cybersecurity", "Palo Alto Networks", "Dec 2025", 2025*12+12, "Palo Alto", false, "ZWNJPMGAUN7A"),
  C("Palo Alto Networks Cybersecurity Foundation", "Palo Alto Networks", "Dec 2025", 2025*12+12, "Palo Alto", false, "S8RZ3FOIXJ5L"),
  C("Palo Alto Networks Network Security Fundamentals", "Palo Alto Networks", "Dec 2025", 2025*12+12, "Palo Alto", false, "FCSXPJSNTNJ7"),
  C("Palo Alto Networks Cloud Security Fundamentals", "Palo Alto Networks", "Dec 2025", 2025*12+12, "Palo Alto", false, "HTJHXTOJBKJK"),
  C("Palo Alto Networks Security Operations Fundamentals", "Palo Alto Networks", "Dec 2025", 2025*12+12, "Palo Alto", false, "KQKMUR1FOTJP"),

  // Microsoft
  C("Microsoft 365 Fundamentals", "Academy Microsoft 365 atWork", "Feb 2026", 2026*12+2, "Microsoft", false, "a2C0Hxn3Gpt2cF5QJXnVl"),
  C("BE COPILOT READY", "Academy Microsoft 365 atWork", "Feb 2026", 2026*12+2, "Microsoft", false, "URrC_-rX56MpvxHHePBrm"),
  C("Microsoft Cloud Support Associate", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "FYDQEX91ILJ8"),
  C("Azure Backup, Security and Compliance Administration", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "M2579TR058NN"),
  C("Azure Monitoring and Analytics Fundamentals", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "ZWS5ALSR2AKD"),
  C("Azure Network Configuration", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "T9PAKERIBATD"),
  C("Azure Identity and Networking Essentials", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "YTKJUSA8E6NY"),
  C("Azure Cloud Services", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "VSJIA4T3VE7R"),
  C("Cloud Computing Essentials with Azure Management", "Microsoft", "Dec 2025", 2025*12+12, "Microsoft", false, "5W62V6E3UDZ7"),
  C("A Complete Course on Windows Server Administration", "Packt", "Dec 2025", 2025*12+12, "Microsoft", false, "1RP4FR71SEPD"),

  // Cybersecurity
  C("Enterprise and Infrastructure Security", "New York University", "Jan 2026", 2026*12+1, "Cybersecurity", false, "6YSVWVCLLUM7"),
  C("Real-Time Cyber Threat Detection and Mitigation", "New York University", "Dec 2025", 2025*12+12, "Cybersecurity", false, "VN20DVAUSFCB"),
  C("Introduction to Cyber Attacks", "New York University", "Dec 2025", 2025*12+12, "Cybersecurity", false, "DFSA63525MS5"),
  C("Cyber Incident Response", "InfoSEC", "Dec 2025", 2025*12+12, "Cybersecurity", false, "SPEVUVT76GD6"),
  C("Technical Deep Dive with Incident Response Tools", "InfoSEC", "Dec 2025", 2025*12+12, "Cybersecurity", false, "7VFKUWVXJJJD"),
  C("Stages of Incident Response", "InfoSEC", "Dec 2025", 2025*12+12, "Cybersecurity", false, "FTUWKRVZFQKO"),

  // Linux & Systems
  C("Linux Foundation Certified System Administrator (LFCS)", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", true, "GDIP6GX0ED0J"),
  C("LFCS: Unit 1", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "ND8MDUPWBDOL"),
  C("LFCS: Unit 2", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "7Z8CWD25Z5J6"),
  C("LFCS: Unit 3", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "8L9BZ3269WC7"),
  C("LFCS: Unit 4", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "2FJKLLK27GCN"),
  C("LFCS: Unit 5", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "HAHKK1IB7WM7"),
  C("LFCS: Unit 6", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "VNQQAH7RFQ71"),
  C("LFCS: Unit 7", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "K7S9EG6QWUBW"),
  C("LFCS: Unit 8", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "IF0W6S9EXZ5F"),
  C("LFCS: Unit 9", "Pearson", "Dec 2025", 2025*12+12, "Linux & Systems", false, "C43OQB565DRC"),
  C("Linux for AIX System Administrators", "IBM", "Dec 2025", 2025*12+12, "Linux & Systems", false, "8IEUAS5IL41X"),
  C("cPanel Professional", "cPanel", "Nov 2025", 2025*12+11, "Linux & Systems", true, "395253b9-3e8d-4a9c-a565-6af1ea0359bd"),
  C("cPanel & WHM System Administrator I", "cPanel", "Nov 2025", 2025*12+11, "Linux & Systems", true, "692abbba-e6a4-421a-86d0-66b465605aaa"),
  C("cPanel & WHM System Administrator II", "cPanel", "Nov 2025", 2025*12+11, "Linux & Systems", false, "7d8232ec-cf82-493f-b8ee-6434d550e706"),
  C("Certified Calico Operator: Level 1", "Tigera", "Nov 2025", 2025*12+11, "Linux & Systems"),

  // Tools
  C("Remote Desktop Manager", "Devolutions", "Dec 2025", 2025*12+12, "Tools", false, "rCvCPkFPpV8GnvN7w1PikTss"),
  C("Remote Desktop Manager - Basic", "Devolutions", "Dec 2025", 2025*12+12, "Tools", false, "keNZ5d2HfNggUJTmvPb9gBTD"),
  C("Remote Desktop Manager - Intermediate", "Devolutions", "Dec 2025", 2025*12+12, "Tools", false, "kqr6y1F6Wu2E5G9evhkir4MT"),
  C("Remote Desktop Manager - Advanced", "Devolutions", "Dec 2025", 2025*12+12, "Tools", false, "c9iXmVd7BQhMxSgJMk6C5rRB"),
  C("Remote Desktop Manager - Devolutions Integrations", "Devolutions", "Dec 2025", 2025*12+12, "Tools", false, "Ac18V7aCap8DFASmTqMj4itF"),
  C("Remote Desktop Manager - Devolutions Ecosystem", "Devolutions", "Dec 2025", 2025*12+12, "Tools", false, "xFnHvyhUu6XVRy69mA4WG17t"),
  C("Excel", "Santander Open Academy", "Oct 2024", 2024*12+10, "Tools", false, "OA-2024-1012000605231"),
  C("Internet of Things (IoT)", "Santander Open Academy", "Oct 2024", 2024*12+10, "Tools", false, "OA-2024-1012000605228"),
];

const ALL_CATEGORIES: Category[] = [
  "All", "Education", "IT Support", "Cisco", "Fortinet",
  "Palo Alto", "Microsoft", "Cybersecurity", "Linux & Systems", "Tools",
];

const CATEGORY_STYLES: Record<Exclude<Category, "All">, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  "Education":       { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   icon: BookOpen },
  "IT Support":      { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/30",    icon: Headphones },
  "Cisco":           { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30",    icon: Network },
  "Fortinet":        { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30",     icon: Shield },
  "Palo Alto":       { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30",  icon: Shield },
  "Microsoft":       { bg: "bg-sky-500/10",     text: "text-sky-400",     border: "border-sky-500/30",     icon: Cloud },
  "Cybersecurity":   { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/30",  icon: Lock },
  "Linux & Systems": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", icon: Server },
  "Tools":           { bg: "bg-gray-500/10",    text: "text-gray-400",    border: "border-gray-500/30",    icon: Wrench },
};

const SORT_LABELS: Record<SortOption, (t: any) => string> = {
  recent: (t) => t.certifications.sortRecent,
  az:     (t) => t.certifications.sortAZ,
  za:     (t) => t.certifications.sortZA,
};

const FEATURED = CERTS.filter((c) => c.featured);
const INITIAL = 12;

export function Certifications() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("recent");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selected, setSelected] = useState<Cert | null>(null);

  const featuredFiltered = useMemo(() =>
    activeCategory === "All" ? FEATURED : CERTS.filter((c) => c.featured && c.category === activeCategory),
    [activeCategory]
  );

  const allFiltered = useMemo(() => {
    let list = activeCategory === "All" ? CERTS : CERTS.filter((c) => c.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q));
    }
    if (sort === "recent") list = [...list].sort((a, b) => b.dateOrder - a.dateOrder);
    else if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [activeCategory, search, sort]);

  const visible = showAll ? allFiltered : allFiltered.slice(0, INITIAL);
  const hasMore = allFiltered.length > INITIAL;
  const catCount = (cat: Category) => cat === "All" ? CERTS.length : CERTS.filter((c) => c.category === cat).length;

  const catLabel: Record<Category, string> = {
    "All": t.nav.certifications === "Certifications" ? "All" : "Todos",
    "Education": t.nav.certifications === "Certifications" ? "Education" : "Formação",
    "IT Support": "IT Support",
    "Cisco": "Cisco",
    "Fortinet": "Fortinet",
    "Palo Alto": "Palo Alto",
    "Microsoft": "Microsoft",
    "Cybersecurity": t.nav.certifications === "Certifications" ? "Cybersecurity" : "Cibersegurança",
    "Linux & Systems": t.nav.certifications === "Certifications" ? "Linux & Systems" : "Linux & Sistemas",
    "Tools": t.nav.certifications === "Certifications" ? "Tools" : "Ferramentas",
  };

  return (
    <section id="certifications" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.certifications.title} <span className="text-accent">{t.certifications.titleAccent}</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">
            {t.certifications.subtitle.replace("{n}", String(CERTS.length))}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {ALL_CATEGORIES.map((cat) => (
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
              {catLabel[cat]}
              <span className="ml-1.5 text-xs opacity-60">({catCount(cat)})</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* Featured */}
            {featuredFiltered.length > 0 && !search && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">{t.certifications.featured}</span>
                  <div className="flex-1 h-px bg-amber-400/20" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredFiltered.map((cert, idx) => {
                    const style = CATEGORY_STYLES[cert.category];
                    const Icon = style.icon;
                    return (
                      <motion.button
                        key={cert.name}
                        onClick={() => setSelected(cert)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={cn("relative glass-panel p-5 rounded-xl flex items-start gap-4 border hover:-translate-y-1 transition-transform text-left w-full cursor-pointer group", style.border)}
                      >
                        <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-amber-400" /> {t.certifications.featured}
                        </span>
                        <div className={cn("p-3 rounded-lg flex-shrink-0", style.bg, style.text)}><Icon className="w-6 h-6" /></div>
                        <div className="min-w-0 pr-20">
                          <h4 className={cn("font-bold text-sm leading-tight mb-1 group-hover:underline", style.text)}>{cert.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                          <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", style.bg, style.text)}>{cert.date}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Certs */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.certifications.all}</span>
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground">{t.certifications.results.replace("{n}", String(allFiltered.length))}</span>
              </div>

              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t.certifications.search}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setShowAll(false); }}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all min-w-[160px] justify-between"
                  >
                    <span className="flex items-center gap-2"><ArrowUpDown className="w-4 h-4" />{SORT_LABELS[sort](t)}</span>
                    {sortOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 glass-panel border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl">
                      {(["recent", "az", "za"] as SortOption[]).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSort(opt); setSortOpen(false); setShowAll(false); }}
                          className={cn("w-full text-left px-4 py-2.5 text-sm transition-colors", sort === opt ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-white/5 hover:text-foreground")}
                        >
                          {SORT_LABELS[opt](t)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {visible.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  {t.certifications.noResults.replace("{q}", search)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((cert, idx) => {
                    const style = CATEGORY_STYLES[cert.category];
                    const Icon = style.icon;
                    return (
                      <motion.button
                        key={cert.name + idx}
                        onClick={() => setSelected(cert)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx, 11) * 0.03 }}
                        className={cn("glass-panel p-5 rounded-xl flex items-start gap-4 hover:-translate-y-1 transition-transform group border text-left w-full cursor-pointer", cert.featured ? style.border : "border-transparent")}
                      >
                        <div className={cn("p-2.5 rounded-lg flex-shrink-0", style.bg, style.text)}><Icon className="w-5 h-5" /></div>
                        <div className="min-w-0">
                          <div className="flex items-start gap-1.5 mb-1">
                            {cert.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />}
                            <h4 className="font-semibold text-sm leading-tight group-hover:text-accent transition-colors">{cert.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", style.bg, style.text)}>{cert.date}</span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {hasMore && (
                <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    onClick={() => setShowAll((v) => !v)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 font-medium"
                  >
                    {showAll
                      ? <><ChevronUp className="w-4 h-4" />{t.certifications.showLess}</>
                      : <><ChevronDown className="w-4 h-4" />{t.certifications.showMore.replace("{n}", String(allFiltered.length - INITIAL))}</>
                    }
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cert Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative glass-panel rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10 z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const style = CATEGORY_STYLES[selected.category];
                const Icon = style.icon;
                return (
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-4 rounded-xl flex-shrink-0", style.bg, style.text)}><Icon className="w-8 h-8" /></div>
                      <div>
                        <h3 className="text-lg font-display font-bold leading-tight">{selected.name}</h3>
                        <p className={cn("text-sm font-semibold mt-1", style.text)}>{selected.issuer}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { label: t.certifications.modal.date, value: selected.date },
                        { label: t.certifications.modal.category, value: selected.category },
                        ...(selected.credentialCode ? [{ label: t.certifications.modal.credentialCode, value: selected.credentialCode }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-mono font-medium text-right max-w-[55%] break-all">{value}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="https://www.linkedin.com/in/joacgaspar/details/certifications/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all font-semibold"
                    >
                      {t.certifications.modal.verifyCred}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
