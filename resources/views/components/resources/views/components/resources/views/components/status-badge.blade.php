@props(['status' => 'pending'])
@php
  $cfg = [
    'pending' => ['bg' => 'var(--status-pending-bg)', 'color' => 'var(--status-pending-text)', 'label' => 'Menunggu Verifikasi'],
    'approved' => ['bg' => 'var(--status-approved-bg)', 'color' => 'var(--status-approved-text)', 'label' => 'Tersedia'],
    'rejected' => ['bg' => 'var(--status-rejected-bg)', 'color' => 'var(--status-rejected-text)', 'label' => 'Tidak Tersedia']
  ][$status] ?? ['bg' => 'var(--color-border)', 'color' => 'var(--color-text-muted)', 'label' => ucfirst($status)];
@endphp
<span style="display: inline-flex; align-items: center; padding: 2px var(--space-2); border-radius: var(--radius-full); font-size: var(--font-size-xs); font-weight: 600; background: {{ $cfg['bg'] }}; color: {{ $cfg['color'] }};">
  {{ $cfg['label'] }}
</span>