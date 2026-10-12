import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Calendar,
  Check,
  X,
  Edit3,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  IdCard,
} from "lucide-react";
import { getProfile, updateProfile, UserProfile } from "../../services/api";

interface ProfileViewProps {
  onBack?: () => void;
  isMobile?: boolean;
  onProfileUpdated?: (user: UserProfile) => void;
}

export function ProfileView({ onBack, isMobile = false, onProfileUpdated }: ProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nim: "",
    prodi: "",
    fakultas: "",
    no_telp: "",
  });

  // Feedback states
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Fetch profile from backend
  const fetchProfile = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await getProfile();
      if (res.success && res.data) {
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          nim: res.data.nim || "",
          prodi: res.data.prodi || "",
          fakultas: res.data.fakultas || "",
          no_telp: res.data.no_telp || "",
        });
        if (onProfileUpdated) {
          onProfileUpdated(res.data);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal memuat data profil dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleStartEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        nim: profile.nim || "",
        prodi: profile.prodi || "",
        fakultas: profile.fakultas || "",
        no_telp: profile.no_telp || "",
      });
    }
    setFieldErrors({});
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        nim: profile.nim || "",
        prodi: profile.prodi || "",
        fakultas: profile.fakultas || "",
        no_telp: profile.no_telp || "",
      });
    }
    setFieldErrors({});
    setErrorMsg(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setFieldErrors({});

    try {
      const res = await updateProfile(formData);
      if (res.success && res.data) {
        setProfile(res.data);
        setSuccessMsg(res.message || "Profil berhasil diperbarui!");
        setIsEditing(false);
        if (onProfileUpdated) {
          onProfileUpdated(res.data);
        }
      }
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
        setErrorMsg("Terdapat kesalahan pada input formulir. Silakan periksa kembali.");
      } else {
        setErrorMsg(err.message || "Gagal menyimpan perubahan profil.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Helper avatar initials
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`flex-1 overflow-y-auto ${isMobile ? "p-4 space-y-4" : "p-8 space-y-6"}`}>
      {/* ── Breadcrumb & Navigation Header ────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors"
              title="Kembali ke Beranda"
            >
              <ArrowLeft size={18} className="text-[#0F172A]" />
            </button>
          )}
          <div>
            <p className="text-xs text-[#64748B]">
              <span
                className="hover:text-[#2563EB] cursor-pointer"
                onClick={onBack}
              >
                Beranda
              </span>
              {" / Profil"}
            </p>
            <h1 className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-[#0F172A] tracking-tight`}>
              Profil Saya
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Kelola informasi akun dan data pribadi Anda.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={handleStartEdit}
              disabled={loading}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:opacity-60 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
            >
              <Edit3 size={15} />
              Edit Profil
            </button>
          )}
          <button
            onClick={fetchProfile}
            disabled={loading}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
            title="Muat Ulang Data"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#2563EB]" : ""} />
          </button>
        </div>
      </div>

      {/* ── Alert Success / Error ─────────────────────────── */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm text-emerald-800 font-medium">{successMsg}</p>
          </div>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-emerald-600 hover:text-emerald-800"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-[#DC2626] shrink-0" />
            <div>
              <p className="text-xs sm:text-sm text-red-800 font-medium">{errorMsg}</p>
              {Object.keys(fieldErrors).length > 0 && (
                <ul className="list-disc list-inside text-xs text-red-700 mt-1 space-y-0.5">
                  {Object.entries(fieldErrors).map(([field, errs]) => (
                    <li key={field}>{errs.join(", ")}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-[#DC2626] hover:text-red-800"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ── Main Content Layout ───────────────────────────── */}
      {loading && !profile ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-sm">
          <div className="w-10 h-10 border-3 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#0F172A]">Memuat data profil pengguna...</p>
          <p className="text-xs text-[#64748B] mt-1">Mengambil data dari backend Laravel</p>
        </div>
      ) : (
        <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 lg:grid-cols-3 gap-6"}`}>
          {/* ── B. Kartu Informasi Pengguna (Identity Card) ─── */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col items-center text-center">
            {/* Circular Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-bold text-2xl shadow-md border-4 border-white ring-2 ring-blue-100">
                {getInitials(profile?.name)}
              </div>
              <div
                className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"
                title="Akun Terverifikasi"
              >
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>

            {/* Nama & Info Singkat */}
            <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
              {profile?.name || "Nama Pengguna"}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">
              {profile?.nim ? `NIM: ${profile.nim}` : "NIM belum diisi"}
            </p>

            {/* Prodi Badge */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-blue-200">
                <GraduationCap size={13} />
                {profile?.prodi || "Program Studi"}
              </span>
            </div>

            {/* Status Akun */}
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {profile?.status_akun || "Mahasiswa Aktif"}
              </span>
            </div>

            <div className="w-full border-t border-[#E2E8F0] my-5" />

            {/* Metadata Ringkas */}
            <div className="w-full text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Peran Sistem</span>
                <span className="font-semibold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded-md">
                  Mahasiswa
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Unit Akademik</span>
                <span className="font-semibold text-[#0F172A]">
                  {profile?.fakultas || "Fakultas Teknik"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Status Autentikasi</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check size={12} /> Terhubung
                </span>
              </div>
            </div>
          </div>

          {/* ── C & D. Informasi Pribadi & Form Edit ─────────── */}
          <div className={`${isMobile ? "col-span-1" : "lg:col-span-2"} bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm`}>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  {isEditing ? "Formulir Edit Profil" : "Informasi Pribadi"}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {isEditing
                    ? "Perbarui rincian data Anda lalu simpan perubahan ke database."
                    : "Detail informasi akun resmi terdaftar di SIPINJAM."}
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={handleStartEdit}
                  className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 hover:underline"
                >
                  <Edit3 size={13} /> Edit
                </button>
              )}
            </div>

            {/* ── View Mode ─────────────────────────────────── */}
            {!isEditing ? (
              <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-5"}`}>
                {/* Nama Lengkap */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                    <User size={14} className="text-[#2563EB]" />
                    <span>Nama Lengkap</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {profile?.name || <span className="text-slate-400 italic">Belum diisi</span>}
                  </p>
                </div>

                {/* NIM */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                    <IdCard size={14} className="text-[#2563EB]" />
                    <span>NIM / Nomor Identitas</span>
                  </div>
                  <p className="text-sm font-semibold font-mono text-[#0F172A]">
                    {profile?.nim || <span className="text-slate-400 italic">Belum diisi</span>}
                  </p>
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                    <Mail size={14} className="text-[#2563EB]" />
                    <span>Alamat Email</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {profile?.email || <span className="text-slate-400 italic">Belum diisi</span>}
                  </p>
                </div>

                {/* Program Studi */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                    <GraduationCap size={14} className="text-[#2563EB]" />
                    <span>Program Studi</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {profile?.prodi || <span className="text-slate-400 italic">Belum diisi</span>}
                  </p>
                </div>

                {/* Fakultas */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                    <Building2 size={14} className="text-[#2563EB]" />
                    <span>Fakultas / Unit Akademik</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {profile?.fakultas || <span className="text-slate-400 italic">Belum diisi</span>}
                  </p>
                </div>

                {/* Nomor Telepon */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1 font-medium">
                    <Phone size={14} className="text-[#2563EB]" />
                    <span>Nomor Telepon</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {profile?.no_telp || <span className="text-slate-400 italic">Belum diisi</span>}
                  </p>
                </div>
              </div>
            ) : (
              /* ── D. Form Edit Profil ──────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-4"}`}>
                  {/* Field: Nama Lengkap */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                      Nama Lengkap <span className="text-[#DC2626]">*</span>
                    </label>
                    <div
                      className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-colors ${
                        fieldErrors.name
                          ? "border-[#DC2626] bg-red-50/40"
                          : "border-[#E2E8F0] focus-within:border-[#2563EB]"
                      }`}
                    >
                      <User size={15} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                        required
                      />
                    </div>
                    {fieldErrors.name && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.name[0]}</p>
                    )}
                  </div>

                  {/* Field: NIM */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                      NIM / Nomor Identitas
                    </label>
                    <div
                      className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-colors ${
                        fieldErrors.nim
                          ? "border-[#DC2626] bg-red-50/40"
                          : "border-[#E2E8F0] focus-within:border-[#2563EB]"
                      }`}
                    >
                      <IdCard size={15} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="text"
                        value={formData.nim}
                        onChange={(e) => handleFieldChange("nim", e.target.value)}
                        placeholder="Contoh: 24051130047"
                        className="flex-1 bg-transparent text-sm font-mono text-[#0F172A] outline-none placeholder-slate-300"
                      />
                    </div>
                    {fieldErrors.nim && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.nim[0]}</p>
                    )}
                  </div>

                  {/* Field: Email */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                      Alamat Email <span className="text-[#DC2626]">*</span>
                    </label>
                    <div
                      className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-colors ${
                        fieldErrors.email
                          ? "border-[#DC2626] bg-red-50/40"
                          : "border-[#E2E8F0] focus-within:border-[#2563EB]"
                      }`}
                    >
                      <Mail size={15} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        placeholder="nama@student.ac.id"
                        className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                        required
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.email[0]}</p>
                    )}
                  </div>

                  {/* Field: Program Studi */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                      Program Studi
                    </label>
                    <div
                      className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-colors ${
                        fieldErrors.prodi
                          ? "border-[#DC2626] bg-red-50/40"
                          : "border-[#E2E8F0] focus-within:border-[#2563EB]"
                      }`}
                    >
                      <GraduationCap size={15} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="text"
                        value={formData.prodi}
                        onChange={(e) => handleFieldChange("prodi", e.target.value)}
                        placeholder="Contoh: Teknologi Informasi"
                        className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                      />
                    </div>
                    {fieldErrors.prodi && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.prodi[0]}</p>
                    )}
                  </div>

                  {/* Field: Fakultas */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                      Fakultas / Unit Akademik
                    </label>
                    <div
                      className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-colors ${
                        fieldErrors.fakultas
                          ? "border-[#DC2626] bg-red-50/40"
                          : "border-[#E2E8F0] focus-within:border-[#2563EB]"
                      }`}
                    >
                      <Building2 size={15} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="text"
                        value={formData.fakultas}
                        onChange={(e) => handleFieldChange("fakultas", e.target.value)}
                        placeholder="Contoh: Fakultas Teknik"
                        className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                      />
                    </div>
                    {fieldErrors.fakultas && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.fakultas[0]}</p>
                    )}
                  </div>

                  {/* Field: Nomor Telepon */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
                      Nomor Telepon / WhatsApp
                    </label>
                    <div
                      className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-colors ${
                        fieldErrors.no_telp
                          ? "border-[#DC2626] bg-red-50/40"
                          : "border-[#E2E8F0] focus-within:border-[#2563EB]"
                      }`}
                    >
                      <Phone size={15} className="text-[#94A3B8] shrink-0" />
                      <input
                        type="tel"
                        value={formData.no_telp}
                        onChange={(e) => handleFieldChange("no_telp", e.target.value)}
                        placeholder="Contoh: 081234567890"
                        className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder-slate-300"
                      />
                    </div>
                    {fieldErrors.no_telp && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{fieldErrors.no_telp[0]}</p>
                    )}
                  </div>
                </div>

                {/* Form Buttons: Simpan & Batal */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={submitting}
                    className="border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:opacity-70 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Simpan Perubahan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
