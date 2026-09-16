# DOKUMENTASI TUGAS PRAKTIK APLIKASI WEB — PERTEMUAN 3

# SIPINJAM
### Sistem Peminjaman Ruang dan Peralatan Kampus

**Program Studi:** Informatika — Universitas Negeri Yogyakarta  
**Mata Kuliah:** Praktik Aplikasi Web (INF60295)  
**Pertemuan:** 3  
**Branch:** `risky-job3`

---

## 1. Deskripsi Proyek

SIPINJAM merupakan Sistem Peminjaman Ruang dan Peralatan Kampus yang dirancang untuk membantu mahasiswa dalam mencari ruang, mengajukan peminjaman secara online, dan melihat status pengajuan.

Sistem juga menyediakan rancangan untuk Petugas Sarana dan Prasarana dalam memeriksa pengajuan, melakukan verifikasi, menyetujui, atau menolak pengajuan.

Pada Pertemuan 3, hasil dari Pertemuan 2 dikembangkan menjadi rancangan:

- Information Architecture
- Sitemap
- User Flow
- Wireframe Desktop
- Wireframe Mobile
- Interactive Prototype
- Usability Walkthrough
- Design Decisions

---

## 2. Anggota Kelompok

| No | Nama | NIM | Kontribusi |
|---:|---|---:|---|
| 1 | Ivan Maulana Bahtiar | 24051130047 | Problem Statement, Product Vision, dan review Arsitektur Informasi |
| 2 | Yuki Ramadhan | 24051130053 | User Story, INVEST, dan review Traceability Matrix |
| 3 | Risky Aditya Pratama | 24051130057 | Scope Canvas, Sitemap, User Flow, Wireframe, Prototype, Usability Walkthrough, Design Decisions, Figma Blueprint, dan kompilasi dokumen |
| 4 | Arfa Novan Akbar | 24051130058 | Persona Canvas dan validasi skenario usability |

---

## 3. Scope Pertemuan 3

User Story yang digunakan sebagai Core Scope:

- **US-01** — Mencari Ruang
- **US-02** — Mengajukan Peminjaman
- **US-03** — Melihat Status Pengajuan
- **US-07** — Verifikasi Pengajuan
- **US-09** — Menolak Pengajuan

### Out of Scope

- **US-04** — Membatalkan pengajuan
- **US-05** — Melihat riwayat peminjaman
- **US-06** — Mengajukan peralatan bersamaan dengan ruang
- **US-08** — Melihat jadwal seluruh ruang dalam kalender
- **US-10** — Mengelola data ruang dan peralatan

---

## 4. Hasil Pengerjaan

Hasil pengerjaan Pertemuan 3 disimpan di folder `Pertemuan03/`.

| No | Dokumen | Keterangan |
|---:|---|---|
| 1 | `01-scope-canvas.pdf` | Scope dan batasan prototype |
| 2 | `02-sitemap.pdf` | Struktur halaman SIPINJAM |
| 3 | `03-user-flow-pengguna.pdf` | Alur mahasiswa |
| 4 | `04-user-flow-admin.pdf` | Alur petugas |
| 5 | `05-wireframe-desktop.pdf` | Wireframe desktop |
| 6 | `06-wireframe-mobile.pdf` | Wireframe mobile |
| 7 | `06-prototype.md` | Dokumentasi alur prototype |
| 8 | `07-usability-walkthrough.pdf` | Walkthrough dan temuan usability |
| 9 | `08-keputusan-desain.md` | Keputusan desain |
| 10 | `traceability-matrix.md` | Hubungan User Story, Acceptance Criteria, dan rancangan |
| 11 | `FIGMA-BLUEPRINT.md` | Blueprint rancangan Figma |

File `.md` pada folder digunakan sebagai dokumentasi pendukung dari masing-masing hasil perancangan.

---

## 5. Figma Prototype

Prototype SIPINJAM dibuat menggunakan Figma dan mencakup rancangan mobile serta desktop.

### Link Figma

https://www.figma.com/make/0mvebSy0cTwKrHN96rxYC5/aplikasi-SIPINJAM?fullscreen=1&t=b43c8YE05xkDuhP3-1&code-node-id=0-9

Prototype mencakup:

- M01 — Beranda / Cari Ruang
- M02 — Detail Ruang
- M03 — Form Pengajuan
- M03-ERROR — Error State
- M04 — Status Pengajuan
- D01 — Dashboard
- D02 — Daftar Pengajuan
- D03 — Detail Pengajuan
- D03-ALERT — Conflict Alert
- D04 — Tolak Pengajuan
- Approved State
- Rejected State

---

## 6. Alur Prototype

### Mahasiswa

```text
M01 → M02 → M03 → M04
             ↓
         M03-ERROR
             ↓
            M03
```
### Petugas

```text
D01 → D02 → D03
             ├── Setujui → Approved
             │
             └── Tolak → D04 → Rejected


