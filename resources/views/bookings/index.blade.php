@extends('layouts.app')
@section('content')
<div class="container">
  @if(session('success'))
    <div style="background: var(--status-approved-bg); color: var(--status-approved-text); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-6); font-weight: 600;">
      ✓ {{ session('success') }}
    </div>
  @endif

  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
    <div>
      <h1 style="font-size: var(--font-size-2xl); font-weight: 800;">Daftar Pengajuan Peminjaman</h1>
      <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Menampilkan seluruh tiket permohonan peminjaman ruang.</p>
    </div>
    <div style="display: flex; gap: var(--space-2);">
      <a href="{{ route('rooms.index') }}" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-main); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); text-decoration: none; font-size: var(--font-size-sm); font-weight: 600;">&larr; Beranda Ruang</a>
      <a href="{{ route('bookings.create') }}" style="background: var(--color-primary); color: #fff; padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); text-decoration: none; font-size: var(--font-size-sm); font-weight: 600;">+ Ajukan Peminjaman</a>
    </div>
  </div>

  <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: var(--font-size-sm);">
      <thead style="background: var(--color-background); border-bottom: 1px solid var(--color-border);">
        <tr>
          <th style="padding: var(--space-3) var(--space-4);">Kegiatan</th>
          <th style="padding: var(--space-3) var(--space-4);">Ruangan</th>
          <th style="padding: var(--space-3) var(--space-4);">Tanggal & Waktu</th>
          <th style="padding: var(--space-3) var(--space-4);">Peserta</th>
          <th style="padding: var(--space-3) var(--space-4);">Status</th>
          <th style="padding: var(--space-3) var(--space-4);">Aksi</th>
        </tr>
      </thead>
      <tbody>
        @forelse($bookings as $booking)
          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: var(--space-4); font-weight: 600;">{{ $booking->activity_name }}</td>
            <td style="padding: var(--space-4);">{{ $booking->room->name }}</td>
            <td style="padding: var(--space-4);">{{ $booking->date }} <br><span style="color: var(--color-text-muted); font-size: var(--font-size-xs);">{{ $booking->start_time }} - {{ $booking->end_time }}</span></td>
            <td style="padding: var(--space-4);">{{ $booking->participants }} Orang</td>
            <td style="padding: var(--space-4);"><x-status-badge :status="$booking->status" /></td>
            <td style="padding: var(--space-4);">
              <form action="{{ route('bookings.destroy', $booking) }}" method="POST" onsubmit="return confirm('Batalkan pengajuan ini?')">
                @csrf
                @method('DELETE')
                <button type="submit" style="background: transparent; border: none; color: #991b1b; cursor: pointer; font-size: var(--font-size-xs); font-weight: 600;">Batal / Hapus</button>
              </form>
            </td>
          </tr>
        @empty
          <tr>
            <td colspan="6" style="padding: var(--space-6); text-align: center; color: var(--color-text-muted);">Belum ada riwayat pengajuan peminjaman di basis data.</td>
          </tr>
        @endforelse
      </tbody>
    </table>
  </div>
</div>
@endsection
