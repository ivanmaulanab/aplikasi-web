<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Ruangan</title>

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
            color: #b91c1c;
            background: #fee2e2;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .button {
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

    <h1>Tambah Ruangan</h1>

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

    <form action="{{ route('rooms.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="name">Nama Ruangan</label>
            <input
                type="text"
                id="name"
                name="name"
                value="{{ old('name') }}"
                placeholder="Contoh: Ruang Kelas A"
                required
            >
        </div>

        <div class="form-group">
            <label for="capacity">Kapasitas</label>
            <input
                type="number"
                id="capacity"
                name="capacity"
                value="{{ old('capacity') }}"
                min="1"
                placeholder="Contoh: 50"
                required
            >
        </div>

        <div class="form-group">
            <label for="location">Lokasi</label>
            <input
                type="text"
                id="location"
                name="location"
                value="{{ old('location') }}"
                placeholder="Contoh: Gedung Teknik Lt. 3"
                required
            >
        </div>

        <div class="form-group">
            <label for="facilities">Fasilitas</label>
            <textarea
                id="facilities"
                name="facilities"
                placeholder="Contoh: Proyektor, AC, WiFi"
            >{{ old('facilities') }}</textarea>
        </div>

        <button type="submit" class="button save">
            Simpan Ruangan
        </button>

        <a href="{{ route('rooms.index') }}" class="button back">
            Kembali
        </a>
    </form>

</div>

</body>
</html>