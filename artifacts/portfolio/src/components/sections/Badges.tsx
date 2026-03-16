import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, ShieldCheck } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface Badge {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  credlyUrl: string;
  imageUrl: string;
  color: string;
  bg: string;
}

const BADGES: Badge[] = [
  {
    name: "Cyber Threat Management",
    issuer: "Cisco",
    issued: "Jan 14, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/cyber-threat-management",
    imageUrl: "https://images.credly.com/size/340x340/images/80e1e7e6-6ec5-40a4-acac-b82b290a21ef/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Endpoint Security",
    issuer: "Cisco",
    issued: "Jan 12, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/endpoint-security",
    imageUrl: "https://images.credly.com/size/340x340/images/0ca5f542-fb5e-4a22-9b7a-c1a204a6bec4/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Ethical Hacker",
    issuer: "Cisco",
    issued: "Jan 21, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/ethical-hacker",
    imageUrl: "https://images.credly.com/size/340x340/images/ead9f6ad-2851-4f4e-b9af-93b47c3b3a23/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issued: "Jan 14, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/introduction-to-cybersecurity",
    imageUrl: "https://images.credly.com/size/340x340/images/af8c142b-d19b-48c5-90f3-61f0bc6e9e58/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "ISC2 Candidate",
    issuer: "ISC2",
    issued: "2025",
    expires: "Nov 30, 2026",
    credlyUrl: "https://www.credly.com/org/isc2/badge/isc2-candidate",
    imageUrl: "https://images.credly.com/size/340x340/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    issued: "Jan 12, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/junior-cybersecurity-analyst-career-path",
    imageUrl: "https://images.credly.com/size/340x340/images/10944204-0e45-4bf7-9d4d-3fc5f2a8ebc5/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Network Defense",
    issuer: "Cisco",
    issued: "Jan 13, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/network-defense",
    imageUrl: "https://images.credly.com/size/340x340/images/e230a1d2-78b3-4f70-b4fb-2ab56c7892cf/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Networking Basics",
    issuer: "Cisco",
    issued: "Jan 10, 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/networking-basics",
    imageUrl: "https://images.credly.com/size/340x340/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Networking Devices and Initial Configuration",
    issuer: "Cisco",
    issued: "Jan 2026",
    credlyUrl: "https://www.credly.com/org/cisco/badge/networking-devices-and-initial-configuration",
    imageUrl: "https://images.credly.com/size/340x340/images/88316fe8-5651-4e61-a6be-5be1558f049e/image.png",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

function BadgeImage({ src, alt, bg }: { src: string; alt: string; bg: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${bg}`}>
        <Award className="w-12 h-12 text-white/40" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain p-2"
      onError={() => setFailed(true)}
    />
  );
}

export function Badges() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Badge | null>(null);

  return (
    <section id="badges" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.badges.title} <span className="text-accent">{t.badges.titleAccent}</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">{t.badges.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {BADGES.map((badge, idx) => (
            <motion.button
              key={badge.name}
              onClick={() => setSelected(badge)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="glass-panel rounded-2xl p-4 flex flex-col items-center gap-3 group hover:border-accent/30 border border-transparent transition-all duration-300 text-center cursor-pointer"
            >
              <div className={`w-20 h-20 rounded-xl overflow-hidden ${badge.bg} flex-shrink-0`}>
                <BadgeImage src={badge.imageUrl} alt={badge.name} bg={badge.bg} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight group-hover:text-accent transition-colors line-clamp-2">
                  {badge.name}
                </p>
                <p className={`text-[10px] font-bold mt-1 ${badge.color}`}>{badge.issuer}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              className="relative glass-panel rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10 z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center gap-5">
                <div className={`w-32 h-32 rounded-2xl overflow-hidden ${selected.bg}`}>
                  <BadgeImage src={selected.imageUrl} alt={selected.name} bg={selected.bg} />
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold mb-1">{selected.name}</h3>
                  <p className={`text-sm font-semibold ${selected.color}`}>{selected.issuer}</p>
                </div>

                <div className="w-full space-y-3 text-left">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-muted-foreground">{t.badges.modal.issued}</span>
                    <span className="text-sm font-medium">{selected.issued}</span>
                  </div>
                  {selected.expires && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-sm text-muted-foreground">{t.badges.modal.expires}</span>
                      <span className="text-sm font-medium text-amber-400">{selected.expires}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-muted-foreground">{t.badges.modal.issuer}</span>
                    <span className={`text-sm font-semibold ${selected.color}`}>{selected.issuer}</span>
                  </div>
                </div>

                <a
                  href={selected.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all font-semibold"
                >
                  <ShieldCheck className="w-5 h-5" />
                  {t.badges.modal.viewOnCreedly}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
