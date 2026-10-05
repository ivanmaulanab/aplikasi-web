<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Ruangan</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            margin: 0;
            padding: 40px;
        }

        .container {
            max-width: 700px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
        }

        h1 {
            margin-top: 0;
            margin-bottom: 25px;
        }

        .detail {
            margin-bottom: 18px;
        }

        .label {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .value {
            padding: 12px;
            background: #f8fafc;
            border-radius: 6px;
        }

        .button {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 16px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Detail Ruangan</h1>

    <div class="detail">
        <div class="label">Nama Ruangan</div>
        <div class="value">{{ $room->name }}</div>
    </div>

    <div class="detail">
        <div class="label">Kapasitas</div>
        <div class="value">{{ $room->capacity }} orang</div>
    </div>

    <div class="detail">
        <div class="label">Lokasi</div>
        <div class="value">{{ $room->location }}</div>
    </div>

    <div class="detail">
        <div class="label">Fasilitas</div>
        <div class="value">{{ $room->facilities ?? '-' }}</div>
    </div>

    <div class="detail">
        <div class="label">Status</div>
        <div class="value">
            {{ $room->is_available ? 'Tersedia' : 'Tidak tersedia' }}
        </div>
    </div>

    <a href="{{ route('rooms.index') }}" class="button">
        Kembali ke Daftar
    </a>

</div>

</body>
</html>