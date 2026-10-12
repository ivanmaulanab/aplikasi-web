import React, { useState, useEffect } from "react";
import { getPeminjamanList, createPeminjaman, PeminjamanItem } from "../../services/api";
import { RefreshCw, PlusCircle, CheckCircle2, AlertCircle, Package, Calendar, User, Clock } from "lucide-react";

export function PeminjamanBarang() {
  const [items, setItems] = useState<PeminjamanItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nama_peminjam: "",
    nama_barang: "",
    tanggal_pinjam: new Date().toISOString().split("T")[0],
    jumlah: 1,
    keperluan: "",
  });

  // Fetch data dari Laravel backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPeminjamanList();
      if (res.success) {
        setItems(res.data);
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Gagal terhubung ke backend Laravel. Pastikan 'php artisan serve' aktif di port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_peminjam || !formData.nama_barang || !formData.tanggal_pinjam) {
      setError("Mohon lengkapi Nama Peminjam, Nama Barang, dan Tanggal Pinjam.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await createPeminjaman(formData);
      if (res.success) {
        setSuccessMsg(`Peminjaman "${res.data.nama_barang}" berhasil diajukan!`);
        // Reset form
        setFormData({
          nama_peminjam: "",
          nama_barang: "",
          tanggal_pinjam: new Date().toISOString().split("T")[0],
          jumlah: 1,
          keperluan: "",
        });
        // Refresh data list
        fetchData();
      }
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan data peminjaman.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "disetujui":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ditolak":
        return "bg-red-50 text-red-700 border-red-200";
      case "dikembalikan":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header & Status Koneksi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Connected to Laravel API
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Peminjaman Barang & Peralatan Kampus
          </h1>
          <p className="text-sm text-slate-500">
            Endpoint: <code className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono text-xs">http://127.0.0.1:8000/api/peminjaman</code>
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin text-blue-600" : ""} />
          Refresh Data
        </button>
      </div>

      {/* Alert Notifikasi */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
          <div className="text-sm">
            <span className="font-bold">Koneksi / Validasi Bermasalah:</span> {error}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
          <span className="text-sm font-semibold">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom 1: Form Pengajuan (POST) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <PlusCircle size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Ajukan Peminjaman Baru</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Peminjam <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-blue-600 transition-colors">
                  <User size={16} className="text-slate-400 mr-2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rani Amelia"
                    value={formData.nama_peminjam}
                    onChange={(e) => setFormData({ ...formData, nama_peminjam: e.target.value })}
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Barang / Alat <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus-within:bg-white focus-within:border-blue-600 transition-colors">
                  <Package size={16} className="text-slate-400 mr-2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Proyektor Epson EB-X51"
                    value={formData.nama_barang}
                    onChange={(e) => setFormData({ ...formData, nama_barang: e.target.value })}
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Pinjam <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50 focus-within:bg-white focus-within:border-blue-600 transition-colors">
                    <Calendar size={15} className="text-slate-400 mr-1.5" />
                    <input
                      type="date"
                      required
                      value={formData.tanggal_pinjam}
                      onChange={(e) => setFormData({ ...formData, tanggal_pinjam: e.target.value })}
                      className="w-full bg-transparent text-xs text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.jumlah}
                    onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 1 })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keperluan / Keterangan</label>
                <textarea
                  rows={2}
                  placeholder="Kegiatan seminar / praktikum..."
                  value={formData.keperluan}
                  onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-sm shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Menyimpan ke Database...
                  </>
                ) : (
                  <>
                    <PlusCircle size={16} />
                    Kirim Pengajuan (POST)
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Kolom 2: Daftar Peminjaman (GET) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Daftar Peminjaman Barang</h2>
                <p className="text-xs text-slate-500">Data live diambil langsung dari database Laravel</p>
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                Total: {items.length} Data
              </span>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
                <RefreshCw size={28} className="animate-spin text-blue-600 mb-3" />
                <p className="text-sm">Memuat data dari backend Laravel...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 text-center">
                <Package size={40} className="text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-600">Belum ada data peminjaman</p>
                <p className="text-xs text-slate-400 mt-1">Silakan isi formulir di samping untuk mengajukan peminjaman baru.</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[520px] pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600">
                          #{item.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{item.nama_barang}</h3>
                        {item.jumlah && item.jumlah > 1 && (
                          <span className="text-[11px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.2 rounded">
                            {item.jumlah} Unit
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-slate-400" />
                          {item.nama_peminjam}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-slate-400" />
                          {typeof item.tanggal_pinjam === "string" ? item.tanggal_pinjam.split("T")[0] : item.tanggal_pinjam}
                        </span>
                      </div>
                      {item.keperluan && (
                        <p className="text-xs text-slate-500 italic mt-0.5">
                          "{item.keperluan}"
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-end justify-between sm:justify-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status || "Menunggu"}
                      </span>
                      {item.created_at && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(item.created_at).toLocaleDateString("id-ID")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
