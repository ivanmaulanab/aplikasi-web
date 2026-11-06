<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Akun - SIPINJAM</title>
    <style>
        body { font-family: Arial, sans-serif; background: whitesmoke; margin: 0; padding: 40px 16px; }
        .card { background: white; max-width: 420px; margin: 0 auto; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .form-group { margin-bottom: 14px; }
        label { display: block; font-weight: bold; margin-bottom: 6px; }
        input { width: 100%; padding: 10px; border: 1px solid silver; border-radius: 6px; box-sizing: border-box; }
        .btn { width: 100%; background: royalblue; color: white; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
        .error { background: mistyrose; color: darkred; padding: 10px; border-radius: 6px; margin-bottom: 14px; }
    </style>
</head>
<body>
<div class="card">
    <h2>Registrasi Peminjam Baru</h2>
    @if (\$errors->any())
        <div class="error">
            @foreach ($errors->all() as$err)
                <div>{{ \$err }}</div>
            @endforeach
        </div>
    @endif
    <form method="POST" action="{{ route('register') }}">
        @csrf
        <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" name="name" value="{{ old('name') }}" required>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required>
        </div>
        <div class="form-group">
            <label>Konfirmasi Password</label>
            <input type="password" name="password_confirmation" required>
        </div>
        <button type="submit" class="btn">Daftar</button>
    </form>
    <p style="margin-top:16px; text-align:center;">
        Sudah punya akun? <a href="{{ route('login') }}">Masuk</a>
    </p>
</div>
</body>
</html>
