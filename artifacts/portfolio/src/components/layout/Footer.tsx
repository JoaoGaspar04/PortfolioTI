import { Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function Footer() {
  const { t } = useLang();
  const { config } = useSiteConfig();
  const c = config.contact;
  return (
    <footer className="border-t border-border/50 bg-background/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display font-bold text-xl tracking-tight">
            {config.profile.navName}<span className="text-primary"></span>
          </span>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {config.profile.fullName}. {t.footer.rights}
          </p>
          <p className="text-xs text-muted-foreground/50">{t.footer.madeWith}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={c.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 text-muted-foreground"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={c.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-secondary/20 hover:text-secondary transition-all duration-300 text-muted-foreground"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${c.email}`}
            className="p-3 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-all duration-300 text-muted-foreground"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
