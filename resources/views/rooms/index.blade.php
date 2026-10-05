<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Ruangan</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            margin: 0;
            padding: 40px;
        }

        .container {
            max-width: 1100px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
        }

        h1 {
            margin-top: 0;
        }

        .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 10px 16px;
            text-decoration: none;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .success {
            background: #dcfce7;
            color: #166534;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background: #f1f5f9;
        }

        .action {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 14px;
            margin-right: 4px;
        }

        .detail {
            background: #e0f2fe;
            color: #0369a1;
        }

        .edit {
            background: #fef3c7;
            color: #92400e;
        }

        .delete {
            background: #fee2e2;
            color: #b91c1c;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Daftar Ruangan</h1>

    @if(session('success'))
        <div class="success">
            {{ session('success') }}
        </div>
    @endif

    <a href="{{ route('rooms.create') }}" class="button">
        + Tambah Ruangan
    </a>

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
                    <td>{{ $room->capacity }} orang</td>
                    <td>{{ $room->location }}</td>
                    <td>{{ $room->facilities ?? '-' }}</td>

                    <td>
                        {{ $room->is_available ? 'Tersedia' : 'Tidak tersedia' }}
                    </td>

                    <td>
                        <a href="{{ route('rooms.show', $room) }}"
                           class="action detail">
                            Detail
                        </a>

                        <a href="{{ route('rooms.edit', $room) }}"
                           class="action edit">
                            Edit
                        </a>

                        <form action="{{ route('rooms.destroy', $room) }}"
                              method="POST"
                              style="display:inline;">

                            @csrf
                            @method('DELETE')

                            <button type="submit"
                                    class="action delete"
                                    onclick="return confirm('Yakin ingin menghapus ruangan ini?')">
                                Hapus
                            </button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">
                        Belum ada data ruangan.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

</div>

</body>
</html>