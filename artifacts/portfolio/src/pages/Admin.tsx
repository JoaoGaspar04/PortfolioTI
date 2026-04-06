import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ArrowLeft,
  Save,
  X,
  CheckCircle,
} from "lucide-react";
import { useAdminPosts } from "@/hooks/useAdminPosts";
import type { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

// ─── Change this to your own password ───────────────────────────────────────
const ADMIN_PASSWORD = "portAdmin25";
// ────────────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Sysadmin", "Networking", "Monitoring", "Automation", "Certifications"];

const EMOJIS = ["🗂️", "🔀", "📊", "⚡", "🎓", "🛡️", "🖥️", "🌐", "🔧", "📡", "🔐", "💡", "🚀", "📝", "🔍"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const EMPTY_FORM = {
  title: "",
  date: new Date().toISOString().split("T")[0],
  category: "Sysadmin",
  tags: "",
  excerpt: "",
  content: "",
  coverEmoji: "📝",
};

type FormData = typeof EMPTY_FORM;

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const { adminPosts, addPost, deletePost, updatePost } = useAdminPosts();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"write" | "list">("write");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function login() {
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPwInput("");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setPwInput("");
  }

  function setField(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function buildPost(f: FormData): BlogPost {
    const slug = editingSlug ?? (slugify(f.title) || `post-${Date.now()}`);
    const tags = f.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const readingTime = estimateReadTime(f.content);
    return {
      slug,
      titleEn: f.title,
      titlePt: f.title,
      date: f.date,
      readingTime,
      category: f.category,
      tagsEn: tags,
      tagsPt: tags,
      excerptEn: f.excerpt,
      excerptPt: f.excerpt,
      contentEn: f.content,
      contentPt: f.content,
      coverEmoji: f.coverEmoji,
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const post = buildPost(form);
    if (editingSlug) {
      updatePost(editingSlug, post);
    } else {
      addPost(post);
    }
    setForm(EMPTY_FORM);
    setEditingSlug(null);
    setPreview(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setTab("list");
  }

  function startEdit(post: BlogPost) {
    setForm({
      title: post.titlePt,
      date: post.date,
      category: post.category,
      tags: post.tagsPt.join(", "),
      excerpt: post.excerptPt,
      content: post.contentPt,
      coverEmoji: post.coverEmoji,
    });
    setEditingSlug(post.slug);
    setTab("write");
    setPreview(false);
    window.scrollTo(0, 0);
  }

  function cancelEdit() {
    setForm(EMPTY_FORM);
    setEditingSlug(null);
    setPreview(false);
  }

  // ── Password Gate ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Área de Administração</h1>
            <p className="text-sm text-muted-foreground">Introduz a palavra-passe para continuar</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="password"
                value={pwInput}
                onChange={(e) => {
                  setPwInput(e.target.value);
                  setPwError(false);
                }}
                placeholder="Palavra-passe"
                autoFocus
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-white/5 border text-sm focus:outline-none focus:border-primary/50 transition-colors",
                  pwError ? "border-red-500/70" : "border-white/10"
                )}
              />
              {pwError && (
                <p className="text-xs text-red-400 mt-1.5">Palavra-passe incorreta</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Voltar ao site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Admin UI ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-semibold text-sm">Blog Admin</span>
            <span className="text-xs text-muted-foreground bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
              {adminPosts.length} artigo{adminPosts.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              Ver blog
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
          <button
            onClick={() => { setTab("write"); cancelEdit(); }}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-medium transition-all",
              tab === "write" && !editingSlug
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Plus className="w-3.5 h-3.5 inline mr-1.5" />
            Novo Artigo
          </button>
          <button
            onClick={() => setTab("list")}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-medium transition-all",
              tab === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Gerir Artigos
          </button>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Artigo guardado com sucesso!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Write / Edit form */}
        {(tab === "write" || editingSlug) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {editingSlug && (
              <div className="mb-4 flex items-center gap-2 text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2">
                <Edit3 className="w-4 h-4" />
                A editar: <strong>{form.title || editingSlug}</strong>
                <button onClick={cancelEdit} className="ml-auto hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Preview toggle */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setPreview((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-white/10 rounded-lg px-3 py-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                {preview ? "Editar" : "Pré-visualizar"}
              </button>
            </div>

            {preview ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 min-h-64">
                <div className="flex items-center justify-center h-24 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-5xl mb-6">
                  {form.coverEmoji}
                </div>
                <span className="text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full">
                  {form.category}
                </span>
                <h1 className="text-2xl font-bold mt-3 mb-2">{form.title || "Sem título"}</h1>
                <p className="text-sm text-muted-foreground mb-6">{form.date} · {estimateReadTime(form.content)} min leitura</p>
                <p className="text-muted-foreground italic mb-6">{form.excerpt}</p>
                <div className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-mono border-t border-white/10 pt-6">
                  {form.content || "Conteúdo vazio…"}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: title + emoji */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setField("title", e.target.value)}
                      placeholder="Título do artigo"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Emoji
                    </label>
                    <div className="relative">
                      <select
                        value={form.coverEmoji}
                        onChange={(e) => setField("coverEmoji", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer pr-8"
                      >
                        {EMOJIS.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
                        {form.coverEmoji}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2: date + category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Data
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setField("date", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Categoria
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setField("category", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Tags <span className="normal-case font-normal">(separadas por vírgula)</span>
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setField("tags", e.target.value)}
                    placeholder="ex: PowerShell, Windows Server, Active Directory"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Resumo *
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setField("excerpt", e.target.value)}
                    placeholder="Breve descrição que aparece na listagem do blog (2-3 frases)"
                    rows={2}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Conteúdo *{" "}
                    <span className="normal-case font-normal">
                      (suporta Markdown — ## Título, **negrito**, `código`, ```bloco```)
                    </span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setField("content", e.target.value)}
                    placeholder={`## Introdução\n\nEscreve o teu artigo aqui em Markdown...\n\n## Secção 2\n\nMais conteúdo...`}
                    rows={18}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-y font-mono leading-relaxed"
                  />
                  {form.content && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      ~{estimateReadTime(form.content)} min de leitura
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {editingSlug ? "Guardar Alterações" : "Publicar Artigo"}
                  </button>
                  {editingSlug && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-6 py-3 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* List of admin posts */}
        {tab === "list" && !editingSlug && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {adminPosts.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-4xl mb-3">✍️</p>
                <p className="text-sm">Ainda não adicionaste nenhum artigo.</p>
                <button
                  onClick={() => setTab("write")}
                  className="mt-4 text-primary text-sm hover:underline"
                >
                  Escrever o primeiro
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {adminPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors group"
                  >
                    <span className="text-3xl mt-0.5">{post.coverEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-xs text-muted-foreground">{post.readingTime} min</span>
                      </div>
                      <h3 className="font-semibold leading-snug truncate">{post.titlePt}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{post.excerptPt}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Ver artigo"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => startEdit(post)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {deleteConfirm === post.slug ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { deletePost(post.slug); setDeleteConfirm(null); }}
                            className="px-2 py-1 rounded-lg text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 rounded-lg text-xs bg-white/5 text-muted-foreground hover:bg-white/10 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.slug)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
