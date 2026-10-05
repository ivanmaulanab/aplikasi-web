@extends('layouts.app')
@section('content')
<div class="container" style="max-width: 600px;">
  <a href="{{ route('rooms.index') }}" style="display: inline-block; margin-bottom: var(--space-4); text-decoration: none; color: var(--color-primary); font-size: var(--font-size-sm);">&larr; Kembali ke Daftar Ruang</a>
  <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6);">
    <h2 style="font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-4);">Edit Data Ruang</h2>
    <form action="{{ route('rooms.update', $room) }}" method="POST" style="display: flex; flex-direction: column; gap: var(--space-4);">
      @csrf
      @method('PUT')
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Nama Ruang *</label>
        <input type="text" name="name" value="{{ old('name', $room->name) }}" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Kapasitas (Orang) *</label>
          <input type="number" name="capacity" value="{{ old('capacity', $room->capacity) }}" min="1" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        </div>
        <div>
          <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Lokasi / Gedung *</label>
          <input type="text" name="location" value="{{ old('location', $room->location) }}" required style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        </div>
      </div>
      <div>
        <label style="display: block; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 2px;">Fasilitas Ruang</label>
        <textarea name="facilities" rows="3" style="width: 100%; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md);">{{ old('facilities', $room->facilities) }}</textarea>
      </div>
      <div>
        <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--font-size-sm); cursor: pointer;">
          <input type="checkbox" name="is_available" value="1" {{ old('is_available', $room->is_available) ? 'checked' : '' }}>
          Status Ruang Siap Dipinjam (Available)
        </label>
      </div>
      <button type="submit" style="background: var(--color-primary); color: #fff; padding: var(--space-2); border-radius: var(--radius-md); border: none; font-weight: 700; cursor: pointer;">Perbarui Data Ruang</button>
    </form>
  </div>
</div>
@endsection
