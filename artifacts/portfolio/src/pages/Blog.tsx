import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Clock, Search, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLang } from "@/context/LanguageContext";
import { blogPosts, formatDate } from "@/data/blog";
import { getAllAdminPosts } from "@/hooks/useAdminPosts";

const CATEGORIES = ["All", "Sysadmin", "Networking", "Monitoring", "Automation", "Certifications"];
const INITIAL_VISIBLE = 3;

export default function Blog() {
  const { lang, t } = useLang();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const allPosts = [...getAllAdminPosts(), ...blogPosts];

  const filtered = allPosts.filter((post) => {
    const title = lang === "pt" ? post.titlePt : post.titleEn;
    const excerpt = lang === "pt" ? post.excerptPt : post.excerptEn;
    const matchesSearch =
      !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isFiltering = search !== "" || activeCategory !== "All";
  const visiblePosts = isFiltering || showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = !isFiltering && filtered.length > INITIAL_VISIBLE;

  useEffect(() => {
    setShowAll(false);
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative selection:bg-primary/30 selection:text-primary-foreground">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[128px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.backHome}
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {t.blog.title}{" "}
              <span className="text-primary">{t.blog.titleAccent}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">{t.blog.subtitle}</p>
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.blog.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat === "All" ? t.blog.allCategories : cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Post Grid */}
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-center py-16"
            >
              {t.blog.noResults}
            </motion.p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {visiblePosts.map((post, i) => {
                    const title = lang === "pt" ? post.titlePt : post.titleEn;
                    const excerpt = lang === "pt" ? post.excerptPt : post.excerptEn;
                    const tags = lang === "pt" ? post.tagsPt : post.tagsEn;
                    return (
                      <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div className="group h-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden">
                            {/* Cover */}
                            <div className="flex items-center justify-center h-36 bg-gradient-to-br from-primary/10 to-secondary/10 text-6xl border-b border-white/5">
                              {post.coverEmoji}
                            </div>
                            <div className="p-6 flex flex-col gap-3">
                              {/* Meta */}
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                                  {post.category}
                                </span>
                                <span>{formatDate(post.date, lang)}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {post.readingTime} min
                                </span>
                              </div>
                              {/* Title */}
                              <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                                {title}
                              </h2>
                              {/* Excerpt */}
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {excerpt}
                              </p>
                              {/* Tags */}
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="flex items-center gap-1 text-xs text-muted-foreground bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5"
                                  >
                                    <Tag className="w-2.5 h-2.5" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Show more / less button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 flex justify-center"
                >
                  <button
                    onClick={() => setShowAll((v) => !v)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                  >
                    {showAll ? (
                      <>
                        {t.blog.showLess}
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        {t.blog.showMore.replace("{n}", String(filtered.length - INITIAL_VISIBLE))}
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
