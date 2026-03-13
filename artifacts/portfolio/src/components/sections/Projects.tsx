import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink, Loader2 } from "lucide-react";

const GITHUB_USERNAME = "JoaoGaspar04";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
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
        const filtered = data
          .filter((r) => r.name !== GITHUB_USERNAME)
          .slice(0, 6);
        setRepos(filtered);
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
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass-panel p-6 rounded-2xl group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all duration-300 border border-transparent hover:border-accent/30 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-display font-bold group-hover:text-accent transition-colors leading-tight">
                    {formatRepoName(repo.name)}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-2 mt-1" />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {repo.description || (
                    <span className="italic opacity-50">Sem descrição</span>
                  )}
                </p>

                <div className="flex items-center gap-4 mt-auto text-sm text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-3 h-3 rounded-full ${LANGUAGE_COLORS[repo.language] ?? "bg-gray-500"}`}
                      />
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
              </motion.a>
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
