<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Ruangan - SIPINJAM</title>
    <style>
        body { font-family: Arial, sans-serif; background: whitesmoke; margin: 0; padding: 24px; }
        .nav { max-width: 1000px; margin: 0 auto 16px auto; background: white; padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .nav a { margin-right: 12px; text-decoration: none; color: royalblue; font-weight: bold; }
        .card { background: white; max-width: 1000px; margin: 0 auto; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .btn { display: inline-block; background: royalblue; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-weight: bold; border: none; cursor: pointer; }
        .btn-danger { background: crimson; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid gainsboro; }
        th { background: aliceblue; }
    </style>
</head>
<body>
<div class="nav">
    <div>
        <a href="{{ route('rooms.index') }}">Daftar Ruang</a>
        @auth
            <a href="{{ route('dashboard') }}">Dashboard</a>
            <a href="{{ route('bookings.index') }}">Pengajuan</a>
        @endauth
    </div>
    <div>
        @auth
            <span>{{ auth()->user()->name }} ({{ auth()->user()->role }})</span>
            <form action="{{ route('logout') }}" method="POST" style="display:inline; margin-left: 10px;">
                @csrf
                <button type="submit" class="btn btn-danger">Keluar</button>
            </form>
        @else
            <a href="{{ route('login') }}">Masuk</a>
            <a href="{{ route('register') }}">Daftar</a>
        @endauth
    </div>
</div>
<div class="card">
    <h2>Daftar Ruangan Kampus</h2>
    @if (auth()->check() && auth()->user()->isAdmin())
        <a href="{{ route('rooms.create') }}" class="btn">+ Tambah Ruangan</a>
    @endif
    <table>
        <thead>
            <tr>
                <th>Nama Ruangan</th>
                <th>Kapasitas</th>
                <th>Lokasi</th>
                <th>Fasilitas</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($rooms as $room)
                <tr>
                    <td>{{ $room->name }}</td>
                    <td>{{ $room->capacity }} Orang</td>
                    <td>{{ $room->location }}</td>
                    <td>{{ $room->facilities }}</td>
                    <td>{{ $room->status }}</td>
                    <td>
                        @auth
                            <a href="{{ route('bookings.create', ['room_id' => $room->id]) }}" class="btn">Ajukan</a>
                        @else
                            <a href="{{ route('login') }}">Masuk untuk mengajukan</a>
                        @endauth
                        @if (auth()->check() && auth()->user()->isAdmin())
                            <a href="{{ route('rooms.edit', $room) }}" class="btn">Edit</a>
                            <form action="{{ route('rooms.destroy', $room) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Hapus</button>
                            </form>
                        @endif
                    </td>
                </tr>
            @empty
                <tr><td colspan="6">Belum ada data ruangan.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
</body>
</html>
