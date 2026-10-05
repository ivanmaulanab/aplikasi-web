@extends('layouts.app')
@section('content')
<div class="container">
  <section style="background: var(--color-surface); border: 1px solid var(--color-border); padding: var(--space-6); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); margin-bottom: var(--space-8);">
    <h1 style="font-size: var(--font-size-2xl); font-weight: 800; margin-bottom: var(--space-2);">Cari & Pinjam Ruang Gedung FT UNY</h1>
    <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-bottom: var(--space-4);">Pilih tanggal kegiatan dan jumlah peserta untuk memeriksa ketersediaan ruang.</p>
    <form action="/peminjaman" method="GET" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); align-items: flex-end;">
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: var(--space-1);">Tanggal Peminjaman</label>
        <input type="date" value="2026-10-05" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-sm);" required>
      </div>
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: var(--space-1);">Kapasitas Minimum</label>
        <input type="number" placeholder="Misal: 40" value="30" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-sm);" required>
      </div>
      <div>
        <x-button type="submit" variant="primary">Cari Ketersediaan</x-button>
      </div>
    </form>
  </section>
  <section>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
      <h2 style="font-size: var(--font-size-lg); font-weight: 700;">Daftar Ruang Ditemukan (3)</h2>
      <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">Hasil pencarian sesuai kriteria</span>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6);">
      <x-room-card id="1" name="Lab Pemrograman Web (L2-01)" capacity="40" facilities="AC, Proyektor, 40 PC Klien, Fast WiFi" status="approved" />
      <x-room-card id="2" name="Ruang Seminar FT (K3-04)" capacity="80" facilities="Sound System, Panggung, AC" status="approved" />
      <x-room-card id="3" name="Lab Jaringan Komputer (L2-03)" capacity="35" facilities="Rack Server, Switch Cisco, AC" status="rejected" />
    </div>
  </section>
</div>
@endsection