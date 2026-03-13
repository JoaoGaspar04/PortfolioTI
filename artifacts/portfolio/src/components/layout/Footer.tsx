import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display font-bold text-xl tracking-tight">João<span className="text-primary">.IT</span></span>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} João Gaspar. Todos os direitos reservados.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/JoaoGaspar04" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 text-muted-foreground">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/joacgaspar/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-secondary/20 hover:text-secondary transition-all duration-300 text-muted-foreground">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:contato@exemplo.pt" className="p-3 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-all duration-300 text-muted-foreground">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
