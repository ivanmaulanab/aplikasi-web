# Lembar Kerja 4: User Flow Petugas Sarana & Prasarana
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Ikhtisar Alur Kerja Petugas

User Flow Petugas menggambarkan alur kerja harian **Pak Yusuf (Petugas Sarana & Prasarana)** dalam memverifikasi pengajuan peminjaman ruang yang masuk secara terpusat melalui komputer kerja desktop. Alur mencakup pengecekan antrean, pemeriksaan detail pemohon dan jadwal, penanganan otomatis terhadap bentrok jadwal pemakaian, serta pengambilan keputusan persetujuan (*approval*) atau penolakan dengan alasan objektif (*rejection with reason*).

---

## 2. Diagram Alur Kerja Petugas (Mermaid)

```mermaid
flowchart TD
    Start([Mulai: Pak Yusuf Login ke Portal Petugas]) --> Screen_D01[Layar D01: Dashboard Petugas]
    
    Screen_D01 --> Action_ClickMenu[Pak Yusuf Memilih Menu 'Daftar Pengajuan' / Kartu Antrean]
    Action_ClickMenu --> Screen_D02[Layar D02: Tabel Daftar Pengajuan]
    
    Screen_D02 --> Action_SelectApp[Pak Yusuf Memilih Baris Pengajuan 'Menunggu Verifikasi']
    Action_SelectApp --> Screen_D03[Layar D03: Detail & Verifikasi Pengajuan]
    
    Screen_D03 --> System_CheckConflict[Sistem: Menampilkan Data Pemohon & Menjalankan Pengecekan Bentrok Otomatis]
    System_CheckConflict --> Decision_Conflict{Apakah Terdeteksi Bentrok Jadwal Pemakaian Ruang?}
    
    %% Cabang Ada Bentrok / Jadwal Tumpang Tindih
    Decision_Conflict -- YA (Terdeteksi Bentrok) --> Alert_Conflict[Sistem: Tampilkan Banner Peringatan Merah 'JADWAL BENTROK dengan Kegiatan BEM pada Jam 10.00-12.00']
    Alert_Conflict --> Decision_ActionConflict{Keputusan Petugas}
    
    Decision_ActionConflict -->|Pilih Tolak| Action_ClickRejectConflict[Pak Yusuf Klik Tombol 'Tolak']
    Action_ClickRejectConflict --> Screen_D04_Conflict[Layar D04: Modal Tolak Pengajuan]
    Screen_D04_Conflict --> Action_InputReasonConflict[Pak Yusuf Mengetik Alasan: 'Ruang sudah terpakai kegiatan lain pada jam tersebut']
    Action_InputReasonConflict --> Action_ConfirmRejectConflict[Pak Yusuf Klik 'Konfirmasi Tolak']
    Action_ConfirmRejectConflict --> Screen_D03R[Layar D03: Status Berubah Menjadi 'Ditolak']
    Screen_D03R --> Notify_Student_Reject[Sistem: Mengubah Status Tiket & Mengirim Notifikasi Alasan ke Mahasiswa]
    Notify_Student_Reject --> Finish_Reject([Selesai: Pengajuan Bermasalah Selesai Ditangani])
    
    %% Cabang Tidak Ada Bentrok (Aman)
    Decision_Conflict -- TIDAK (Jadwal Aman) --> Badge_Safe[Sistem: Tampilkan Indikator Hijau 'Jadwal Tersedia & Bebas Bentrok']
    Badge_Safe --> Decision_ActionSafe{Keputusan Petugas}
    
    Decision_ActionSafe -->|Valid & Disetujui| Action_ClickApprove[Pak Yusuf Klik Tombol 'Setujui']
    Action_ClickApprove --> Process_Approve[Sistem: Mengubah Status Pengajuan Menjadi 'Disetujui' & Mengunci Slot Jadwal]
    Process_Approve --> Screen_D03A[Layar D03: Status Berubah Menjadi 'Disetujui']
    Screen_D03A --> Notify_Student_Approve[Sistem: Mengirim Notifikasi Persetujuan ke Portal Mahasiswa]
    Notify_Student_Approve --> Finish_Approve([Selesai: Pengajuan Resmi Terjadwal])

    Decision_ActionSafe -->|Data/Syarat Tidak Sesuai| Action_ClickRejectManual[Pak Yusuf Klik Tombol 'Tolak']
    Action_ClickRejectManual --> Screen_D04_Manual[Layar D04: Modal Tolak Pengajuan]
    Screen_D04_Manual --> Action_InputReasonManual[Pak Yusuf Mengisi Alasan Penolakan Administratif]
    Action_InputReasonManual --> Action_ConfirmRejectManual[Pak Yusuf Klik 'Konfirmasi Tolak']
    Action_ConfirmRejectManual --> Screen_D03R
```

