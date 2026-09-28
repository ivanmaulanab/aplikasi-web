@props(['id', 'name', 'capacity', 'facilities', 'status' => 'approved'])
<div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
  <div style="height: 140px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-2xl);">🏢</div>
  <div style="padding: var(--space-4); display: flex; flex-direction: column; flex-grow: 1; gap: var(--space-2);">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <h3 style="font-size: var(--font-size-base); font-weight: 700;">{{ $name }}</h3>
      <x-status-badge :status="$status" />
    </div>
    <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">Kapasitas: <strong>{{ $capacity }} Orang</strong></p>
    <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); flex-grow: 1;">Fasilitas: {{ $facilities }}</p>
    <div style="margin-top: var(--space-4);">
      @if($status === 'approved')
        <a href="/peminjaman/detail/{{ $id }}" style="display: block; text-align: center; background: var(--color-primary); color: #fff; text-decoration: none; padding: var(--space-2); border-radius: var(--radius-md); font-size: var(--font-size-sm); font-weight: 600;">Pilih & Ajukan</a>
      @else
        <button disabled style="width: 100%; padding: var(--space-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-border); color: var(--color-text-muted); font-size: var(--font-size-sm); cursor: not-allowed;">Sedang Dipakai</button>
      @endif
    </div>
  </div>
</div>