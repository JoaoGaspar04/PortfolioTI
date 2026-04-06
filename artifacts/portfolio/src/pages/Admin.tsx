import { useState, useEffect } from "react";
import { Link } from "wouter";
import * as OTPAuth from "otpauth";
import { QRCodeSVG } from "qrcode.react";
import {
  Lock, ShieldCheck, LogOut, Plus, Trash2, Edit3, Eye, ArrowLeft, Save, X,
  CheckCircle, BookOpen, User, Info, Phone, Briefcase, Wrench, RefreshCw,
  KeyRound, QrCode,
} from "lucide-react";
import { useAdminPosts } from "@/hooks/useAdminPosts";
import { useSiteConfig, DEFAULT_CONFIG } from "@/hooks/useSiteConfig";
import type { ExperienceEntry, SkillCategory } from "@/hooks/useSiteConfig";
import type { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

// ─── TOTP Secret — scan once with Proton Authenticator ─────────────────────
const TOTP_SECRET = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
const TOTP_ISSUER = "Portfolio Admin";
const TOTP_LABEL  = "JoaoGaspar";
// ────────────────────────────────────────────────────────────────────────────

const TOTP_CONFIGURED_KEY = "admin_totp_configured";
const SESSION_KEY = "admin_authed";

function makeTotp() {
  return new OTPAuth.TOTP({
    issuer: TOTP_ISSUER,
    label: TOTP_LABEL,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(TOTP_SECRET),
  });
}

function validateCode(code: string): boolean {
  const totp = makeTotp();
  const delta = totp.validate({ token: code.trim(), window: 1 });
  return delta !== null;
}

// ─── Blog helpers ────────────────────────────────────────────────────────────
const CATEGORIES = ["Sysadmin", "Networking", "Monitoring", "Automation", "Certifications"];
const EMOJIS = ["🗂️", "🔀", "📊", "⚡", "🎓", "🛡️", "🖥️", "🌐", "🔧", "📡", "🔐", "💡", "🚀", "📝", "🔍"];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}
function estimateReadTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

const EMPTY_BLOG = { title: "", date: new Date().toISOString().split("T")[0], category: "Sysadmin", tags: "", excerpt: "", content: "", coverEmoji: "📝" };

