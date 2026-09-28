# 05 - Keputusan Implementasi & Refleksi

## 1. Modularitas Blade Component
Komponen UI dipisahkan ke dalam folder `resources/views/components` untuk menjamin konsistensi visual di seluruh halaman tanpa duplikasi markup.

## 2. Strategi Responsif Mobile First
Layout daftar kartu memanfaatkan `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`. Di layar ponsel, kartu otomatis bertumpuk menjadi satu kolom tanpa menimbulkan scroll horizontal.

## 3. Feedback Pengguna
Formulir pengajuan dirancang dengan simulasi konfirmasi pengiriman (`#success-box`) untuk memberikan umpan balik langsung kepada mahasiswa setelah menekan tombol ajukan.