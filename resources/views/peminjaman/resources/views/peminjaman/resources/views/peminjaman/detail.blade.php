@extends('layouts.app')
@section('content')
<div class="container" style="max-width: 800px;">
  <a href="/peminjaman" style="display: inline-block; margin-bottom: var(--space-4); text-decoration: none; color: var(--color-primary); font-size: var(--font-size-sm); font-weight: 600;">&larr; Kembali ke Pencarian</a>
  <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6); box-shadow: var(--shadow-sm);">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-4); margin-bottom: var(--space-4);">
      <div>
        <h1 style="font-size: var(--font-size-xl); font-weight: 800;">Lab Pemrograman Web (L2-01)</h1>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Gedung Laboratorium Terpadu FT UNY - Lantai 2</p>
      </div>
      <x-status-badge status="approved" />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); background: var(--color-background); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-6); font-size: var(--font-size-sm);">
      <p>👥 Kapasitas: <strong>40 Orang</strong></p>
      <p>⚡ Daya Listrik: <strong>3500 VA</strong></p>
      <p>📽️ Fasilitas: <strong>Proyektor, AC, 40 PC</strong></p>
      <p>📋 Pengelola: <strong>Teknisi Jurusan JPTEI</strong></p>
    </div>
    <h2 style="font-size: var(--font-size-base); font-weight: 700; margin-bottom: var(--space-4);">Formulir Pengajuan Peminjaman</h2>
    <form onsubmit="event.preventDefault(); document.getElementById('success-box').style.display='block'; this.style.display='none';" style="display: flex; flex-direction: column; gap: var(--space-4);">
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: var(--space-1);">Nama Kegiatan / Organisasi *</label>
        <input type="text" placeholder="Contoh: Workshop Laravel HIMATO FT UNY" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-sm);" required>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: var(--space-1);">Tanggal Pelaksanaan *</label>
          <input type="date" value="2026-10-05" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-sm);" required>
        </div>
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: var(--space-1);">Estimasi Peserta *</label>
          <input type="number" placeholder="Maks. 40" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-sm);" required>
        </div>
      </div>
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: var(--space-1);">Kebutuhan Khusus</label>
        <textarea rows="3" placeholder="Instalasi tool atau kebutuhan proyektor..." style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-sm);"></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: var(--space-2);">
        <x-button type="submit" variant="primary">Kirim Pengajuan Peminjaman</x-button>
      </div>
    </form>
    <div id="success-box" style="display: none; text-align: center; padding: var(--space-8) var(--space-4); background: var(--status-approved-bg); border-radius: var(--radius-md); border: 1px solid #86efac;">
      <h3 style="color: var(--status-approved-text); font-weight: 800; font-size: var(--font-size-lg);">Pengajuan Berhasil Dikirim</h3>
      <p style="color: var(--status-approved-text); font-size: var(--font-size-sm); margin-top: var(--space-1);">Kode Tiket: #PINJAM-2026-004. Menunggu verifikasi petugas lab.</p>
      <a href="/peminjaman" style="display: inline-block; margin-top: var(--space-4); font-size: var(--font-size-sm); color: var(--color-primary); font-weight: 700; text-decoration: none;">Kembali ke Beranda</a>
    </div>
  </div>
</div>
@endsection