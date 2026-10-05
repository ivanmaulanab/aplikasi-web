@extends('layouts.app')
@section('content')
<div class="container">
  <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-8); text-align: center; box-shadow: var(--shadow-sm); max-width: 700px; margin: 2rem auto;">
    <h1 style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text-main); margin-bottom: var(--space-2);">🏛️ SIPINJAM FT UNY</h1>
    <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); margin-bottom: var(--space-6);">Sistem Informasi Peminjaman Ruang Kuliah & Laboratorium Fakultas Teknik UNY</p>
    
    <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
      <a href="{{ route('rooms.index') }}" style="background: var(--color-primary); color: #fff; padding: var(--space-3) var(--space-6); border-radius: var(--radius-md); text-decoration: none; font-weight: 700; font-size: var(--font-size-sm);">
        Kelola Data Ruang (CRUD)
      </a>
      <a href="{{ route('bookings.index') }}" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-main); padding: var(--space-3) var(--space-6); border-radius: var(--radius-md); text-decoration: none; font-weight: 600; font-size: var(--font-size-sm);">
        Daftar Pengajuan Peminjaman
      </a>
    </div>
  </div>
</div>
@endsection
