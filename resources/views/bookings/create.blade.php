<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Peminjaman</title>

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
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
        }

        input,
        select,
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-sizing: border-box;
        }

        textarea {
            min-height: 100px;
        }

        .error {
            background: #fee2e2;
            color: #b91c1c;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .button {
            display: inline-block;
            border: none;
            padding: 10px 16px;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            font-size: 14px;
        }

        .save {
            background: #2563eb;
            color: white;
        }

        .back {
            background: #e5e7eb;
            color: #111827;
            margin-left: 8px;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Tambah Peminjaman Ruangan</h1>

    @if($errors->any())
        <div class="error">
            <strong>Terjadi kesalahan:</strong>

            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('bookings.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="room_id">Pilih Ruangan</label>

            <select name="room_id" id="room_id" required>
                <option value="">-- Pilih Ruangan --</option>

                @foreach($rooms as $room)
                    <option value="{{ $room->id }}"
                        {{ old('room_id') == $room->id ? 'selected' : '' }}>
                        {{ $room->name }} - Kapasitas {{ $room->capacity }} orang
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="activity_name">Nama Kegiatan</label>

            <input
                type="text"
                id="activity_name"
                name="activity_name"
                value="{{ old('activity_name') }}"
                placeholder="Contoh: Rapat Organisasi"
                required
            >
        </div>

        <div class="form-group">
            <label for="date">Tanggal</label>

            <input
                type="date"
                id="date"
                name="date"
                value="{{ old('date') }}"
                required
            >
        </div>

        <div class="form-group">
            <label for="start_time">Jam Mulai</label>

            <input
                type="time"
                id="start_time"
                name="start_time"
                value="{{ old('start_time') }}"
                required
            >
        </div>

        <div class="form-group">
            <label for="end_time">Jam Selesai</label>

            <input
                type="time"
                id="end_time"
                name="end_time"
                value="{{ old('end_time') }}"
                required
            >
        </div>

        <div class="form-group">
            <label for="participants">Jumlah Peserta</label>

            <input
                type="number"
                id="participants"
                name="participants"
                value="{{ old('participants') }}"
                min="1"
                placeholder="Contoh: 25"
                required
            >
        </div>

        <div class="form-group">
            <label for="notes">Catatan</label>

            <textarea
                id="notes"
                name="notes"
                placeholder="Catatan tambahan (opsional)"
            >{{ old('notes') }}</textarea>
        </div>

        <button type="submit" class="button save">
            Simpan Peminjaman
        </button>

        <a href="{{ route('bookings.index') }}" class="button back">
            Kembali
        </a>
    </form>

</div>

</body>
</html>