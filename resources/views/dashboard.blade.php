<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - SIPINJAM</title>
    <style>
        body { font-family: Arial, sans-serif; background: whitesmoke; margin: 0; padding: 24px; }
        .nav { max-width: 900px; margin: 0 auto 16px auto; background: white; padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .nav a { margin-right: 12px; text-decoration: none; color: royalblue; font-weight: bold; }
        .card { background: white; max-width: 900px; margin: 0 auto; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .btn-danger { background: crimson; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>
<div class="nav">
    <div>
        <a href="{{ route('rooms.index') }}">Daftar Ruang</a>
        <a href="{{ route('dashboard') }}">Dashboard</a>
        <a href="{{ route('bookings.index') }}">Pengajuan</a>
    </div>
    <div>
        <span>{{ auth()->user()->name }} ({{ auth()->user()->role }})</span>
        <form action="{{ route('logout') }}" method="POST" style="display:inline; margin-left: 10px;">
            @csrf
            <button type="submit" class="btn-danger">Keluar</button>
        </form>
    </div>
</div>
<div class="card">
    <h2>Dashboard SIPINJAM</h2>
    <p>Halo, <strong>{{ Auth::user()->name }}</strong> ({{ Auth::user()->role }})</p>
    <p>Total pengajuan: <strong>{{ $total ?? 0 }}</strong></p>
    <p>Menunggu persetujuan: <strong>{{ $pending ?? 0 }}</strong></p>
</div>
</body>
</html>
