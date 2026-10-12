import { useState } from "react";
import {
  Home, FileText, User, ArrowLeft, Search, Calendar,
  Users, MapPin, Monitor, Wind, Clock, AlertTriangle,
  LayoutDashboard, Building2, LogOut, Eye, Check, X, Bell,
  EyeOff, Mail, Lock, ArrowRight, Package,
} from "lucide-react";
import { motion } from "motion/react";
import { PeminjamanBarang } from "./components/PeminjamanBarang";
import { ProfileView } from "./components/ProfileView";

/* ─── Types & Data ────────────────────────────────────────────── */

type AppState = "login" | "forgot" | "register" | "main";
type StatusKey = "waiting" | "approved" | "rejected";
type Role = "user" | "admin";
type ViewMode = "mobile" | "desktop";

const STATUS_CFG: Record<StatusKey, { label: string; cls: string }> = {
  waiting: { label: "Menunggu Verifikasi", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  approved: { label: "Disetujui", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Ditolak", cls: "bg-red-50 text-red-700 border-red-200" },
};

interface Sub {
  id: string; name: string; room: string; date: string;
  time: string; status: StatusKey; purpose: string; capacity: string;
}

const SUBS: Sub[] = [
  { id: "SIP-001", name: "Rani Amelia", room: "Ruang Seminar A", date: "20 Sep 2026", time: "08.00–12.00", status: "waiting", purpose: "Pelaksanaan kegiatan mahasiswa dalam rangka seminar akademik dan presentasi hasil penelitian.", capacity: "60 orang" },
  { id: "SIP-002", name: "Budi Santoso", room: "Ruang Lab Komputer 1", date: "21 Sep 2026", time: "13.00–15.00", status: "approved", purpose: "Praktikum jaringan komputer untuk mahasiswa semester 5.", capacity: "30 orang" },
  { id: "SIP-003", name: "Dewi Lestari", room: "Ruang Rapat B", date: "22 Sep 2026", time: "09.00–11.00", status: "rejected", purpose: "Rapat rutin organisasi mahasiswa BEM Fakultas.", capacity: "20 orang" },
  { id: "SIP-004", name: "Ahmad Fauzi", room: "Ruang Seminar B", date: "23 Sep 2026", time: "14.00–16.00", status: "waiting", purpose: "Seminar kewirausahaan untuk mahasiswa angkatan baru.", capacity: "80 orang" },
];

interface Room { name: string; cap: number; loc: string; available: boolean; }
const ROOMS: Room[] = [
  { name: "Ruang Seminar A", cap: 60, loc: "Gedung Fak. Teknik, Lt.2", available: true },
  { name: "Ruang Lab Komputer 1", cap: 40, loc: "Gedung TI, Lt.1", available: false },
  { name: "Ruang Rapat B", cap: 20, loc: "Gedung Rektorat, Lt.3", available: true },
  { name: "Ruang Seminar B", cap: 80, loc: "Gedung Fak. Teknik, Lt.1", available: true },
  { name: "Ruang Multimedia", cap: 35, loc: "Gedung TI, Lt.2", available: false },
  { name: "Ruang Diskusi C", cap: 15, loc: "Perpustakaan, Lt.2", available: true },
];

/* ─── Shared Components ──────────────────────────────────────── */

function StatusBadge({ status }: { status: StatusKey }) {
  const { label, cls } = STATUS_CFG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {label}
    </span>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto" style={{ width: 390 }}>
      <div className="rounded-[48px] bg-slate-900 p-3 shadow-2xl">
        <div className="rounded-[38px] overflow-hidden flex flex-col" style={{ height: 760, background: "#F8FAFC" }}>
          <div className="bg-[#2563EB] px-6 flex items-center justify-between shrink-0" style={{ height: 44 }}>
            <span className="text-white text-[11px] font-bold">09:41</span>
            <div className="w-20 h-4 rounded-full bg-black/20" />
            <div className="flex items-end gap-[3px]">
              {[8, 12, 16].map((h) => (
                <div key={h} className="w-[3px] bg-white/80 rounded-sm" style={{ height: h }} />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════════════════════ */

function LoginPage({ onLogin, onForgot, onRegister }: {
  onLogin: () => void;
  onForgot: () => void;
  onRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.trim()) e.email = "Email wajib diisi";
    else if (!email.includes("@")) e.email = "Format email tidak valid";
    if (!password) e.password = "Password wajib diisi";
    else if (password.length < 6) e.password = "Password minimal 6 karakter";
    return e;
  };

  const handleSubmit = async () => {
    setLoginError("");
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onLogin();
  };

  const clearErr = (key: "email" | "password") =>
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });

  const features = [
    "Cari ruang tersedia secara real-time",
    "Ajukan peminjaman kapan saja",
    "Pantau status pengajuan Anda",
  ];

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ── Left brand panel (desktop lg+) ─────────────── */}
      <motion.div
        className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#1E40AF] flex-col items-center justify-center px-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/3 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-1/4 left-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Building2 size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">SIPINJAM</h1>
          <p className="text-blue-200 text-lg font-medium mb-2">Sistem Informasi Peminjaman</p>
          <p className="text-blue-300 text-sm leading-relaxed max-w-xs mx-auto">
            Platform digital untuk peminjaman ruang dan peralatan kampus yang mudah, cepat, dan transparan.
          </p>

          <div className="mt-10 space-y-3 text-left">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.35, ease: "easeOut" }}
              >
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-blue-100 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right form panel ──────────────────────────── */}
      <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo (hidden on desktop) */}
          <motion.div
            className="lg:hidden flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/30">
              <Building2 size={28} className="text-white" />
            </div>
            <p className="text-[#2563EB] font-bold text-2xl tracking-tight">SIPINJAM</p>
          </motion.div>

          {/* Title */}
          <motion.div
            className="mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-[#0F172A]">Selamat Datang</h2>
            <p className="text-[#64748B] text-sm mt-1.5">Masuk untuk mulai mencari dan memesan ruang</p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            {/* Login error */}
            {loginError && (
              <motion.div
                className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <AlertTriangle size={14} className="text-[#DC2626] shrink-0" />
                <p className="text-sm text-[#DC2626]">{loginError}</p>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Email atau Username</label>
              <div className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-200 ${
                errors.email
                  ? "border-[#DC2626] bg-red-50"
                  : "border-[#E2E8F0] bg-white focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              }`}>
                <Mail size={16} className={`shrink-0 transition-colors ${errors.email ? "text-[#DC2626]" : "text-[#94A3B8]"}`} />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1">
                  <AlertTriangle size={10} /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Password</label>
              <div className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-200 ${
                errors.password
                  ? "border-[#DC2626] bg-red-50"
                  : "border-[#E2E8F0] bg-white focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              }`}>
                <Lock size={16} className={`shrink-0 transition-colors ${errors.password ? "text-[#DC2626]" : "text-[#94A3B8]"}`} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearErr("password"); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="shrink-0 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1">
                  <AlertTriangle size={10} /> {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 cursor-pointer ${
                    remember ? "bg-[#2563EB] border-[#2563EB]" : "border-[#CBD5E1] bg-white"
                  }`}
                >
                  {remember && <Check size={10} className="text-white" />}
                </div>
                <span className="text-xs text-[#64748B]">Ingat Saya</span>
              </label>
              <button
                type="button"
                onClick={onForgot}
                className="text-xs font-semibold text-[#2563EB] hover:underline transition-colors"
              >
                Lupa Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:opacity-80 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] active:shadow-sm active:translate-y-px"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[#E2E8F0]" />
              <span className="text-xs text-[#94A3B8]">atau</span>
              <div className="flex-1 h-px bg-[#E2E8F0]" />
            </div>

            {/* Register */}
            <p className="text-center text-sm text-[#64748B]">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={onRegister}
                className="font-semibold text-[#2563EB] hover:underline transition-colors"
              >
                Daftar Sekarang
              </button>
            </p>

            {/* Prototype hint */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-2">
              <p className="text-xs text-amber-700 text-center">
                <span className="font-bold">Prototype:</span> Gunakan email apapun (format valid) dan password min. 6 karakter
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Forgot Password Page ──────────────────────────────────── */

function ForgotPasswordPage({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) { setEmailErr("Email wajib diisi"); return; }
    if (!email.includes("@")) { setEmailErr("Format email tidak valid"); return; }
    setEmailErr("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-8 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Login
          </button>

          {sent ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">Instruksi Terkirim</h2>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                Kami telah mengirimkan instruksi pemulihan password ke <span className="font-semibold text-[#0F172A]">{email}</span>. Periksa kotak masuk Anda.
              </p>
              <button onClick={onBack}
                className="w-full border border-[#2563EB] text-[#2563EB] py-3 rounded-xl font-bold text-sm hover:bg-[#EFF6FF] transition-colors">
                Kembali ke Login
              </button>
            </motion.div>
          ) : (
            <>
              <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mb-6">
                <Mail size={26} className="text-[#2563EB]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-1.5">Lupa Password?</h2>
              <p className="text-sm text-[#64748B] mb-7 leading-relaxed">
                Masukkan email akun Anda dan kami akan mengirimkan instruksi untuk membuat password baru.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Email</label>
                  <div className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-200 ${
                    emailErr ? "border-[#DC2626] bg-red-50" : "border-[#E2E8F0] bg-white focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                  }`}>
                    <Mail size={16} className="text-[#94A3B8] shrink-0" />
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                    />
                  </div>
                  {emailErr && (
                    <p className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertTriangle size={10} /> {emailErr}
                    </p>
                  )}
                </div>

                <button onClick={handleSubmit} disabled={loading}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:opacity-80 text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <span>Kirim Instruksi</span>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Register Page ─────────────────────────────────────────── */

function RegisterPage({ onBack, onRegister }: { onBack: () => void; onRegister: () => void }) {
  const [form, setForm] = useState({ nama: "", email: "", nim: "", role: "mahasiswa", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };

  const handleSubmit = async () => {
    const e: Record<string, string> = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!form.email.includes("@")) e.email = "Format email tidak valid";
    if (!form.nim.trim()) e.nim = "NIM/NIP wajib diisi";
    if (!form.password) e.password = "Password wajib diisi";
    else if (form.password.length < 6) e.password = "Password minimal 6 karakter";
    if (!form.confirm) e.confirm = "Konfirmasi password wajib diisi";
    else if (form.confirm !== form.password) e.confirm = "Password tidak cocok";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onRegister();
  };

  const errMsg = (key: string) => errors[key] ? (
    <p className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1">
      <AlertTriangle size={10} /> {errors[key]}
    </p>
  ) : null;

  const inputCls = (key: string) =>
    `flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-200 ${
      errors[key] ? "border-[#DC2626] bg-red-50" : "border-[#E2E8F0] bg-white focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
    }`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Login
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#2563EB] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Buat Akun Baru</h2>
              <p className="text-xs text-[#64748B]">Daftar untuk menggunakan SIPINJAM</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Nama */}
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Nama Lengkap <span className="text-[#DC2626]">*</span></label>
              <div className={inputCls("nama")}>
                <User size={16} className="text-[#94A3B8] shrink-0" />
                <input type="text" placeholder="Nama lengkap Anda" value={form.nama}
                  onChange={(e) => setField("nama", e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
              </div>
              {errMsg("nama")}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Email <span className="text-[#DC2626]">*</span></label>
              <div className={inputCls("email")}>
                <Mail size={16} className="text-[#94A3B8] shrink-0" />
                <input type="email" placeholder="nama@email.com" value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
              </div>
              {errMsg("email")}
            </div>

            {/* NIM/NIP + Role (2 col) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">NIM / NIP <span className="text-[#DC2626]">*</span></label>
                <div className={inputCls("nim")}>
                  <Users size={15} className="text-[#94A3B8] shrink-0" />
                  <input type="text" placeholder="NIM atau NIP" value={form.nim}
                    onChange={(e) => setField("nim", e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300 w-0" />
                </div>
                {errMsg("nim")}
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Peran</label>
                <select value={form.role} onChange={(e) => setField("role", e.target.value)}
                  className="w-full border border-[#E2E8F0] bg-white rounded-xl px-3.5 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] transition-colors">
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="petugas">Petugas</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Password <span className="text-[#DC2626]">*</span></label>
              <div className={inputCls("password")}>
                <Lock size={16} className="text-[#94A3B8] shrink-0" />
                <input type={showPass ? "text" : "password"} placeholder="Min. 6 karakter" value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="shrink-0 text-[#94A3B8] hover:text-[#64748B] transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errMsg("password")}
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Konfirmasi Password <span className="text-[#DC2626]">*</span></label>
              <div className={inputCls("confirm")}>
                <Lock size={16} className="text-[#94A3B8] shrink-0" />
                <input type={showConfirm ? "text" : "password"} placeholder="Ulangi password" value={form.confirm}
                  onChange={(e) => setField("confirm", e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="shrink-0 text-[#94A3B8] hover:text-[#64748B] transition-colors">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errMsg("confirm")}
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:opacity-80 text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.35)] mt-1">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mendaftarkan...</span>
                </>
              ) : (
                <span>Daftar Sekarang</span>
              )}
            </button>

            <p className="text-center text-sm text-[#64748B]">
              Sudah punya akun?{" "}
              <button onClick={onBack} className="font-semibold text-[#2563EB] hover:underline">
                Masuk di sini
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   USER MOBILE  (M01 – M04)
══════════════════════════════════════════════════════════════ */

function M01({ nav }: { nav: (s: string) => void }) {
  const [date, setDate] = useState("");
  const [cap, setCap] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
        <span className="text-[#2563EB] font-bold text-lg tracking-tight">SIPINJAM</span>
        <div className="w-9 h-9 bg-[#EFF6FF] rounded-full flex items-center justify-center">
          <User size={16} className="text-[#2563EB]" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Cari Ruang</h1>
          <p className="text-sm text-[#64748B] mt-1">Temukan ruang yang tersedia</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 space-y-3 shadow-sm">
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-1.5">Tanggal</label>
            <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-3 py-2.5 bg-[#F8FAFC] focus-within:border-[#2563EB] transition-colors">
              <Calendar size={14} className="text-[#94A3B8] shrink-0" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-1.5">Kapasitas (orang)</label>
            <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-3 py-2.5 bg-[#F8FAFC] focus-within:border-[#2563EB] transition-colors">
              <Users size={14} className="text-[#94A3B8] shrink-0" />
              <input type="number" placeholder="Min. kapasitas" value={cap}
                onChange={(e) => setCap(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
            </div>
          </div>
          <button onClick={() => setSearched(true)}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
            <Search size={14} /> Cari Ruang
          </button>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#0F172A] mb-3">
            {searched ? "Hasil Pencarian" : "Ruang Tersedia"}
          </h2>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-3">
            <div className="h-32 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center relative">
              <Building2 size={48} className="text-white/20" />
              <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Tersedia</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#0F172A] text-sm mb-1">Ruang Seminar A</h3>
              <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3">
                <span className="flex items-center gap-1"><Users size={11} className="text-[#94A3B8]" /> 60 orang</span>
                <span className="flex items-center gap-1"><MapPin size={11} className="text-[#94A3B8]" /> Gedung Fak. Teknik</span>
              </div>
              <button onClick={() => nav("M02")}
                className="w-full border border-[#2563EB] text-[#2563EB] py-2 rounded-xl text-sm font-semibold hover:bg-[#EFF6FF] transition-colors">
                Lihat Detail
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden opacity-40 pointer-events-none">
            <div className="h-20 bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
              <Building2 size={32} className="text-white/30" />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-[#0F172A] text-sm">Ruang Lab Komputer 1</h3>
              <p className="text-xs text-[#64748B] mt-0.5">40 orang · Gedung TI</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white border-t border-[#E2E8F0] flex px-2 py-1.5 shrink-0">
        <button className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <Home size={20} className="text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">Beranda</span>
        </button>
        <button onClick={() => nav("M04")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <FileText size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Pengajuan</span>
        </button>
        <button onClick={() => nav("Profil")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <User size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Profil</span>
        </button>
      </nav>
    </div>
  );
}

function M02({ nav }: { nav: (s: string) => void }) {
  const facilities = [
    { label: "Proyektor", Icon: Monitor },
    { label: "Meja", Icon: Monitor },
    { label: "Kursi", Icon: Users },
    { label: "AC", Icon: Wind },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("M01")} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <h1 className="font-semibold text-[#0F172A]">Detail Ruang</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="h-44 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center relative">
          <Building2 size={64} className="text-white/20" />
          <span className="absolute bottom-3 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Tersedia</span>
        </div>

        <div className="px-5 py-5 space-y-5">
          <h2 className="text-xl font-bold text-[#0F172A]">Ruang Seminar A</h2>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] divide-y divide-[#E2E8F0]">
            {[
              { Icon: Users, label: "Kapasitas", value: "60 orang" },
              { Icon: MapPin, label: "Lokasi", value: "Gedung Fakultas Teknik, Lantai 2" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#94A3B8] uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-3">Fasilitas</h3>
            <div className="grid grid-cols-2 gap-2">
              {facilities.map(({ label, Icon }) => (
                <div key={label} className="bg-white border border-[#E2E8F0] rounded-xl px-3 py-2.5 flex items-center gap-2">
                  <Icon size={14} className="text-[#2563EB]" />
                  <span className="text-sm text-[#0F172A]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-white border-t border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("M03")}
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-xl font-bold text-sm transition-colors">
          Ajukan Peminjaman
        </button>
      </div>
    </div>
  );
}

function M03({ nav }: { nav: (s: string) => void }) {
  const [form, setForm] = useState({ tanggal: "", waktu: "", tujuan: "", pj: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  const setField = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.tanggal) e.tanggal = "Field ini wajib diisi";
    if (!form.waktu) e.waktu = "Field ini wajib diisi";
    if (!form.tujuan) e.tujuan = "Field ini wajib diisi";
    if (!form.pj) e.pj = "Field ini wajib diisi";
    setTouched(true);
    if (Object.keys(e).length) { setErrors(e); return; }
    nav("M04");
  };

  const hasErr = touched && Object.values(errors).some(Boolean);
  const errMsg = (key: string) => errors[key] ? (
    <p className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1">
      <AlertTriangle size={10} /> {errors[key]}
    </p>
  ) : null;
  const inputCls = (key: string) =>
    `flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-colors ${
      errors[key] ? "border-[#DC2626] bg-red-50" : "border-[#E2E8F0] bg-white focus-within:border-[#2563EB]"
    }`;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("M02")} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <h1 className="font-semibold text-[#0F172A]">Form Pengajuan</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {hasErr && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <AlertTriangle size={15} className="text-[#DC2626] shrink-0" />
            <p className="text-sm text-[#DC2626] font-semibold">Harap lengkapi semua field yang wajib diisi.</p>
          </div>
        )}

        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-4 py-3">
          <p className="text-[11px] text-[#64748B] uppercase tracking-wide mb-0.5">Ruang yang dipilih</p>
          <p className="text-sm font-bold text-[#0F172A]">Ruang Seminar A</p>
          <p className="text-xs text-[#64748B]">Gedung Fakultas Teknik, Lantai 2</p>
        </div>

        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Tanggal <span className="text-[#DC2626]">*</span></label>
          <div className={inputCls("tanggal")}>
            <Calendar size={14} className="text-[#94A3B8] shrink-0" />
            <input type="date" value={form.tanggal} onChange={(e) => setField("tanggal", e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" />
          </div>
          {errMsg("tanggal")}
        </div>

        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Waktu <span className="text-[#DC2626]">*</span></label>
          <div className={inputCls("waktu")}>
            <Clock size={14} className="text-[#94A3B8] shrink-0" />
            <input type="text" placeholder="Contoh: 08.00–12.00" value={form.waktu}
              onChange={(e) => setField("waktu", e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
          </div>
          {errMsg("waktu")}
        </div>

        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Tujuan/Kegiatan <span className="text-[#DC2626]">*</span></label>
          <textarea placeholder="Jelaskan tujuan penggunaan ruang..." value={form.tujuan}
            onChange={(e) => setField("tujuan", e.target.value)} rows={3}
            className={`w-full border rounded-xl px-3 py-2.5 text-sm text-[#0F172A] outline-none resize-none placeholder-slate-300 transition-colors ${
              errors.tujuan ? "border-[#DC2626] bg-red-50" : "border-[#E2E8F0] bg-white focus:border-[#2563EB]"
            }`}
          />
          {errMsg("tujuan")}
        </div>

        <div>
          <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Penanggung Jawab <span className="text-[#DC2626]">*</span></label>
          <div className={inputCls("pj")}>
            <User size={14} className="text-[#94A3B8] shrink-0" />
            <input type="text" placeholder="Nama penanggung jawab" value={form.pj}
              onChange={(e) => setField("pj", e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
          </div>
          {errMsg("pj")}
        </div>
      </div>

      <div className="px-5 py-4 bg-white border-t border-[#E2E8F0] shrink-0">
        <button onClick={submit}
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-xl font-bold text-sm transition-colors">
          Ajukan Peminjaman
        </button>
      </div>
    </div>
  );
}

function M04({ nav }: { nav: (s: string) => void }) {
  const [view, setView] = useState<StatusKey>("waiting");

  type TlState = "done" | "active" | "error" | "idle";
  const steps: { label: string; sub: string; state: TlState }[] = [
    { label: "Pengajuan Dibuat", sub: "20 Sep 2026, 10.30", state: "done" },
    { label: "Menunggu Verifikasi", sub: view === "waiting" ? "Ditinjau oleh petugas sarana" : "Selesai ditinjau", state: view === "waiting" ? "active" : "done" },
    { label: view === "approved" ? "Disetujui" : "Ditolak", sub: "20 Sep 2026, 14.00", state: view === "approved" ? "done" : view === "rejected" ? "error" : "idle" },
  ];

  const tlCfg: Record<TlState, { ring: string; icon: React.ReactNode; text: string }> = {
    done: { ring: "bg-emerald-500", icon: <Check size={11} className="text-white" />, text: "text-emerald-700" },
    active: { ring: "bg-[#2563EB]", icon: <Clock size={11} className="text-white" />, text: "text-[#2563EB] font-bold" },
    error: { ring: "bg-[#DC2626]", icon: <X size={11} className="text-white" />, text: "text-[#DC2626]" },
    idle: { ring: "bg-slate-200", icon: null, text: "text-slate-400" },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("M01")} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <h1 className="font-semibold text-[#0F172A]">Status Pengajuan</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div className="bg-slate-100 rounded-xl p-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Demo — Pilih State</p>
          <div className="flex bg-white rounded-lg p-0.5 gap-0.5">
            {(["waiting", "approved", "rejected"] as StatusKey[]).map((s) => (
              <button key={s} onClick={() => setView(s)}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  view === s ? "bg-[#2563EB] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}>
                {s === "waiting" ? "Menunggu" : s === "approved" ? "Disetujui" : "Ditolak"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 space-y-3">
          {[
            { label: "No. Pengajuan", value: "SIP-001", mono: true },
            { label: "Ruang", value: "Ruang Seminar A" },
            { label: "Tanggal", value: "20 September 2026" },
            { label: "Waktu", value: "08.00–12.00" },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-[#64748B]">{label}</span>
              <span className={`text-sm font-semibold text-[#0F172A] ${mono ? "font-mono" : ""}`}>{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
            <span className="text-xs text-[#64748B]">Status</span>
            <StatusBadge status={view} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
          <h3 className="text-sm font-bold text-[#0F172A] mb-4">Progres Pengajuan</h3>
          <div>
            {steps.map((step, i) => {
              if (step.state === "idle") return null;
              const visible = steps.filter((s) => s.state !== "idle");
              const isLast = visible.indexOf(step) === visible.length - 1;
              const { ring, icon, text } = tlCfg[step.state];
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-7 h-7 rounded-full ${ring} flex items-center justify-center`}>{icon}</div>
                    {!isLast && <div className="w-0.5 bg-[#E2E8F0] my-1 flex-1" style={{ minHeight: 28 }} />}
                  </div>
                  <div className={isLast ? "pb-0" : "pb-2"}>
                    <p className={`text-sm font-semibold ${text}`}>{step.label}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{step.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {view === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-[11px] font-bold text-[#DC2626] uppercase tracking-wide mb-1.5">Alasan Penolakan</p>
            <p className="text-sm text-[#7F1D1D] leading-relaxed">"Jadwal ruang bertabrakan dengan penggunaan lain."</p>
          </div>
        )}
        {view === "approved" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Check size={12} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-700">Pengajuan Disetujui</p>
              <p className="text-xs text-emerald-600 mt-1">Silakan gunakan ruang sesuai jadwal yang disetujui.</p>
            </div>
          </div>
        )}
      </div>

      <nav className="bg-white border-t border-[#E2E8F0] flex px-2 py-1.5 shrink-0">
        <button onClick={() => nav("M01")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <Home size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Beranda</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <FileText size={20} className="text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">Pengajuan</span>
        </button>
        <button onClick={() => nav("Profil")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <User size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Profil</span>
        </button>
      </nav>
    </div>
  );
}

function MProfile({ nav }: { nav: (s: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("M01")} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <h1 className="font-semibold text-[#0F172A]">Profil Saya</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ProfileView onBack={() => nav("M01")} isMobile={true} />
      </div>
      <nav className="bg-white border-t border-[#E2E8F0] flex px-2 py-1.5 shrink-0">
        <button onClick={() => nav("M01")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <Home size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Beranda</span>
        </button>
        <button onClick={() => nav("M04")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <FileText size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Pengajuan</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <User size={20} className="text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">Profil</span>
        </button>
      </nav>
    </div>
  );
}

function MobileUserPrototype() {
  const [screen, setScreen] = useState("M01");
  const screens = ["M01", "M02", "M03", "M04", "API-Barang", "Profil"];
  return (
    <div className="flex flex-col items-center py-8 min-h-[calc(100vh-56px)] bg-slate-200 overflow-x-auto">
      <div className="flex items-center gap-1.5 mb-6">
        {screens.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <button onClick={() => setScreen(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                screen === s ? "bg-[#2563EB] text-white" : "bg-white text-slate-500 hover:text-[#2563EB] border border-slate-200"
              }`}>{s}</button>
            {i < screens.length - 1 && <span className="text-slate-400 text-xs">→</span>}
          </div>
        ))}
      </div>
      <PhoneFrame>
        {screen === "M01" && <M01 nav={setScreen} />}
        {screen === "M02" && <M02 nav={setScreen} />}
        {screen === "M03" && <M03 nav={setScreen} />}
        {screen === "M04" && <M04 nav={setScreen} />}
        {screen === "API-Barang" && (
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <PeminjamanBarang />
          </div>
        )}
        {screen === "Profil" && <MProfile nav={setScreen} />}
      </PhoneFrame>
      <p className="mt-4 text-xs text-slate-400 text-center">Klik tombol atau navigasi di dalam layar untuk berpindah halaman</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   USER DESKTOP  (DM01 – DM04)
══════════════════════════════════════════════════════════════ */

function UserDesktopSidebar({
  screen,
  setScreen,
  onLogout,
  user,
}: {
  screen: string;
  setScreen: (s: string) => void;
  onLogout?: () => void;
  user?: { name?: string; prodi?: string } | null;
}) {
  const isActive = (key: string) => {
    if (key === "DM01") return ["DM01", "DM02", "DM03"].includes(screen);
    return screen === key;
  };
  const items = [
    { key: "DM01", label: "Beranda", Icon: Home },
    { key: "peminjaman-barang", label: "Pinjam Barang (API)", Icon: Package },
    { key: "DM04", label: "Pengajuan Saya", Icon: FileText },
    { key: "profile", label: "Profil", Icon: User },
  ];
  return (
    <aside className="w-60 bg-white border-r border-[#E2E8F0] flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-[#E2E8F0]">
        <p className="text-[#2563EB] font-bold text-xl tracking-tight">SIPINJAM</p>
        <p className="text-xs text-[#64748B] mt-0.5">Portal Mahasiswa</p>
      </div>
      <div className="px-4 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#EFF6FF] rounded-full flex items-center justify-center shrink-0">
            <User size={16} className="text-[#2563EB]" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-[#0F172A] truncate">{user?.name || "Rani Amelia"}</p>
            <p className="text-xs text-[#64748B] truncate">{user?.prodi ? `Mahasiswa · ${user.prodi}` : "Mahasiswa · TI-2023"}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setScreen(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors ${
              isActive(key) ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            }`}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-[#E2E8F0]">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-red-50 hover:text-[#DC2626] transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

function DM01({ nav }: { nav: (s: string) => void }) {
  const [date, setDate] = useState("");
  const [cap, setCap] = useState("");
  const [searched, setSearched] = useState(false);
  const filtered = searched ? ROOMS.filter((r) => !cap || r.cap >= Number(cap)) : ROOMS;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Cari Ruang</h1>
          <p className="text-sm text-[#64748B] mt-1">Temukan ruang yang tersedia untuk kegiatan Anda</p>
        </div>
        <div className="relative">
          <Bell size={20} className="text-[#64748B]" />
          <span className="absolute -top-1 -right-1 bg-[#2563EB] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Ruang Tersedia", value: ROOMS.filter((r) => r.available).length, cls: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
          { label: "Tidak Tersedia", value: ROOMS.filter((r) => !r.available).length, cls: "text-slate-500", bg: "bg-slate-50 border-slate-200" },
          { label: "Pengajuan Aktif", value: 1, cls: "text-[#2563EB]", bg: "bg-[#EFF6FF] border-[#BFDBFE]" },
        ].map(({ label, value, cls, bg }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg}`}>
            <p className="text-xs text-[#64748B] mb-1">{label}</p>
            <p className={`text-2xl font-bold ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 mb-6 shadow-sm">
        <h2 className="text-sm font-bold text-[#0F172A] mb-4">Filter Pencarian</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-1.5">Tanggal</label>
            <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-3 py-2.5 bg-[#F8FAFC] focus-within:border-[#2563EB] transition-colors">
              <Calendar size={14} className="text-[#94A3B8] shrink-0" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-1.5">Kapasitas Minimum</label>
            <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-3 py-2.5 bg-[#F8FAFC] focus-within:border-[#2563EB] transition-colors">
              <Users size={14} className="text-[#94A3B8] shrink-0" />
              <input type="number" placeholder="Min. orang" value={cap} onChange={(e) => setCap(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={() => setSearched(true)}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <Search size={14} /> Cari Ruang
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-bold text-[#0F172A] mb-4">
        {searched ? `Hasil Pencarian (${filtered.length})` : `Semua Ruang (${ROOMS.length})`}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((room) => (
          <div key={room.name} className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden ${!room.available ? "opacity-60" : ""}`}>
            <div className={`h-28 flex items-center justify-center relative ${room.available ? "bg-gradient-to-br from-[#2563EB] to-[#1E40AF]" : "bg-gradient-to-br from-slate-400 to-slate-500"}`}>
              <Building2 size={36} className="text-white/20" />
              <span className={`absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${room.available ? "bg-emerald-500" : "bg-slate-600"}`}>
                {room.available ? "Tersedia" : "Tidak Tersedia"}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#0F172A] text-sm mb-1.5">{room.name}</h3>
              <p className="flex items-center gap-1.5 text-xs text-[#64748B] mb-0.5">
                <Users size={11} className="text-[#94A3B8]" /> {room.cap} orang
              </p>
              <p className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3">
                <MapPin size={11} className="text-[#94A3B8]" /> {room.loc}
              </p>
              {room.available ? (
                <button onClick={() => nav("DM02")}
                  className="w-full border border-[#2563EB] text-[#2563EB] py-1.5 rounded-xl text-xs font-semibold hover:bg-[#EFF6FF] transition-colors">
                  Lihat Detail
                </button>
              ) : (
                <div className="w-full border border-slate-200 text-slate-400 py-1.5 rounded-xl text-xs font-semibold text-center">
                  Tidak Tersedia
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DM02({ nav }: { nav: (s: string) => void }) {
  const facilities = ["Proyektor", "Meja & Kursi", "AC", "WiFi", "Papan Tulis", "Sound System"];
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav("DM01")}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-[#64748B]">
            <span className="hover:text-[#2563EB] cursor-pointer" onClick={() => nav("DM01")}>Beranda</span>
            {" / Detail Ruang"}
          </p>
          <h1 className="text-xl font-bold text-[#0F172A]">Ruang Seminar A</h1>
        </div>
        <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Tersedia</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          <div className="h-56 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center shadow-lg">
            <Building2 size={80} className="text-white/15" />
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">Informasi Ruang</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Users, label: "Kapasitas", value: "60 orang" },
                { Icon: MapPin, label: "Lokasi", value: "Gedung Fak. Teknik, Lantai 2" },
                { Icon: Clock, label: "Jam Operasional", value: "07.00–21.00" },
                { Icon: Building2, label: "Tipe Ruang", value: "Seminar / Kuliah" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">Fasilitas</h2>
            <div className="grid grid-cols-3 gap-2">
              {facilities.map((f) => (
                <div key={f} className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-3 py-2">
                  <Check size={13} className="text-emerald-500 shrink-0" />
                  <span className="text-sm text-[#0F172A]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h2 className="text-sm font-bold text-[#0F172A] mb-1">Ajukan Peminjaman</h2>
            <p className="text-xs text-[#64748B] mb-4">Isi form untuk meminjam ruang ini</p>
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3 mb-4">
              <p className="text-xs text-[#64748B] mb-0.5">Ruang Dipilih</p>
              <p className="text-sm font-bold text-[#0F172A]">Ruang Seminar A</p>
              <p className="text-xs text-[#2563EB] mt-0.5">60 orang · Gedung Fak. Teknik</p>
            </div>
            <button onClick={() => nav("DM03")}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-xl font-bold text-sm transition-colors">
              Ajukan Peminjaman
            </button>
            <p className="text-xs text-center text-[#94A3B8] mt-3">Diverifikasi petugas dalam 1×24 jam</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DM03({ nav }: { nav: (s: string) => void }) {
  const [form, setForm] = useState({ tanggal: "", waktu: "", tujuan: "", pj: "", jumlah: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  const setField = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };
  const submit = () => {
    const e: Record<string, string> = {};
    if (!form.tanggal) e.tanggal = "Wajib diisi";
    if (!form.waktu) e.waktu = "Wajib diisi";
    if (!form.tujuan) e.tujuan = "Wajib diisi";
    if (!form.pj) e.pj = "Wajib diisi";
    if (!form.jumlah) e.jumlah = "Wajib diisi";
    setTouched(true);
    if (Object.keys(e).length) { setErrors(e); return; }
    nav("DM04");
  };
  const hasErr = touched && Object.values(errors).some(Boolean);
  const errMsg = (key: string) => errors[key] ? (
    <p className="text-[11px] text-[#DC2626] mt-1 flex items-center gap-1"><AlertTriangle size={10} /> {errors[key]}</p>
  ) : null;
  const inputCls = (key: string) =>
    `flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-colors ${
      errors[key] ? "border-[#DC2626] bg-red-50" : "border-[#E2E8F0] bg-white focus-within:border-[#2563EB]"
    }`;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav("DM02")}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <div>
          <p className="text-xs text-[#64748B]">Beranda / Detail Ruang / <span className="text-[#0F172A] font-semibold">Form Pengajuan</span></p>
          <h1 className="text-xl font-bold text-[#0F172A]">Form Pengajuan Peminjaman</h1>
        </div>
      </div>

      {hasErr && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-6">
          <AlertTriangle size={15} className="text-[#DC2626] shrink-0" />
          <p className="text-sm text-[#DC2626] font-semibold">Harap lengkapi semua field yang wajib diisi.</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-5">Detail Peminjaman</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Tanggal <span className="text-[#DC2626]">*</span></label>
                <div className={inputCls("tanggal")}>
                  <Calendar size={14} className="text-[#94A3B8] shrink-0" />
                  <input type="date" value={form.tanggal} onChange={(e) => setField("tanggal", e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none" />
                </div>
                {errMsg("tanggal")}
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Waktu <span className="text-[#DC2626]">*</span></label>
                <div className={inputCls("waktu")}>
                  <Clock size={14} className="text-[#94A3B8] shrink-0" />
                  <input type="text" placeholder="Contoh: 08.00–12.00" value={form.waktu}
                    onChange={(e) => setField("waktu", e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
                </div>
                {errMsg("waktu")}
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Jumlah Peserta <span className="text-[#DC2626]">*</span></label>
                <div className={inputCls("jumlah")}>
                  <Users size={14} className="text-[#94A3B8] shrink-0" />
                  <input type="number" placeholder="Jumlah peserta" value={form.jumlah}
                    onChange={(e) => setField("jumlah", e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
                </div>
                {errMsg("jumlah")}
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Penanggung Jawab <span className="text-[#DC2626]">*</span></label>
                <div className={inputCls("pj")}>
                  <User size={14} className="text-[#94A3B8] shrink-0" />
                  <input type="text" placeholder="Nama penanggung jawab" value={form.pj}
                    onChange={(e) => setField("pj", e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
                </div>
                {errMsg("pj")}
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">Tujuan / Kegiatan <span className="text-[#DC2626]">*</span></label>
              <textarea placeholder="Jelaskan tujuan penggunaan ruang secara detail..." value={form.tujuan}
                onChange={(e) => setField("tujuan", e.target.value)} rows={4}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm text-[#0F172A] outline-none resize-none placeholder-slate-300 transition-colors ${
                  errors.tujuan ? "border-[#DC2626] bg-red-50" : "border-[#E2E8F0] bg-white focus:border-[#2563EB]"
                }`}
              />
              {errMsg("tujuan")}
            </div>
          </div>
          <button onClick={submit}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-xl font-bold text-sm transition-colors">
            Kirim Pengajuan
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">Ringkasan Peminjaman</h2>
            <div className="h-20 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-xl flex items-center justify-center mb-4">
              <Building2 size={32} className="text-white/30" />
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Ruang", value: "Ruang Seminar A" },
                { label: "Kapasitas", value: "60 orang" },
                { label: "Lokasi", value: "Gedung Fak. Teknik, Lt.2" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-[#64748B] shrink-0">{label}</span>
                  <span className="text-xs font-semibold text-[#0F172A] text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-700 mb-1">Perhatian</p>
            <p className="text-xs text-amber-600 leading-relaxed">Pengajuan akan diverifikasi oleh petugas sarana dalam 1×24 jam.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DM04({ nav }: { nav: (s: string) => void }) {
  const [view, setView] = useState<StatusKey>("waiting");

  type TlState = "done" | "active" | "error" | "idle";
  const steps: { label: string; sub: string; state: TlState }[] = [
    { label: "Pengajuan Dibuat", sub: "20 Sep 2026, 10.30", state: "done" },
    { label: "Menunggu Verifikasi", sub: view === "waiting" ? "Sedang ditinjau" : "Selesai", state: view === "waiting" ? "active" : "done" },
    { label: view === "approved" ? "Disetujui" : "Ditolak", sub: "20 Sep 2026, 14.00", state: view === "approved" ? "done" : view === "rejected" ? "error" : "idle" },
  ];
  const tlCfg: Record<TlState, { ring: string; icon: React.ReactNode; text: string }> = {
    done: { ring: "bg-emerald-500", icon: <Check size={11} className="text-white" />, text: "text-emerald-700" },
    active: { ring: "bg-[#2563EB]", icon: <Clock size={11} className="text-white" />, text: "text-[#2563EB] font-bold" },
    error: { ring: "bg-[#DC2626]", icon: <X size={11} className="text-white" />, text: "text-[#DC2626]" },
    idle: { ring: "bg-slate-200", icon: null, text: "text-slate-400" },
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav("DM01")}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">Status Pengajuan</h1>
        <div className="ml-auto"><StatusBadge status={view} /></div>
      </div>

      <div className="bg-slate-100 rounded-xl p-3 mb-6 inline-flex items-center gap-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Demo:</p>
        <div className="flex bg-white rounded-lg p-0.5 gap-0.5">
          {(["waiting", "approved", "rejected"] as StatusKey[]).map((s) => (
            <button key={s} onClick={() => setView(s)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                view === s ? "bg-[#2563EB] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}>
              {s === "waiting" ? "Menunggu" : s === "approved" ? "Disetujui" : "Ditolak"}
            </button>
          ))}
        </div>
      </div>

      {view === "approved" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
          <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <Check size={14} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-emerald-700">Pengajuan Disetujui</p>
            <p className="text-sm text-emerald-600 mt-0.5">Silakan gunakan ruang sesuai jadwal yang telah disetujui.</p>
          </div>
        </div>
      )}
      {view === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
          <div className="w-7 h-7 bg-[#DC2626] rounded-full flex items-center justify-center shrink-0">
            <X size={14} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-[#DC2626]">Pengajuan Ditolak</p>
            <p className="text-sm text-red-600 mt-0.5"><span className="font-semibold">Alasan:</span> Jadwal ruang bertabrakan dengan penggunaan lain.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-5">Detail Pengajuan</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {[
              { label: "No. Pengajuan", value: "SIP-001", mono: true },
              { label: "Status", value: null },
              { label: "Nama Pemohon", value: "Rani Amelia" },
              { label: "Ruang", value: "Ruang Seminar A" },
              { label: "Tanggal", value: "20 September 2026" },
              { label: "Waktu", value: "08.00–12.00" },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-1">{label}</p>
                {value === null
                  ? <StatusBadge status={view} />
                  : <p className={`text-sm font-semibold text-[#0F172A] ${mono ? "font-mono" : ""}`}>{value}</p>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">Progres Pengajuan</h2>
          <div>
            {steps.map((step, i) => {
              if (step.state === "idle") return null;
              const visible = steps.filter((s) => s.state !== "idle");
              const isLast = visible.indexOf(step) === visible.length - 1;
              const { ring, icon, text } = tlCfg[step.state];
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-7 h-7 rounded-full ${ring} flex items-center justify-center`}>{icon}</div>
                    {!isLast && <div className="w-0.5 bg-[#E2E8F0] my-1 flex-1" style={{ minHeight: 28 }} />}
                  </div>
                  <div className={isLast ? "pb-0" : "pb-4"}>
                    <p className={`text-sm font-semibold ${text}`}>{step.label}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{step.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopUserPrototype({ onLogout }: { onLogout?: () => void }) {
  const [screen, setScreen] = useState("DM01");
  const [currentUser, setCurrentUser] = useState<{ name?: string; prodi?: string } | null>(null);

  return (
    <div className="flex" style={{ height: "calc(100vh - 56px)" }}>
      <UserDesktopSidebar screen={screen} setScreen={setScreen} onLogout={onLogout} user={currentUser} />
      <div className="flex-1 overflow-hidden flex flex-col bg-[#F8FAFC]">
        {screen === "DM01" && <DM01 nav={setScreen} />}
        {screen === "DM02" && <DM02 nav={setScreen} />}
        {screen === "DM03" && <DM03 nav={setScreen} />}
        {screen === "DM04" && <DM04 nav={setScreen} />}
        {screen === "peminjaman-barang" && (
          <div className="flex-1 overflow-y-auto">
            <PeminjamanBarang />
          </div>
        )}
        {screen === "profile" && (
          <ProfileView
            onBack={() => setScreen("DM01")}
            onProfileUpdated={(u) => setCurrentUser({ name: u.name, prodi: u.prodi || undefined })}
          />
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN MOBILE  (AM01 – AM03)
══════════════════════════════════════════════════════════════ */

function AM01({ nav }: { nav: (s: string) => void }) {
  const counts = {
    total: SUBS.length,
    waiting: SUBS.filter((s) => s.status === "waiting").length,
    approved: SUBS.filter((s) => s.status === "approved").length,
    rejected: SUBS.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
        <div>
          <span className="text-[#2563EB] font-bold text-base tracking-tight">SIPINJAM</span>
          <p className="text-[10px] text-[#64748B]">Panel Petugas</p>
        </div>
        <div className="w-9 h-9 bg-[#EFF6FF] rounded-full flex items-center justify-center">
          <User size={16} className="text-[#2563EB]" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Selamat datang, Petugas Sarana</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Pengajuan", value: counts.total, cls: "text-[#2563EB]", bg: "border-[#BFDBFE] bg-[#EFF6FF]" },
            { label: "Menunggu", value: counts.waiting, cls: "text-amber-600", bg: "border-amber-200 bg-amber-50" },
            { label: "Disetujui", value: counts.approved, cls: "text-emerald-600", bg: "border-emerald-200 bg-emerald-50" },
            { label: "Ditolak", value: counts.rejected, cls: "text-[#DC2626]", bg: "border-red-200 bg-red-50" },
          ].map(({ label, value, cls, bg }) => (
            <div key={label} className={`rounded-xl border p-3 ${bg}`}>
              <p className="text-[11px] text-[#64748B] leading-snug mb-1">{label}</p>
              <p className={`text-2xl font-bold ${cls}`}>{value}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#0F172A]">Pengajuan Terbaru</h2>
            <button onClick={() => nav("AM02")} className="text-xs text-[#2563EB] font-semibold">Lihat Semua →</button>
          </div>
          <div className="space-y-2">
            {SUBS.slice(0, 3).map((s) => (
              <button key={s.id} onClick={() => nav("AM03")}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl p-3 text-left hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#2563EB]">{s.id}</span>
                  <StatusBadge status={s.status} />
                </div>
                <p className="text-sm font-semibold text-[#0F172A]">{s.name}</p>
                <p className="text-xs text-[#64748B]">{s.room} · {s.date}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="bg-white border-t border-[#E2E8F0] flex px-2 py-1.5 shrink-0">
        <button className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <LayoutDashboard size={20} className="text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">Dashboard</span>
        </button>
        <button onClick={() => nav("AM02")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <FileText size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Pengajuan</span>
        </button>
      </nav>
    </div>
  );
}

function AM02({ nav }: { nav: (s: string) => void }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | StatusKey>("all");
  const filtered = SUBS.filter((s) => {
    const match = s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase());
    return match && (filter === "all" || s.status === filter);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("AM01")} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <h1 className="font-semibold text-[#0F172A]">Daftar Pengajuan</h1>
      </div>

      <div className="px-4 pt-3 pb-2 shrink-0 space-y-2.5">
        <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-3 py-2 bg-white focus-within:border-[#2563EB] transition-colors">
          <Search size={14} className="text-[#94A3B8] shrink-0" />
          <input type="text" placeholder="Cari nama atau ID..." value={q} onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {(["all", "waiting", "approved", "rejected"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                filter === f ? "bg-[#2563EB] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B]"
              }`}>
              {f === "all" ? "Semua" : STATUS_CFG[f].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {filtered.map((s) => (
          <button key={s.id} onClick={() => nav("AM03")}
            className="w-full bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-left hover:border-[#BFDBFE] transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-[#2563EB]">{s.id}</span>
              <StatusBadge status={s.status} />
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">{s.name}</p>
            <p className="text-xs text-[#64748B] mt-0.5">{s.room}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1"><Calendar size={11} /> {s.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {s.time}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-[#64748B] pt-8">Tidak ada pengajuan yang sesuai.</p>
        )}
      </div>

      <nav className="bg-white border-t border-[#E2E8F0] flex px-2 py-1.5 shrink-0">
        <button onClick={() => nav("AM01")} className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <LayoutDashboard size={20} className="text-[#94A3B8]" />
          <span className="text-[10px] font-medium text-[#94A3B8]">Dashboard</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-0.5 py-1">
          <FileText size={20} className="text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">Pengajuan</span>
        </button>
      </nav>
    </div>
  );
}

function AM03({ nav, adminStatus, setAdminStatus }: {
  nav: (s: string) => void;
  adminStatus: StatusKey;
  setAdminStatus: (s: StatusKey) => void;
}) {
  const sub = SUBS[0];
  const [showReject, setShowReject] = useState(false);
  const [rejectInput, setRejectInput] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    if (!rejectInput.trim()) return;
    setRejectReason(rejectInput.trim());
    setAdminStatus("rejected");
    setShowReject(false);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
        <button onClick={() => nav("AM02")} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-[#0F172A]">Detail Pengajuan</h1>
          <p className="text-[10px] text-[#64748B] font-mono">{sub.id}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div className="bg-slate-100 rounded-xl p-2.5">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">Demo State</p>
          <div className="flex bg-white rounded-lg p-0.5 gap-0.5">
            {(["waiting", "approved", "rejected"] as StatusKey[]).map((s) => (
              <button key={s} onClick={() => setAdminStatus(s)}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-colors ${
                  adminStatus === s ? "bg-[#2563EB] text-white" : "text-slate-500"
                }`}>
                {s === "waiting" ? "Menunggu" : s === "approved" ? "Setuju" : "Tolak"}
              </button>
            ))}
          </div>
        </div>

        {adminStatus === "approved" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <Check size={10} className="text-white" />
            </div>
            <p className="text-xs font-bold text-emerald-700">Pengajuan telah disetujui</p>
          </div>
        )}
        {adminStatus === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-[#DC2626] rounded-full flex items-center justify-center shrink-0">
                <X size={10} className="text-white" />
              </div>
              <p className="text-xs font-bold text-[#DC2626]">Pengajuan ditolak</p>
            </div>
            {rejectReason && <p className="text-xs text-red-600 ml-7">{rejectReason}</p>}
          </div>
        )}

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Status</span>
            <StatusBadge status={adminStatus} />
          </div>
          {[
            { label: "Pemohon", value: sub.name },
            { label: "Ruang", value: sub.room },
            { label: "Tanggal", value: sub.date },
            { label: "Waktu", value: sub.time },
            { label: "Kapasitas", value: sub.capacity },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wide">{label}</span>
              <span className="text-sm font-semibold text-[#0F172A]">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
          <p className="text-[11px] text-[#94A3B8] uppercase tracking-wide mb-2">Tujuan Kegiatan</p>
          <p className="text-sm text-[#0F172A] leading-relaxed">{sub.purpose}</p>
        </div>

        {adminStatus === "waiting" && (
          <div className="space-y-2 pb-2">
            <button onClick={() => setAdminStatus("approved")}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
              Setujui Pengajuan
            </button>
            <button onClick={() => { setRejectInput(""); setShowReject(true); }}
              className="w-full border border-[#DC2626] text-[#DC2626] py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">
              Tolak Pengajuan
            </button>
          </div>
        )}
      </div>

      {/* Reject overlay inside phone */}
      {showReject && (
        <div className="absolute inset-0 bg-white flex flex-col z-10">
          <div className="bg-white px-4 py-3.5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
            <button onClick={() => setShowReject(false)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
              <ArrowLeft size={18} className="text-[#0F172A]" />
            </button>
            <h1 className="font-semibold text-[#0F172A]">Tolak Pengajuan</h1>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 space-y-2">
              {[{ label: "No. Pengajuan", value: sub.id }, { label: "Pemohon", value: sub.name }, { label: "Ruang", value: sub.room }].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{label}</span>
                  <span className="text-sm font-semibold text-[#0F172A]">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                Alasan Penolakan <span className="text-[#DC2626]">*</span>
              </label>
              <textarea value={rejectInput} onChange={(e) => setRejectInput(e.target.value)}
                placeholder="Masukkan alasan penolakan..." rows={5}
                className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0F172A] outline-none resize-none placeholder-slate-300 focus:border-[#2563EB] transition-colors" />
            </div>
          </div>
          <div className="px-5 py-4 space-y-2 bg-white border-t border-[#E2E8F0] shrink-0">
            <button onClick={handleReject} disabled={!rejectInput.trim()}
              className="w-full bg-[#DC2626] hover:bg-red-700 disabled:opacity-40 text-white py-3 rounded-xl text-sm font-bold transition-colors">
              Konfirmasi Penolakan
            </button>
            <button onClick={() => setShowReject(false)}
              className="w-full border border-[#E2E8F0] text-[#64748B] py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAdminPrototype() {
  const [screen, setScreen] = useState("AM01");
  const [adminStatus, setAdminStatus] = useState<StatusKey>("waiting");
  const screens = ["AM01", "AM02", "AM03"];

  const navTo = (s: string) => {
    setScreen(s);
    if (s !== "AM03") setAdminStatus("waiting");
  };

  return (
    <div className="flex flex-col items-center py-8 min-h-[calc(100vh-56px)] bg-slate-200 overflow-x-auto">
      <div className="flex items-center gap-1.5 mb-6">
        {screens.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <button onClick={() => navTo(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                screen === s ? "bg-[#2563EB] text-white" : "bg-white text-slate-500 hover:text-[#2563EB] border border-slate-200"
              }`}>{s}</button>
            {i < screens.length - 1 && <span className="text-slate-400 text-xs">→</span>}
          </div>
        ))}
      </div>
      <PhoneFrame>
        {screen === "AM01" && <AM01 nav={navTo} />}
        {screen === "AM02" && <AM02 nav={navTo} />}
        {screen === "AM03" && <AM03 nav={navTo} adminStatus={adminStatus} setAdminStatus={setAdminStatus} />}
      </PhoneFrame>
      <p className="mt-4 text-xs text-slate-400 text-center">Klik tombol atau navigasi di dalam layar untuk berpindah halaman</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN DESKTOP  (D01 – D04)
══════════════════════════════════════════════════════════════ */

function AdminSidebar({ screen, setScreen, onLogout }: { screen: string; setScreen: (s: string) => void; onLogout?: () => void }) {
  const isActive = (key: string) => screen === key || (key === "D02" && screen === "D03");
  const items = [
    { key: "D01", label: "Dashboard", Icon: LayoutDashboard },
    { key: "D02", label: "Pengajuan", Icon: FileText },
    { key: "peminjaman-barang", label: "Pinjam Barang (API)", Icon: Package },
  ];
  return (
    <aside className="w-60 bg-white border-r border-[#E2E8F0] flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-[#E2E8F0]">
        <p className="text-[#2563EB] font-bold text-xl tracking-tight">SIPINJAM</p>
        <p className="text-xs text-[#64748B] mt-0.5">Sistem Peminjaman Ruang</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setScreen(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors ${
              isActive(key) ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            }`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-[#E2E8F0]">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-red-50 hover:text-[#DC2626] transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

function D01({ setScreen }: { setScreen: (s: string) => void }) {
  const counts = {
    total: SUBS.length,
    waiting: SUBS.filter((s) => s.status === "waiting").length,
    approved: SUBS.filter((s) => s.status === "approved").length,
    rejected: SUBS.filter((s) => s.status === "rejected").length,
  };
  const stats = [
    { label: "Pengajuan Masuk", value: counts.total, cls: "text-[#2563EB]", bg: "border-[#BFDBFE] bg-[#EFF6FF]" },
    { label: "Menunggu Verifikasi", value: counts.waiting, cls: "text-amber-600", bg: "border-amber-200 bg-amber-50" },
    { label: "Disetujui", value: counts.approved, cls: "text-emerald-600", bg: "border-emerald-200 bg-emerald-50" },
    { label: "Ditolak", value: counts.rejected, cls: "text-[#DC2626]", bg: "border-red-200 bg-red-50" },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
        <p className="text-sm text-[#64748B] mt-1">Selamat datang, Petugas Sarana &amp; Prasarana</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, cls, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
            <p className="text-sm text-[#64748B] mb-2 leading-snug">{label}</p>
            <p className={`text-3xl font-bold ${cls}`}>{value}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#0F172A]">Pengajuan Terbaru</h2>
          <button onClick={() => setScreen("D02")} className="text-sm text-[#2563EB] font-semibold hover:underline">
            Lihat Semua →
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                {["ID Pengajuan", "Pemohon", "Ruang", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-[#64748B] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {SUBS.slice(0, 3).map((s) => (
                <tr key={s.id} className="hover:bg-[#F8FAFC] cursor-pointer transition-colors" onClick={() => setScreen("D03")}>
                  <td className="px-5 py-3.5 font-mono text-sm font-bold text-[#0F172A]">{s.id}</td>
                  <td className="px-5 py-3.5 text-sm text-[#0F172A]">{s.name}</td>
                  <td className="px-5 py-3.5 text-sm text-[#64748B]">{s.room}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function D02({ setScreen }: { setScreen: (s: string) => void }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | StatusKey>("all");
  const filtered = SUBS.filter((s) => {
    const match = s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.id.toLowerCase().includes(q.toLowerCase()) ||
      s.room.toLowerCase().includes(q.toLowerCase());
    return match && (filter === "all" || s.status === filter);
  });
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Daftar Pengajuan</h1>
        <p className="text-sm text-[#64748B] mt-1">{SUBS.length} total pengajuan</p>
      </div>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-xl px-4 py-2.5 bg-white flex-1 min-w-48 focus-within:border-[#2563EB] transition-colors">
          <Search size={15} className="text-[#94A3B8] shrink-0" />
          <input type="text" placeholder="Cari ID, nama, atau ruang..." value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "waiting", "approved", "rejected"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filter === f ? "bg-[#2563EB] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}>
              {f === "all" ? "Semua" : STATUS_CFG[f].label}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              {["ID Pengajuan", "Pemohon", "Ruang", "Tanggal", "Status", "Aksi"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold text-[#64748B] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="px-5 py-3.5 font-mono text-sm font-bold text-[#0F172A]">{s.id}</td>
                <td className="px-5 py-3.5 text-sm text-[#0F172A]">{s.name}</td>
                <td className="px-5 py-3.5 text-sm text-[#64748B]">{s.room}</td>
                <td className="px-5 py-3.5 text-sm text-[#64748B]">{s.date}</td>
                <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                <td className="px-5 py-3.5">
                  <button onClick={() => setScreen("D03")}
                    className="flex items-center gap-1.5 text-sm text-[#2563EB] font-semibold hover:underline">
                    <Eye size={14} /> Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-[#64748B]">Tidak ada pengajuan yang sesuai filter.</p>
        )}
      </div>
    </div>
  );
}

function D03({ setScreen, status, setStatus, conflict, setConflict, onReject, rejectReason }: {
  setScreen: (s: string) => void;
  status: StatusKey;
  setStatus: (s: StatusKey) => void;
  conflict: boolean;
  setConflict: (v: boolean) => void;
  onReject: () => void;
  rejectReason: string;
}) {
  const sub = SUBS[0];
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setScreen("D02")}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors">
          <ArrowLeft size={18} className="text-[#0F172A]" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Detail Pengajuan</h1>
          <p className="text-sm text-[#64748B] font-mono mt-0.5">{sub.id}</p>
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-3 mb-6 flex items-center gap-4 flex-wrap">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Demo — Status</p>
          <div className="flex bg-white rounded-lg p-0.5 gap-0.5">
            {(["waiting", "approved", "rejected"] as StatusKey[]).map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                  status === s ? "bg-[#2563EB] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}>
                {s === "waiting" ? "Menunggu" : s === "approved" ? "Disetujui" : "Ditolak"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-semibold text-slate-500">Konflik Jadwal</span>
          <button onClick={() => setConflict(!conflict)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              conflict ? "bg-amber-500 text-white" : "bg-white border border-slate-200 text-slate-500"
            }`}>
            {conflict ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {conflict && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 flex items-start gap-3 mb-6">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-700">Perhatian: Kemungkinan Konflik Jadwal</p>
            <p className="text-sm text-amber-600 mt-0.5">Terdapat kemungkinan konflik jadwal pada waktu yang dipilih.</p>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 flex items-start gap-3 mb-6">
          <div className="w-6 h-6 bg-[#DC2626] rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <X size={12} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#DC2626]">Pengajuan Ditolak</p>
            {rejectReason && (
              <p className="text-sm text-red-600 mt-1"><span className="font-semibold">Alasan:</span> {rejectReason}</p>
            )}
          </div>
        </div>
      )}
      {status === "approved" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3.5 flex items-start gap-3 mb-6">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <Check size={12} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-700">Pengajuan Disetujui</p>
            <p className="text-sm text-emerald-600 mt-0.5">Pemohon telah diberitahu mengenai persetujuan ini.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-5">Informasi Pengajuan</h2>
          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            {[
              { label: "No. Pengajuan", value: sub.id, mono: true },
              { label: "Status", value: null },
              { label: "Pemohon", value: sub.name },
              { label: "Kapasitas", value: sub.capacity },
              { label: "Ruang", value: sub.room },
              { label: "Waktu", value: sub.time },
              { label: "Tanggal", value: "20 September 2026" },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <p className="text-[11px] text-[#94A3B8] uppercase tracking-wide mb-1">{label}</p>
                {value === null
                  ? <StatusBadge status={status} />
                  : <p className={`text-sm font-semibold text-[#0F172A] ${mono ? "font-mono" : ""}`}>{value}</p>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Tujuan Kegiatan</h2>
            <p className="text-sm text-[#0F172A] leading-relaxed">{sub.purpose}</p>
          </div>
          {status === "waiting" && (
            <div className="space-y-2">
              <button onClick={() => setStatus("approved")}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                Setujui
              </button>
              <button onClick={onReject}
                className="w-full border border-[#DC2626] text-[#DC2626] py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">
                Tolak
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function D04Modal({ input, setInput, onClose, onConfirm }: {
  input: string;
  setInput: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const sub = SUBS[0];
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="font-bold text-[#0F172A]">Tolak Pengajuan</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors">
            <X size={18} className="text-[#64748B]" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2">
            {[{ label: "No. Pengajuan", value: sub.id }, { label: "Pemohon", value: sub.name }, { label: "Ruang", value: sub.room }].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-[#64748B]">{label}</span>
                <span className="text-sm font-semibold text-[#0F172A]">{value}</span>
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm font-bold text-[#0F172A] block mb-2">
              Alasan Penolakan <span className="text-[#DC2626]">*</span>
            </label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan alasan penolakan..." rows={4}
              className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] outline-none resize-none placeholder-slate-300 focus:border-[#2563EB] transition-colors" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-[#E2E8F0]">
          <button onClick={onClose}
            className="flex-1 border border-[#E2E8F0] text-[#64748B] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F8FAFC] transition-colors">
            Batal
          </button>
          <button onClick={onConfirm} disabled={!input.trim()}
            className="flex-1 bg-[#DC2626] hover:bg-red-700 disabled:opacity-40 text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
            Tolak Pengajuan
          </button>
        </div>
      </div>
    </div>
  );
}

function DesktopAdminPrototype({ onLogout }: { onLogout?: () => void }) {
  const [screen, setScreen] = useState("D01");
  const [d03Status, setD03Status] = useState<StatusKey>("waiting");
  const [conflict, setConflict] = useState(false);
  const [showD04, setShowD04] = useState(false);
  const [rejectInput, setRejectInput] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const navTo = (s: string) => {
    setScreen(s);
    if (s !== "D03") { setD03Status("waiting"); setConflict(false); setRejectReason(""); }
  };
  const handleConfirmReject = () => {
    if (!rejectInput.trim()) return;
    setRejectReason(rejectInput.trim());
    setD03Status("rejected");
    setShowD04(false);
  };

  return (
    <div className="flex" style={{ height: "calc(100vh - 56px)" }}>
      <AdminSidebar screen={screen} setScreen={navTo} onLogout={onLogout} />
      <div className="flex-1 overflow-hidden flex flex-col bg-[#F8FAFC]">
        {screen === "D01" && <D01 setScreen={navTo} />}
        {screen === "D02" && <D02 setScreen={navTo} />}
        {screen === "peminjaman-barang" && (
          <div className="flex-1 overflow-y-auto">
            <PeminjamanBarang />
          </div>
        )}
        {screen === "D03" && (
          <D03
            setScreen={navTo} status={d03Status} setStatus={setD03Status}
            conflict={conflict} setConflict={setConflict}
            onReject={() => { setRejectInput(""); setShowD04(true); }}
            rejectReason={rejectReason}
          />
        )}
      </div>
      {showD04 && (
        <D04Modal input={rejectInput} setInput={setRejectInput}
          onClose={() => setShowD04(false)} onConfirm={handleConfirmReject} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════ */

export default function App() {
  const [appState, setAppState] = useState<AppState>("login");
  const [role, setRole] = useState<Role>("user");
  const [viewMode, setViewMode] = useState<ViewMode>("mobile");

  const handleLogin = () => setAppState("main");
  const handleLogout = () => {
    setAppState("login");
    setRole("user");
    setViewMode("mobile");
  };

  if (appState === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onForgot={() => setAppState("forgot")}
        onRegister={() => setAppState("register")}
      />
    );
  }

  if (appState === "forgot") {
    return <ForgotPasswordPage onBack={() => setAppState("login")} />;
  }

  if (appState === "register") {
    return <RegisterPage onBack={() => setAppState("login")} onRegister={handleLogin} />;
  }

  return (
    <motion.div
      className="min-h-screen"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between" style={{ height: 56 }}>
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#2563EB] text-lg">SIPINJAM</span>
          <span className="text-[#E2E8F0] select-none">|</span>
          <span className="text-xs text-[#64748B]">Prototype Interaktif · Pertemuan 3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[#F1F5F9] rounded-xl p-1 gap-0.5">
            {(["user", "admin"] as Role[]).map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  role === r ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
                }`}>
                {r === "user" ? "Pengguna" : "Admin"}
              </button>
            ))}
          </div>
          <div className="flex bg-[#F1F5F9] rounded-xl p-1 gap-0.5">
            {(["mobile", "desktop"] as ViewMode[]).map((v) => (
              <button key={v} onClick={() => setViewMode(v)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  viewMode === v ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
                }`}>
                {v === "mobile" ? "Mobile" : "Desktop"}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-[#E2E8F0]" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-red-50 hover:text-[#DC2626] transition-colors"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {role === "user" && viewMode === "mobile" && <MobileUserPrototype />}
      {role === "user" && viewMode === "desktop" && <DesktopUserPrototype onLogout={handleLogout} />}
      {role === "admin" && viewMode === "mobile" && <MobileAdminPrototype />}
      {role === "admin" && viewMode === "desktop" && <DesktopAdminPrototype onLogout={handleLogout} />}
    </motion.div>
  );
}
