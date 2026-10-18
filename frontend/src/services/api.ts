export const API_BASE_URL = "/api";

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

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type UserRole = "user" | "admin";

async function getCsrfToken(): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/csrf-token`, {
    headers: { Accept: "application/json" },
    credentials: "same-origin",
  });

  if (!res.ok) {
    throw new ApiError(`Gagal menyiapkan sesi keamanan: HTTP ${res.status}`, res.status);
  }

  const result: { csrfToken: string } = await res.json();

  return result.csrfToken;
}

function createApiError(
  result: { message?: string; errors?: Record<string, string[]> },
  status: number,
  fallback: string,
): ApiError {
  const message = result.errors
    ? Object.values(result.errors).flat().join(", ")
    : result.message || fallback;

  return new ApiError(message, status, result.errors);
}

export async function login(
  email: string,
  password: string,
  remember: boolean,
  role: UserRole,
): Promise<void> {
  const token = await getCsrfToken();
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-TOKEN": token,
    },
    credentials: "same-origin",
    body: JSON.stringify({ email, password, remember, role }),
  });
  const result: { success: boolean; message?: string; errors?: Record<string, string[]> } = await res.json();

  if (!res.ok) {
    throw createApiError(result, res.status, "Gagal masuk ke SIPINJAM.");
  }
}

export async function logout(): Promise<void> {
  const token = await getCsrfToken();
  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-CSRF-TOKEN": token,
    },
    credentials: "same-origin",
  });
  const result: { message?: string } = await res.json();

  if (!res.ok) {
    throw new ApiError(result.message || `Gagal keluar: HTTP ${res.status}`, res.status);
  }
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
    credentials: "same-origin",
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
    credentials: "same-origin",
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

export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  nim?: string | null;
  prodi?: string | null;
  fakultas?: string | null;
  no_telp?: string | null;
  status_akun?: string;
  avatar?: string | null;
  roles?: UserRole[];
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileUpdatePayload {
  name: string;
  email: string;
  nim?: string;
  prodi?: string;
  fakultas?: string;
  no_telp?: string;
}

/**
 * 3. GET: Mengambil data profil pengguna dari backend
 */
export async function getProfile(): Promise<ApiResponse<UserProfile>> {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: "same-origin",
  });

  if (!res.ok) {
    throw new ApiError(
      res.status === 401
        ? "Sesi login tidak ditemukan atau telah berakhir."
        : `Gagal mengambil data profil: HTTP ${res.status}`,
      res.status,
    );
  }

  return await res.json();
}

/**
 * 4. PUT: Memperbarui data profil pengguna di backend
 */
export async function updateProfile(data: ProfileUpdatePayload): Promise<ApiResponse<UserProfile>> {
  const token = await getCsrfToken();
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-CSRF-TOKEN": token,
    },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw createApiError(result, res.status, "Gagal memperbarui profil.");
  }

  return result;
}
