import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, TerminalSquare, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import type { Lang } from "@/i18n";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [location] = useLocation();

  const isOnHome = location === "/" || location === "";

  const ANCHOR_LINKS = [
    { name: t.nav.home, href: "#hero", id: "hero" },
    { name: t.nav.about, href: "#about", id: "about" },
    { name: t.nav.skills, href: "#skills", id: "skills" },
    { name: t.nav.experience, href: "#experience", id: "experience" },
    { name: t.nav.certifications, href: "#certifications", id: "certifications" },
    { name: t.nav.badges, href: "#badges", id: "badges" },
    { name: t.nav.projects, href: "#projects", id: "projects" },
    { name: t.nav.contact, href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const current = ANCHOR_LINKS.map((l) => l.id).find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lang]);

  const LANGS: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
  ];

  const isBlogActive = location.startsWith("/blog");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <TerminalSquare className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            João<span className="text-primary"></span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {isOnHome
            ? ANCHOR_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1",
                    activeSection === link.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              ))
            : (
                <a
                  href="/"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.home}
                </a>
              )}

          {/* Blog link */}
          <Link
            href="/blog"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative py-1",
              isBlogActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t.nav.blog}
            {isBlogActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1 py-1">
            <Globe className="w-3.5 h-3.5 text-muted-foreground ml-1.5" />
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={cn(
                  "text-xs font-bold px-2.5 py-1 rounded-full transition-all",
                  lang === code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            {t.nav.cta}
          </a>
        </nav>

        {/* Mobile right side */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1 py-1">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full transition-all",
                  lang === code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-white/5 absolute top-full left-0 right-0 py-4 px-4 flex flex-col gap-3 shadow-2xl">
          {isOnHome
            ? ANCHOR_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-medium p-2 rounded-lg transition-colors",
                    activeSection === link.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {link.name}
                </a>
              ))
            : (
                <a
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium p-2 rounded-lg transition-colors text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {t.nav.home}
                </a>
              )}
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "text-base font-medium p-2 rounded-lg transition-colors",
              isBlogActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            {t.nav.blog}
          </Link>
        </div>
      )}
    </header>
  );
}
