/**
 * API Service untuk SIPINJAM - Integrasi Backend Laravel
 * URL Backend default: http://127.0.0.1:8000/api
 */

// URL Backend: otomatis menyesuaikan apakah dijalankan terpisah (port 5173) atau menyatu (port 8000)
export const API_BASE_URL =
  typeof window !== "undefined" && (window.location.port === "8000" || window.location.port === "")
    ? "/api"
    : "http://127.0.0.1:8000/api";

export interface PeminjamanItem {
  id?: number;
  nama_peminjam: string;
  nama_barang: string;
  tanggal_pinjam: string;
  status?: string;
  jumlah?: number;
  keperluan?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

/**
 * 1. GET: Mengambil daftar data peminjaman dari backend
 */
export async function getPeminjamanList(): Promise<ApiResponse<PeminjamanItem[]>> {
  const res = await fetch(`${API_BASE_URL}/peminjaman`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil data: HTTP ${res.status}`);
  }

  return await res.json();
}

/**
 * 2. POST: Menyimpan data peminjaman baru ke backend
 */
export async function createPeminjaman(data: {
  nama_peminjam: string;
  nama_barang: string;
  tanggal_pinjam: string;
  jumlah?: number;
  keperluan?: string;
  status?: string;
}): Promise<ApiResponse<PeminjamanItem>> {
  const res = await fetch(`${API_BASE_URL}/peminjaman`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    const errorMsg = result.errors 
      ? Object.values(result.errors).flat().join(", ") 
      : (result.message || "Gagal menyimpan data");
    throw new Error(errorMsg);
  }

  return result;
}
