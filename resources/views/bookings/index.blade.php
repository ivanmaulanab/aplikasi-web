<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Pengajuan Peminjaman</title>
    <style>
        body { font-family: Arial, sans-serif; background: whitesmoke; margin: 0; padding: 24px; }
        .nav { max-width: 1050px; margin: 0 auto 16px auto; background: white; padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .nav a { margin-right: 12px; text-decoration: none; color: royalblue; font-weight: bold; }
        .card { background: white; max-width: 1050px; margin: 0 auto; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .btn { display: inline-block; background: royalblue; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-weight: bold; border: none; cursor: pointer; font-size: 13px; }
        .btn-approve { background: seagreen; }
        .btn-reject { background: darkorange; }
        .btn-delete { background: crimson; }
        .alert { background: honeydew; color: darkgreen; padding: 12px; border-radius: 6px; margin-bottom: 16px; border: 1px solid lightgreen; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid gainsboro; }
        th { background: aliceblue; }
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
        @auth
            <span>{{ auth()->user()->name }} ({{ auth()->user()->role }})</span>
            <form action="{{ route('logout') }}" method="POST" style="display:inline; margin-left: 10px;">
                @csrf
                <button type="submit" class="btn btn-delete">Keluar</button>
            </form>
        @endauth
    </div>
</div>
<div class="card">
    <h2>Daftar Pengajuan Peminjaman Ruangan</h2>
    @if(session('success'))
        <div class="alert">{{ session('success') }}</div>
    @endif
    <a href="{{ route('bookings.create') }}" class="btn">+ Input Peminjaman Baru</a>
    <table>
        <thead>
            <tr>
                <th>Kegiatan</th>
                <th>Ruang</th>
                <th>Pemohon</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($bookings as $booking)
                <tr>
                    <td>{{ $booking->activity_name }}</td>
                    <td>{{ $booking->room->name ?? '-' }}</td>
                    <td>{{ $booking->user?->name ?? $booking->borrower_name ?? '-' }}</td>
                    <td>{{ $booking->booking_date }}</td>
                    <td>{{ $booking->start_time }} - {{ $booking->end_time }}</td>
                    <td><strong>{{ strtoupper($booking->status) }}</strong></td>
                    <td>
                        @can('review', $booking)
                            @if ($booking->status === 'pending')
                                <form action="{{ route('bookings.approve', $booking) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('PATCH')
                                    <button type="submit" class="btn btn-approve">Setujui</button>
                                </form>
                                <form action="{{ route('bookings.reject', $booking) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('PATCH')
                                    <button type="submit" class="btn btn-reject">Tolak</button>
                                </form>
                            @endif
                        @endcan
                        @can('update', $booking)
                            <a href="{{ route('bookings.edit', $booking) }}" class="btn">Edit</a>
                        @endcan
                        @can('delete', $booking)
                            <form action="{{ route('bookings.destroy', $booking) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-delete">Hapus</button>
                            </form>
                        @endcan
                    </td>
                </tr>
            @empty
                <tr><td colspan="7">Belum ada pengajuan.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
</body>
</html>
