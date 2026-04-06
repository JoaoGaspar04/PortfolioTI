import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLang } from "@/context/LanguageContext";
import { getPostBySlug, formatDate } from "@/data/blog";
import NotFound from "@/pages/not-found";

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-8 mb-3 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-4 text-foreground">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-5 text-foreground">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`\n]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-primary text-[0.85em] font-mono">$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) => {
      const escaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<pre class="my-6 rounded-xl bg-black/40 border border-white/10 p-5 overflow-x-auto"><code class="text-sm font-mono text-green-300 leading-relaxed">${escaped}</code></pre>`;
    })
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.slice(1, -1).split("|").map(c => c.trim());
      return `<tr>${cells.map(c => `<td class="px-4 py-2 border border-white/10 text-sm text-muted-foreground">${c}</td>`).join("")}</tr>`;
    })
    .replace(/^(-{3,})$/gm, '<hr class="border-white/10 my-8" />')
    .replace(/^\- (.+)$/gm, '<li class="ml-5 list-disc text-muted-foreground leading-relaxed">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal text-muted-foreground leading-relaxed">$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">$1</a>')
    .replace(/^(?!<[hpltcia])(.+)$/gm, (line) => {
      if (!line.trim()) return "";
      return `<p class="text-muted-foreground leading-relaxed my-3">${line}</p>`;
    })
    .replace(/<\/tr>\n<tr>/g, "</tr><tr>")
    .replace(/(<tr>[\s\S]*?<\/tr>)+/g, (tableBody) => {
      const rows = tableBody.split("</tr>").filter(Boolean).map(r => r + "</tr>");
      const [header, ...body] = rows;
      const styledHeader = header.replace(/<td/g, '<th class="px-4 py-2 border border-white/10 text-sm font-semibold text-foreground bg-white/5"').replace(/<\/td>/g, "</th>");
      return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-white/10 rounded-xl overflow-hidden"><thead>${styledHeader}</thead><tbody>${body.join("")}</tbody></table></div>`;
    })
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, (list) => `<ul class="my-4 space-y-1">${list}</ul>`);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const post = getPostBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const title = lang === "pt" ? post.titlePt : post.titleEn;
  const content = lang === "pt" ? post.contentPt : post.contentEn;
  const tags = lang === "pt" ? post.tagsPt : post.tagsEn;

  return (
    <div className="min-h-screen bg-background flex flex-col relative selection:bg-primary/30 selection:text-primary-foreground">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[128px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.backToBlog}
            </Link>

            {/* Cover emoji */}
            <div className="flex items-center justify-center h-40 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 text-7xl mb-8">
              {post.coverEmoji}
            </div>

            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-6">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-white/10">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date, lang)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} min {t.blog.readTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-muted-foreground bg-white/5 border border-white/10 rounded-full px-3 py-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <article
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />

            {/* Footer nav */}
            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.blog.backToBlog}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
