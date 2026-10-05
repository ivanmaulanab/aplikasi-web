<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIPINJAM FT UNY - Pertemuan 04</title>
  <link rel="stylesheet" href="{{ asset('css/design-tokens.css') }}">
</head>
<body>
  <x-navbar />
  <main style="padding: var(--space-8) 0; min-height: 80vh;">
    @yield('content')
  </main>
  <footer style="border-top: 1px solid var(--color-border); background: var(--color-surface); padding: var(--space-6) 0; text-align: center; font-size: var(--font-size-sm); color: var(--color-text-muted);">
    <div class="container">
      <p>&copy; 2026 SIPINJAM - Praktik Aplikasi Web INF60295 UNY</p>
    </div>
  </footer>
</body>
</html>