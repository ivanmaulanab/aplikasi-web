@extends('layouts.app')
@section('content')
<div class="container" style="max-width: 650px;">
  <a href="{{ route('bookings.index') }}" style="display: inline-block; margin-bottom: var(--space-4); text-decoration: none; color: var(--color-primary); font-size: var(--font-size-sm);">&larr; Kembali ke Daftar Pengajuan</a>

  @if($errors->any())
    <div style="background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-4); font-size: var(--font-size-sm);">
      <strong style="display: block; margin-bottom: var(--space-1);">Peringatan Validasi:</strong>
      <ul style="padding-left: var(--space-4);">
        @foreach($errors->all() as $error)
          <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
  @endif

  <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6);">
    <h2 style="font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-4);">Formulir Pengajuan Peminjaman Ruang</h2>

    <form action="{{ route('bookings.store') }}" method="POST" style="display: flex; flex-direction: column; gap: var(--space-4);">
      @csrf
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Pilih Ruangan Kampus *</label>
        <select name="room_id" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
          <option value="">-- Pilih Ruang --</option>
          @foreach($rooms as $room)
            <option value="{{ $room->id }}" {{ (old('room_id', $selectedRoomId ?? '') == $room->id) ? 'selected' : '' }}>
              {{ $room->name }} (Maks. {{ $room->capacity }} orang)
            </option>
          @endforeach
        </select>
      </div>

      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Nama Kegiatan / Acara *</label>
        <input type="text" name="activity_name" value="{{ old('activity_name') }}" placeholder="Contoh: Workshop Laravel" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Tanggal Peminjaman *</label>
          <input type="date" name="date" value="{{ old('date', date('Y-m-d')) }}" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        </div>
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Jumlah Peserta *</label>
          <input type="number" name="participants" value="{{ old('participants') }}" min="1" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Waktu Mulai *</label>
          <input type="time" name="start_time" value="{{ old('start_time', '09:00') }}" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        </div>
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Waktu Selesai *</label>
          <input type="time" name="end_time" value="{{ old('end_time', '11:00') }}" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        </div>
      </div>

      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Catatan / Keperluan Tambahan</label>
        <textarea name="notes" rows="3" placeholder="Contoh: Proyektor dan mic wireless" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">{{ old('notes') }}</textarea>
      </div>

      <button type="submit" style="background: var(--color-primary); color: #fff; padding: var(--space-2); border-radius: var(--radius-md); border: none; font-weight: 700; cursor: pointer;">Kirim Pengajuan</button>
    </form>
  </div>
</div>
@endsection
