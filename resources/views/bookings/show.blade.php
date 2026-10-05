<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Peminjaman</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            padding: 40px;
        }

        .container {
            max-width: 700px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
        }

        .item {
            margin-bottom: 18px;
        }

        .label {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .button {
            display: inline-block;
            padding: 10px 16px;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 10px;
        }

        .back {
            background: #e5e7eb;
            color: #111827;
        }

        .edit {
            background: #facc15;
            color: #111827;
            margin-left: 8px;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Detail Peminjaman</h1>

    <div class="item">
        <div class="label">Nama Kegiatan</div>
        {{ $booking->activity_name }}
    </div>

    <div class="item">
        <div class="label">Ruangan</div>
        {{ $booking->room->name }}
    </div>

    <div class="item">
        <div class="label">Tanggal</div>
        {{ $booking->date }}
    </div>

    <div class="item">
        <div class="label">Waktu</div>
        {{ $booking->start_time }} - {{ $booking->end_time }}
    </div>

    <div class="item">
        <div class="label">Jumlah Peserta</div>
        {{ $booking->participants }} orang
    </div>

    <div class="item">
        <div class="label">Catatan</div>
        {{ $booking->notes ?? '-' }}
    </div>

    <div class="item">
        <div class="label">Status</div>
        {{ ucfirst($booking->status) }}
    </div>

    <a href="{{ route('bookings.index') }}" class="button back">
        Kembali
    </a>

    <a href="{{ route('bookings.edit', $booking) }}" class="button edit">
        Edit
    </a>

</div>

</body>
</html>
