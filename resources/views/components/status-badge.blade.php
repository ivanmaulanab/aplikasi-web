@props(['status' => 'pending'])
@php
  $cfg = [
    'pending' => ['bg' => '#fef3c7', 'color' => '#92400e', 'label' => 'Menunggu Verifikasi'],
    'approved' => ['bg' => '#dcfce7', 'color' => '#166534', 'label' => 'Tersedia'],
    'rejected' => ['bg' => '#fee2e2', 'color' => '#991b1b', 'label' => 'Tidak Tersedia']
  ][$status] ?? ['bg' => '#e2e8f0', 'color' => '#64748b', 'label' => ucfirst($status)];
@endphp
<span style="display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: {{ $cfg['bg'] }}; color: {{ $cfg['color'] }};">
  {{ $cfg['label'] }}
</span>