---

## 3. Matriks Rincian Langkah Interaksi Petugas

| No | Tahapan Alur | Aktor | Aksi Pengguna | Respons Sistem | Decision Point | Layar Terkait | Acceptance Criteria Terkait |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **1** | Akses Dashboard | Petugas | Membuka portal admin pada komputer kerja | Menampilkan dashboard metrik: total pengajuan, antrean verifikasi, dan statistik bulanan | - | **D01** | `US-07` |
| **2** | Buka Antrean | Petugas | Mengklik menu "Daftar Pengajuan" atau kartu "Menunggu Verifikasi" | Memuat tabel seluruh permohonan peminjaman yang masuk secara berurutan (*FIFO*) | - | **D02** | `AC-10` |
| **3** | Buka Detail | Petugas | Mengklik tombol "Detail" pada permohonan mahasiswa (contoh: `#SPJ-0824`) | Memuat halaman periksa komprehensif: Nama Pemohon, Ormawa, Tanggal, Jam, Ruang, dan Keperluan | - | **D03** | `AC-10` |
| **4** | Deteksi Bentrok | Sistem | - | Memindai jadwal ruang pada database untuk tanggal dan rentang waktu yang diajukan | Jadwal bentrok dengan pengajuan lain yang sudah disetujui? | **D03** | `AC-11`, `AC-12` |
| **5a** | **Kondisi Bentrok Ditemukan** | Sistem | - | Menampilkan alert bar merah di bagian atas: *"PERINGATAN: Jadwal bentrok dengan pengajuan #SPJ-0790 (Seminar Nasional BEM, 09.00 - 13.00)"* | Petugas mengevaluasi | **D03** (State Alert) | `AC-12` |
| **6a** | Ambil Tindakan Penolakan | Petugas | Menekan tombol "Tolak" berwarna merah pada panel aksi | Membuka modal dialog *pop-up* formulir penolakan | - | **D04** | `US-09` |
| **7a** | Input Alasan Penolakan | Petugas | Mengisi textarea alasan: *"Jadwal bertabrakan dengan agenda resmi fakultas. Silakan ajukan di sesi sore atau gunakan Ruang C"* | Menampung teks alasan dan memvalidasi bahwa kolom alasan tidak boleh kosong | Alasan sudah diisi? | **D04** | `US-09` |
| **8a** | Konfirmasi Tolak | Petugas | Menekan tombol "Konfirmasi Tolak Pengajuan" | Mengubah status tiket menjadi "Ditolak", menyimpan rekaman log alasan, dan menutup modal | Selesai | **D03** (State Rejected) | `US-09`, `US-03` |
| **5b** | **Kondisi Aman / Tidak Bentrok** | Sistem | - | Menampilkan badge hijau *"Jadwal Terverifikasi: Tidak Ada Benturan Jadwal"* | Petugas mengevaluasi kelayakan acara | **D03** | `AC-11` |
| **6b** | Keputusan Persetujuan | Petugas | Menekan tombol "Setujui" berwarna hijau tua | Menampilkan dialog konfirmasi singkat *"Apakah Anda yakin menyetujui peminjaman ini?"* | Konfirmasi ya? | **D03** | `AC-11` |
| **7b** | Finalisasi Persetujuan | Petugas | Mengklik tombol konfirmasi "Ya, Setujui" | Mengubah status pengajuan menjadi "Disetujui", mengunci slot ruang pada database, dan memperbarui tampilan tabel | Selesai | **D03** (State Approved) | `AC-11`, `US-03` |

---

## 4. Evaluasi Bebas Jalan Buntu (*No Dead Ends Guarantee*)

- **Modal Dialog Pembatalan**: Pada modal penolakan (`D04`), jika petugas berubah pikiran atau salah klik, disediakan tombol *"Batal"* yang secara instan menutup modal tanpa mengubah status data apa pun.
- **Navigasi Balik yang Konsisten**: Pada halaman detail pengajuan (`D03`), terdapat tautan *Breadcrumb* `Dashboard > Daftar Pengajuan > #SPJ-0824` dan tombol *"Kembali ke Daftar"* di bagian atas, menjamin petugas tidak terjebak pada layar detail setelah memproses satu tiket.
- **Pembaruan Status Real-Time**: Setelah status disetujui atau ditolak, tombol aksi ("Setujui" & "Tolak") dinonaktifkan (*disabled*) dan digantikan oleh label status permanen beserta log waktu keputusan, mencegah terjadinya klik ganda (*double execution*).