type AdminTab = "blog" | "profile" | "about" | "contact" | "experience" | "skills";

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Admin() {
  const isConfigured = () => !!localStorage.getItem(TOTP_CONFIGURED_KEY);
  const isAuthed = () => !!sessionStorage.getItem(SESSION_KEY);

  const [phase, setPhase] = useState<"setup" | "login" | "dashboard">(() => {
    if (isAuthed()) return "dashboard";
    if (isConfigured()) return "login";
    return "setup";
  });

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const totpUri = makeTotp().toString();

  function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    if (validateCode(code)) {
      localStorage.setItem(TOTP_CONFIGURED_KEY, "1");
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("dashboard");
    } else {
      setCodeError("Código inválido. Verifica o Proton Authenticator.");
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (validateCode(code)) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("dashboard");
    } else {
      setCodeError("Código inválido ou expirado.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setPhase("login");
    setCode("");
  }

  function handleResetTOTP() {
    if (confirm("Isto irá apagar a configuração do autenticador. Tens a certeza?")) {
      localStorage.removeItem(TOTP_CONFIGURED_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      setPhase("setup");
      setCode("");
    }
  }

  // ── Auth Screens ─────────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="glass-panel p-8 rounded-3xl border border-border/50 shadow-2xl text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
              <QrCode className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-1">Configurar 2FA</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Lê o QR code com o <span className="text-primary font-medium">Proton Authenticator</span> e introduz o código gerado para confirmar.
            </p>

            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white rounded-xl">
                <QRCodeSVG value={totpUri} size={160} />
              </div>
            </div>

            <details className="mb-6 text-left">
              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                Não consegues ler o QR? Ver chave manual
              </summary>
              <div className="mt-2 p-3 bg-white/5 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Chave secreta (Base32):</p>
                <code className="text-xs font-mono text-primary break-all">{TOTP_SECRET}</code>
              </div>
            </details>

            <form onSubmit={handleSetup} className="space-y-4">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setCodeError(""); }}
                  placeholder="Código de 6 dígitos"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  autoFocus
                />
                {codeError && <p className="text-red-400 text-sm mt-1">{codeError}</p>}
              </div>
              <button
                type="submit"
                disabled={code.length !== 6}
                className="w-full py-3 rounded-xl font-semibold bg-primary text-primary-foreground disabled:opacity-50 transition-all"
              >
                Confirmar e Entrar
              </button>
            </form>

            <Link href="/" className="block mt-4 text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "login") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="glass-panel p-8 rounded-3xl border border-border/50 shadow-2xl text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-1">Área de Administração</h1>
            <p className="text-muted-foreground text-sm mb-6">Introduz o código do Proton Authenticator</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setCodeError(""); }}
                  placeholder="• • • • • •"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  autoFocus
                />
                {codeError && <p className="text-red-400 text-sm mt-1">{codeError}</p>}
              </div>
              <button
                type="submit"
                disabled={code.length !== 6}
                className="w-full py-3 rounded-xl font-semibold bg-primary text-primary-foreground disabled:opacity-50 transition-all"
              >
                Entrar
              </button>
            </form>

            <button
              onClick={handleResetTOTP}
              className="mt-4 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors flex items-center gap-1 mx-auto"
            >
              <KeyRound className="w-3 h-3" /> Reconfigurar autenticador
            </button>
            <Link href="/" className="block mt-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────────────────
  return <Dashboard onLogout={handleLogout} onResetTOTP={handleResetTOTP} />;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout, onResetTOTP }: { onLogout: () => void; onResetTOTP: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>("blog");

  const TABS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "blog",       label: "Blog",         icon: BookOpen  },
    { id: "profile",    label: "Perfil",        icon: User      },
    { id: "about",      label: "Sobre",         icon: Info      },
    { id: "contact",    label: "Contacto",      icon: Phone     },
    { id: "experience", label: "Experiência",   icon: Briefcase },
    { id: "skills",     label: "Competências",  icon: Wrench    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="glass-panel border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-display font-bold text-lg">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onResetTOTP} title="Reconfigurar 2FA" className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors">
              <KeyRound className="w-4 h-4" />
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-all text-sm">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                activeTab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "blog"       && <BlogTab />}
        {activeTab === "profile"    && <ProfileTab />}
        {activeTab === "about"      && <AboutTab />}
        {activeTab === "contact"    && <ContactTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "skills"     && <SkillsTab />}
      </div>
    </div>
  );
}

// ─── Shared helpers ────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full bg-background/50 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50 text-sm";
const textareaCls = inputCls + " resize-none";

function SaveBanner({ saved }: { saved: boolean }) {
  if (!saved) return null;
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium shadow-lg z-50">
      <CheckCircle className="w-4 h-4" /> Guardado com sucesso!
    </div>
  );
}

