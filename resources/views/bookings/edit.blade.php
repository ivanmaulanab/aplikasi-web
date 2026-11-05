<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Pengajuan Peminjaman</title>
    <style>
        body { font-family: Arial, sans-serif; background: whitesmoke; margin: 0; padding: 24px; }
        .card { background: white; max-width: 600px; margin: 0 auto; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .form-group { margin-bottom: 14px; }
        label { display: block; font-weight: bold; margin-bottom: 6px; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid silver; border-radius: 6px; box-sizing: border-box; }
        .btn { background: royalblue; color: white; padding: 10px 18px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
        .error { background: mistyrose; color: darkred; padding: 10px; border-radius: 6px; margin-bottom: 14px; }
    </style>
</head>
<body>
<div class="card">
    <h2>Edit Pengajuan Peminjaman</h2>
    @if($errors->any())
        <div class="error">
            <ul>
                @foreach($errors->all() as $err)
                    <li>{{ $err }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <form action="{{ route('bookings.update', $booking) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label>Pilih Ruangan</label>
            <select name="room_id" required>
                @foreach ($rooms as $room)
                    <option value="{{ $room->id }}" @selected(old('room_id', $booking->room_id) == $room->id)>
                        {{ $room->name }} - kapasitas {{ $room->capacity }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Nama Kegiatan</label>
            <input type="text" name="activity_name" value="{{ old('activity_name', $booking->activity_name) }}" required>
        </div>
        <div class="form-group">
            <label>Tanggal Peminjaman</label>
            <input type="date" name="booking_date" value="{{ old('booking_date', $booking->booking_date) }}" required>
        </div>
        <div class="form-group">
            <label>Jam Mulai</label>
            <input type="time" name="start_time" value="{{ old('start_time', $booking->start_time) }}" required>
        </div>
        <div class="form-group">
            <label>Jam Selesai</label>
            <input type="time" name="end_time" value="{{ old('end_time', $booking->end_time) }}" required>
        </div>
        <div class="form-group">
            <label>Jumlah Peserta</label>
            <input type="number" name="participants" min="1" value="{{ old('participants', $booking->participants) }}" required>
        </div>
        <div class="form-group">
            <label>Catatan</label>
            <textarea name="notes" rows="3">{{ old('notes', $booking->notes) }}</textarea>
        </div>
        <button type="submit" class="btn">Perbarui Pengajuan</button>
        <a href="{{ route('bookings.index') }}" style="margin-left:10px;">Batal</a>
    </form>
</div>
</body>
</html>
