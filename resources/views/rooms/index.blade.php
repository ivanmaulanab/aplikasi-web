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
      <h1 style="font-size: var(--font-size-2xl); font-weight: 800;">Daftar Ruang Kampus (MySQL)</h1>
      <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Data disajikan secara dinamis dari tabel <code>rooms</code>.</p>
    </div>
    <div style="display: flex; gap: var(--space-2);">
      <a href="{{ route('bookings.index') }}" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-main); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); text-decoration: none; font-size: var(--font-size-sm); font-weight: 600;">Lihat Pengajuan</a>
      <a href="{{ route('rooms.create') }}" style="background: var(--color-primary); color: #fff; padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); text-decoration: none; font-size: var(--font-size-sm); font-weight: 600;">+ Tambah Ruang</a>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-6);">
    @forelse($rooms as $room)
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-2); box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h3 style="font-size: var(--font-size-base); font-weight: 700;">{{ $room->name }}</h3>
          <x-status-badge :status="$room->is_available ? 'approved' : 'rejected'" />
        </div>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">📍 {{ $room->location }}</p>
        <p style="font-size: var(--font-size-sm);">Kapasitas: <strong>{{ $room->capacity }} Orang</strong></p>
        <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); flex-grow: 1;">Fasilitas: {{ $room->facilities ?? '-' }}</p>

        <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4); border-top: 1px solid var(--color-border); padding-top: var(--space-4);">
          @if($room->is_available)
            <a href="{{ route('bookings.create', ['room_id' => $room->id]) }}" style="flex: 1; text-align: center; background: var(--color-primary); color: #fff; padding: var(--space-2); border-radius: var(--radius-md); text-decoration: none; font-size: var(--font-size-xs); font-weight: 600;">Ajukan</a>
          @endif
          <a href="{{ route('rooms.edit', $room) }}" style="padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-main);">Edit</a>
          <form action="{{ route('rooms.destroy', $room) }}" method="POST" onsubmit="return confirm('Hapus data ruang ini?')">
            @csrf
            @method('DELETE')
            <button type="submit" style="padding: var(--space-2) var(--space-4); border: 1px solid #fee2e2; background: #fef2f2; color: #991b1b; border-radius: var(--radius-md); cursor: pointer; font-size: var(--font-size-xs); font-weight: 600;">Hapus</button>
          </form>
        </div>
      </div>
    @empty
      <p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted);">Belum ada data ruang.</p>
    @endforelse
  </div>
</div>
@endsection