function useSaved() {
  const [saved, setSaved] = useState(false);
  function flash() { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  return { saved, flash };
}

// ─── Blog Tab ─────────────────────────────────────────────────────────────────
type BlogForm = typeof EMPTY_BLOG;

function BlogTab() {
  const { posts, addPost, updatePost, deletePost } = useAdminPosts();
  const [form, setForm] = useState<BlogForm>(EMPTY_BLOG);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function setF(key: keyof BlogForm, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function buildPost(f: BlogForm): BlogPost {
    const slug = editingSlug ?? (slugify(f.title) || `post-${Date.now()}`);
    const tags = f.tags.split(",").map((t) => t.trim()).filter(Boolean);
    return {
      slug, title: f.title, date: f.date, category: f.category, tags,
      excerpt: f.excerpt, content: f.content, coverEmoji: f.coverEmoji,
      readTime: estimateReadTime(f.content),
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const post = buildPost(form);
    if (editingSlug) { updatePost(editingSlug, post); } else { addPost(post); }
    setForm(EMPTY_BLOG); setEditingSlug(null); setShowForm(false); setPreview(false);
  }

  function handleEdit(post: BlogPost) {
    setForm({ title: post.title, date: post.date, category: post.category, tags: post.tags.join(", "), excerpt: post.excerpt, content: post.content, coverEmoji: post.coverEmoji });
    setEditingSlug(post.slug); setShowForm(true); setPreview(false);
  }

  function handleCancel() {
    setForm(EMPTY_BLOG); setEditingSlug(null); setShowForm(false); setPreview(false);
  }

  const adminPosts = posts.filter(p => p.adminCreated);

  if (showForm) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">{editingSlug ? "Editar Artigo" : "Novo Artigo"}</h2>
          <div className="flex gap-2">
            <button onClick={() => setPreview(!preview)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all", preview ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground")}>
              <Eye className="w-4 h-4" /> {preview ? "Editar" : "Pré-visualizar"}
            </button>
            <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-muted-foreground text-sm"><X className="w-4 h-4" /> Cancelar</button>
          </div>
        </div>

        {preview ? (
          <div className="glass-panel p-8 rounded-2xl prose prose-invert max-w-none">
            <div className="text-5xl mb-4">{form.coverEmoji}</div>
            <h1>{form.title || "Sem título"}</h1>
            <p className="text-muted-foreground">{form.excerpt}</p>
            <hr className="border-border" />
            <div className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">{form.content}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Título">
                <input className={inputCls} value={form.title} onChange={e => setF("title", e.target.value)} placeholder="Título do artigo" required />
              </Field>
              <Field label="Data">
                <input type="date" className={inputCls} value={form.date} onChange={e => setF("date", e.target.value)} required />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoria">
                <select className={inputCls} value={form.category} onChange={e => setF("category", e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Emoji de Capa">
                <select className={inputCls} value={form.coverEmoji} onChange={e => setF("coverEmoji", e.target.value)}>
                  {EMOJIS.map(em => <option key={em} value={em}>{em}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Tags (separadas por vírgula)">
              <input className={inputCls} value={form.tags} onChange={e => setF("tags", e.target.value)} placeholder="windows, active-directory, powershell" />
            </Field>
            <Field label="Resumo">
              <textarea className={textareaCls} rows={2} value={form.excerpt} onChange={e => setF("excerpt", e.target.value)} placeholder="Breve descrição do artigo..." />
            </Field>
            <Field label="Conteúdo (Markdown)">
              <textarea className={textareaCls} rows={14} value={form.content} onChange={e => setF("content", e.target.value)} placeholder="## Introdução&#10;&#10;Escreve o teu artigo aqui..." />
            </Field>
            <div className="flex gap-3">
              <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                <Save className="w-4 h-4" /> {editingSlug ? "Guardar Alterações" : "Publicar Artigo"}
              </button>
              <button type="button" onClick={handleCancel} className="px-5 py-2.5 rounded-xl bg-white/5 text-muted-foreground text-sm">Cancelar</button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">Artigos do Blog</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
          <Plus className="w-4 h-4" /> Novo Artigo
        </button>
      </div>

      {adminPosts.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Ainda não publicaste nenhum artigo.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {adminPosts.map(post => (
            <div key={post.slug} className="glass-panel p-5 rounded-2xl flex items-center gap-4">
              <span className="text-2xl">{post.coverEmoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{post.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>{post.date}</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">{post.category}</span>
                  <span>{post.readTime} min</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(post)} className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => { if (confirm("Eliminar este artigo?")) deletePost(post.slug); }} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all text-muted-foreground">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab() {
  const { config, setConfig } = useSiteConfig();
  const [f, setF] = useState(config.profile);
  const { saved, flash } = useSaved();

  useEffect(() => { setF(config.profile); }, [config]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setConfig({ profile: f });
    flash();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-display font-bold mb-6">Perfil & Hero</h2>
      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nome Completo">
            <input className={inputCls} value={f.fullName} onChange={e => setF(p => ({ ...p, fullName: e.target.value }))} />
          </Field>
          <Field label="Nome no Navbar">
            <input className={inputCls} value={f.navName} onChange={e => setF(p => ({ ...p, navName: e.target.value }))} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Field label="Cargos / Roles (PT) — separados por vírgula">
            <input className={inputCls} value={f.roles_pt.join(", ")} onChange={e => setF(p => ({ ...p, roles_pt: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} placeholder="Helpdesk Técnico, Sysadmin Júnior, Técnico de Redes" />
          </Field>
          <Field label="Cargos / Roles (EN) — separados por vírgula">
            <input className={inputCls} value={f.roles_en.join(", ")} onChange={e => setF(p => ({ ...p, roles_en: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} placeholder="Helpdesk Technician, Junior Sysadmin, Network Technician" />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Field label="Descrição (PT)">
            <textarea className={textareaCls} rows={3} value={f.description_pt} onChange={e => setF(p => ({ ...p, description_pt: e.target.value }))} />
          </Field>
          <Field label="Descrição (EN)">
            <textarea className={textareaCls} rows={3} value={f.description_en} onChange={e => setF(p => ({ ...p, description_en: e.target.value }))} />
          </Field>
        </div>

        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
          <Save className="w-4 h-4" /> Guardar
        </button>
      </form>
      <SaveBanner saved={saved} />
    </div>
  );
}

// ─── About Tab ────────────────────────────────────────────────────────────────
function AboutTab() {
  const { config, setConfig } = useSiteConfig();
  const [f, setF] = useState(config.about);
  const { saved, flash } = useSaved();

  useEffect(() => { setF(config.about); }, [config]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setConfig({ about: f });
    flash();
  }

  const upd = (key: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(p => ({ ...p, [key]: e.target.value }));

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-display font-bold mb-6">Secção Sobre</h2>
      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Subtítulo (PT)"><input className={inputCls} value={f.subtitle_pt} onChange={upd("subtitle_pt")} /></Field>
          <Field label="Subtítulo (EN)"><input className={inputCls} value={f.subtitle_en} onChange={upd("subtitle_en")} /></Field>
        </div>

        <Field label="Parágrafo 1 (PT)"><textarea className={textareaCls} rows={3} value={f.p1_pt} onChange={upd("p1_pt")} /></Field>
        <Field label="Parágrafo 1 (EN)"><textarea className={textareaCls} rows={3} value={f.p1_en} onChange={upd("p1_en")} /></Field>
        <Field label="Parágrafo 2 (PT)"><textarea className={textareaCls} rows={3} value={f.p2_pt} onChange={upd("p2_pt")} /></Field>
        <Field label="Parágrafo 2 (EN)"><textarea className={textareaCls} rows={3} value={f.p2_en} onChange={upd("p2_en")} /></Field>
        <Field label="Parágrafo 3 (PT)"><textarea className={textareaCls} rows={3} value={f.p3_pt} onChange={upd("p3_pt")} /></Field>
        <Field label="Parágrafo 3 (EN)"><textarea className={textareaCls} rows={3} value={f.p3_en} onChange={upd("p3_en")} /></Field>

        <div className="border-t border-border/50 pt-4">
          <p className="text-sm font-medium text-foreground mb-3">Estatísticas</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([["stat_experience","Anos de Exp."],["stat_tickets","Tickets"],["stat_satisfaction","Satisfação"],["stat_systems","Sistemas"]] as const).map(([key,lbl]) => (
              <Field key={key} label={lbl}>
                <input className={inputCls} value={f[key]} onChange={upd(key)} placeholder="3+" />
              </Field>
            ))}
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
          <Save className="w-4 h-4" /> Guardar
        </button>
      </form>
      <SaveBanner saved={saved} />
    </div>
  );
}

// ─── Contact Tab ──────────────────────────────────────────────────────────────
function ContactTab() {
  const { config, setConfig } = useSiteConfig();
  const [f, setF] = useState(config.contact);
  const { saved, flash } = useSaved();

  useEffect(() => { setF(config.contact); }, [config]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setConfig({ contact: f });
    flash();
  }

  const upd = (key: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF(p => ({ ...p, [key]: e.target.value }));

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-display font-bold mb-6">Contacto & Redes Sociais</h2>
      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-4">
        <Field label="Email"><input className={inputCls} type="email" value={f.email} onChange={upd("email")} /></Field>
        <Field label="Telefone"><input className={inputCls} value={f.phone} onChange={upd("phone")} placeholder="+351 968 196 979" /></Field>
        <Field label="Localização"><input className={inputCls} value={f.location} onChange={upd("location")} placeholder="Castelo Branco, Portugal" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="LinkedIn (exibição)"><input className={inputCls} value={f.linkedin} onChange={upd("linkedin")} placeholder="linkedin.com/in/..." /></Field>
          <Field label="LinkedIn (URL completo)"><input className={inputCls} value={f.linkedinUrl} onChange={upd("linkedinUrl")} placeholder="https://linkedin.com/in/..." /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub (exibição)"><input className={inputCls} value={f.github} onChange={upd("github")} placeholder="github.com/..." /></Field>
          <Field label="GitHub (URL completo)"><input className={inputCls} value={f.githubUrl} onChange={upd("githubUrl")} placeholder="https://github.com/..." /></Field>
        </div>
        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
          <Save className="w-4 h-4" /> Guardar
        </button>
      </form>
      <SaveBanner saved={saved} />
    </div>
  );
}

// ─── Experience Tab ────────────────────────────────────────────────────────────
const EMPTY_EXP: ExperienceEntry = {
  role: { en: "", pt: "" }, company: "", type: { en: "", pt: "" },
  period: { en: "", pt: "" }, location: { en: "", pt: "" },
  description: { en: "", pt: "" }, tags: { en: [], pt: [] }, current: false,
};

function ExperienceTab() {
  const { config, setConfig } = useSiteConfig();
  const [editing, setEditing] = useState<ExperienceEntry | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const { saved, flash } = useSaved();

  function save(entry: ExperienceEntry) {
    const list = [...config.experience];
    if (editingIdx === null) { list.unshift(entry); } else { list[editingIdx] = entry; }
    setConfig({ experience: list });
    setEditing(null); setEditingIdx(null); flash();
  }

  function remove(idx: number) {
    if (!confirm("Eliminar esta experiência?")) return;
    const list = config.experience.filter((_, i) => i !== idx);
    setConfig({ experience: list });
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const list = [...config.experience];
    [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
    setConfig({ experience: list });
  }

  if (editing !== null) {
    return <ExperienceForm initial={editing} onSave={save} onCancel={() => { setEditing(null); setEditingIdx(null); }} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">Experiência Profissional</h2>
        <button onClick={() => { setEditing(EMPTY_EXP); setEditingIdx(null); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      <div className="space-y-3">
        {config.experience.map((exp, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{exp.role.pt || exp.role.en}</h3>
              <p className="text-sm text-muted-foreground">{exp.company} · {exp.period.pt || exp.period.en}</p>
              {exp.current && <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">Atual</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-2 rounded-lg bg-white/5 text-muted-foreground disabled:opacity-30 hover:text-primary transition-all text-xs">↑</button>
              <button onClick={() => { setEditing(exp); setEditingIdx(idx); }} className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => remove(idx)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all text-muted-foreground"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setConfig({ experience: DEFAULT_CONFIG.experience })} className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
        <RefreshCw className="w-3 h-3" /> Repor valores originais
      </button>
      <SaveBanner saved={saved} />
    </div>
  );
}

function ExperienceForm({ initial, onSave, onCancel }: { initial: ExperienceEntry; onSave: (e: ExperienceEntry) => void; onCancel: () => void }) {
  const [f, setF] = useState(initial);
  const upd2 = (k: keyof ExperienceEntry, lang: "en" | "pt") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(p => ({ ...p, [k]: { ...(p[k] as Record<string,string>), [lang]: e.target.value } }));
  const updTags = (lang: "en" | "pt") => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF(p => ({ ...p, tags: { ...p.tags, [lang]: e.target.value.split(",").map(s => s.trim()).filter(Boolean) } }));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">{f.company || "Nova Experiência"}</h2>
        <button onClick={onCancel} className="p-2 rounded-lg bg-white/5 text-muted-foreground"><X className="w-4 h-4" /></button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cargo (PT)"><input className={inputCls} value={f.role.pt} onChange={upd2("role","pt")} required /></Field>
          <Field label="Cargo (EN)"><input className={inputCls} value={f.role.en} onChange={upd2("role","en")} required /></Field>
        </div>
        <Field label="Empresa"><input className={inputCls} value={f.company} onChange={e => setF(p => ({ ...p, company: e.target.value }))} required /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tipo (PT)"><input className={inputCls} value={f.type.pt} onChange={upd2("type","pt")} placeholder="Estágio Curricular" /></Field>
          <Field label="Tipo (EN)"><input className={inputCls} value={f.type.en} onChange={upd2("type","en")} placeholder="Curricular Internship" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Período (PT)"><input className={inputCls} value={f.period.pt} onChange={upd2("period","pt")} placeholder="jan 2025 – jun 2025 · 6 meses" /></Field>
          <Field label="Período (EN)"><input className={inputCls} value={f.period.en} onChange={upd2("period","en")} placeholder="Jan 2025 – Jun 2025 · 6 months" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Localização (PT)"><input className={inputCls} value={f.location.pt} onChange={upd2("location","pt")} /></Field>
          <Field label="Localização (EN)"><input className={inputCls} value={f.location.en} onChange={upd2("location","en")} /></Field>
        </div>
        <Field label="Descrição (PT)"><textarea className={textareaCls} rows={3} value={f.description.pt} onChange={upd2("description","pt")} /></Field>
        <Field label="Descrição (EN)"><textarea className={textareaCls} rows={3} value={f.description.en} onChange={upd2("description","en")} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tags (PT) — vírgula"><input className={inputCls} value={f.tags.pt.join(", ")} onChange={updTags("pt")} placeholder="Cibersegurança, Redes..." /></Field>
          <Field label="Tags (EN) — vírgula"><input className={inputCls} value={f.tags.en.join(", ")} onChange={updTags("en")} placeholder="Cybersecurity, Networks..." /></Field>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" checked={f.current} onChange={e => setF(p => ({ ...p, current: e.target.checked }))} />
          <span className="text-sm">Posição atual</span>
        </label>
        <div className="flex gap-3">
          <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            <Save className="w-4 h-4" /> Guardar
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 text-muted-foreground text-sm">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

// ─── Skills Tab ────────────────────────────────────────────────────────────────
const EMPTY_CAT: SkillCategory = { title_en: "", title_pt: "", skills: [] };

function SkillsTab() {
  const { config, setConfig } = useSiteConfig();
  const [editing, setEditing] = useState<SkillCategory | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const { saved, flash } = useSaved();

  function save(cat: SkillCategory) {
    const list = [...config.skills];
    if (editingIdx === null) { list.push(cat); } else { list[editingIdx] = cat; }
    setConfig({ skills: list });
    setEditing(null); setEditingIdx(null); flash();
  }

  function remove(idx: number) {
    if (!confirm("Eliminar esta categoria?")) return;
    setConfig({ skills: config.skills.filter((_, i) => i !== idx) });
  }

  if (editing !== null) {
    return <SkillCatForm initial={editing} onSave={save} onCancel={() => { setEditing(null); setEditingIdx(null); }} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">Competências</h2>
        <button onClick={() => { setEditing(EMPTY_CAT); setEditingIdx(null); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
          <Plus className="w-4 h-4" /> Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {config.skills.map((cat, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{cat.title_pt || cat.title_en}</h3>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(cat); setEditingIdx(idx); }} className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(idx)} className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all text-muted-foreground"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map(s => <span key={s} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{s}</span>)}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setConfig({ skills: DEFAULT_CONFIG.skills })} className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
        <RefreshCw className="w-3 h-3" /> Repor valores originais
      </button>
      <SaveBanner saved={saved} />
    </div>
  );
}

function SkillCatForm({ initial, onSave, onCancel }: { initial: SkillCategory; onSave: (c: SkillCategory) => void; onCancel: () => void }) {
  const [f, setF] = useState(initial);
  const [skillsStr, setSkillsStr] = useState(initial.skills.join(", "));

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...f, skills: skillsStr.split(",").map(s => s.trim()).filter(Boolean) });
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">Categoria de Competências</h2>
        <button onClick={onCancel} className="p-2 rounded-lg bg-white/5 text-muted-foreground"><X className="w-4 h-4" /></button>
      </div>
      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Título (PT)"><input className={inputCls} value={f.title_pt} onChange={e => setF(p => ({ ...p, title_pt: e.target.value }))} required /></Field>
          <Field label="Título (EN)"><input className={inputCls} value={f.title_en} onChange={e => setF(p => ({ ...p, title_en: e.target.value }))} required /></Field>
        </div>
        <Field label="Competências (separadas por vírgula)">
          <textarea className={textareaCls} rows={4} value={skillsStr} onChange={e => setSkillsStr(e.target.value)} placeholder="Windows 10/11, Active Directory, Office 365..." />
        </Field>
        <div className="flex gap-3">
          <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            <Save className="w-4 h-4" /> Guardar
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 text-muted-foreground text-sm">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
