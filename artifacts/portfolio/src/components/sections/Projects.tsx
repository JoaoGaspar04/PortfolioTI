import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink, Loader2, Code2, Eye } from "lucide-react";

const GITHUB_USERNAME = "JoaoGaspar04";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  PHP: "bg-purple-500",
  HTML: "bg-orange-500",
  CSS: "bg-pink-500",
  Shell: "bg-gray-400",
};

function formatRepoName(name: string) {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Repo[]) => {
        setRepos(data.filter((r) => r.name !== GITHUB_USERNAME).slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projetos" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Projetos no <span className="text-accent">GitHub</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">
            Repositórios públicos de{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center text-muted-foreground py-10">
            Não foi possível carregar os repositórios. Tenta mais tarde.
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass-panel rounded-2xl group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all duration-300 border border-transparent hover:border-accent/30 flex flex-col overflow-hidden"
              >
                {/* GitHub OG Preview Image */}
                <div className="relative w-full h-36 bg-white/5 overflow-hidden flex-shrink-0">
                  <img
                    src={`https://opengraph.github.com/repo/${GITHUB_USERNAME}/${repo.name}`}
                    alt={`Preview de ${repo.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-display font-bold group-hover:text-accent transition-colors leading-tight mb-2">
                    {formatRepoName(repo.name)}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                    {repo.description ?? (
                      <span className="italic opacity-50">Sem descrição</span>
                    )}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full ${LANGUAGE_COLORS[repo.language] ?? "bg-gray-500"}`} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 hover:text-foreground text-muted-foreground transition-all duration-200"
                    >
                      <Code2 className="w-4 h-4" />
                      Código
                    </a>
                    {repo.homepage ? (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-accent/10 border border-accent/30 hover:bg-accent/20 text-accent transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </a>
                    ) : (
                      <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/5 text-muted-foreground/30 cursor-not-allowed select-none">
                        <Eye className="w-4 h-4" />
                        Ver
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 font-medium"
          >
            Ver todos os repositórios no GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
