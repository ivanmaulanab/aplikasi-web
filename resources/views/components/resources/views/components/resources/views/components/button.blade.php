@props(['type' => 'button', 'variant' => 'primary', 'disabled' => false])
@php
  $baseStyles = "display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: var(--font-size-sm); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); border: 1px solid transparent; cursor: pointer; text-decoration: none;";
  $variants = [
    'primary' => "background-color: var(--color-primary); color: #fff;",
    'secondary' => "background-color: transparent; border-color: var(--color-border); color: var(--color-text-main);",
    'disabled' => "background-color: var(--color-border); color: var(--color-text-muted); cursor: not-allowed;"
  ];
  $applied = $disabled ? $variants['disabled'] : ($variants[$variant] ?? $variants['primary']);
@endphp
<button type="{{ $type }}" {{ $disabled ? 'disabled' : '' }} style="{{ $baseStyles }} {{ $applied }}">
  {{ $slot }}
</button>