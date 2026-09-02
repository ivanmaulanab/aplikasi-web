<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Aplikasi Web - Laravel</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #080808;
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Background */
        body::before {
            content: "";
            position: fixed;
            width: 700px;
            height: 700px;
            left: -350px;
            top: 50px;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                rgba(255, 45, 32, 0.45) 0%,
                rgba(255, 45, 32, 0.12) 35%,
                transparent 70%
            );
            pointer-events: none;
        }

        body::after {
            content: "";
            position: fixed;
            width: 600px;
            height: 600px;
            right: -300px;
            bottom: -300px;
            border-radius: 50%;
            border: 1px solid rgba(255, 45, 32, 0.18);
            box-shadow:
                0 0 0 80px rgba(255, 45, 32, 0.03),
                0 0 0 160px rgba(255, 45, 32, 0.02);
            pointer-events: none;
        }

        /* Navbar */
        nav {
            width: 100%;
            padding: 28px 7%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-icon {
            width: 42px;
            height: 42px;
            border: 2px solid #ff2d20;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ff2d20;
            font-weight: bold;
            font-size: 20px;
        }

        .brand-name {
            font-size: 19px;
            font-weight: bold;
        }

        .version {
            color: #999;
            font-size: 13px;
            padding: 8px 14px;
            border: 1px solid #292929;
            border-radius: 20px;
            background: #111;
        }

        /* Main */
        main {
            width: 86%;
            max-width: 1250px;
            margin: 30px auto 70px;
            position: relative;
            z-index: 1;
        }

        .hero {
            margin-bottom: 45px;
            max-width: 750px;
        }

        .tag {
            display: inline-block;
            color: #ff4438;
            border: 1px solid rgba(255, 45, 32, 0.35);
            background: rgba(255, 45, 32, 0.08);
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 13px;
            margin-bottom: 20px;
        }

        .hero h1 {
            font-size: clamp(42px, 6vw, 76px);
            line-height: 1;
            letter-spacing: -3px;
            margin-bottom: 22px;
        }

        .hero h1 span {
            color: #ff2d20;
        }

        .hero p {
            color: #999;
            font-size: 17px;
            line-height: 1.7;
            max-width: 650px;
        }

        /* Grid */
        .content-grid {
            display: grid;
            grid-template-columns: 1.25fr 0.75fr;
            gap: 25px;
        }

        /* Card */
        .card {
            background: #141414;
            border: 1px solid #292929;
            border-radius: 16px;
            padding: 32px;
            transition: 0.3s ease;
        }

        .card:hover {
            border-color: rgba(255, 45, 32, 0.5);
            transform: translateY(-3px);
        }

        .main-card {
            min-height: 410px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .icon {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: rgba(255, 45, 32, 0.12);
            border: 1px solid rgba(255, 45, 32, 0.25);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ff2d20;
            font-size: 23px;
            margin-bottom: 25px;
        }

        .card h2 {
            font-size: 25px;
            margin-bottom: 13px;
        }

        .card p {
            color: #858585;
            line-height: 1.7;
            font-size: 14px;
        }

        /* Status */
        .status-box {
            margin-top: 30px;
            padding: 18px;
            background: #0d0d0d;
            border: 1px solid #242424;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .status-dot {
            width: 12px;
            height: 12px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.7);
        }

        .status-info strong {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .status-info span {
            color: #777;
            font-size: 12px;
        }

        /* Right cards */
        .right-column {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .small-card {
            flex: 1;
            position: relative;
        }

        .small-card .icon {
            width: 48px;
            height: 48px;
            margin-bottom: 18px;
        }

        .small-card h2 {
            font-size: 20px;
        }

        .arrow {
            position: absolute;
            right: 28px;
            top: 32px;
            color: #ff2d20;
            font-size: 25px;
            transition: 0.3s;
        }

        .small-card:hover .arrow {
            transform: translateX(5px);
        }

        /* Footer */
        footer {
            text-align: center;
            color: #555;
            font-size: 13px;
            padding: 10px 20px 30px;
            position: relative;
            z-index: 1;
        }

        footer span {
            color: #777;
        }

        /* Responsive */
        @media (max-width: 850px) {
            .content-grid {
                grid-template-columns: 1fr;
            }

            .main-card {
                min-height: auto;
            }

            .hero h1 {
                letter-spacing: -2px;
            }
        }

        @media (max-width: 500px) {
            nav {
                padding: 22px 5%;
            }

            main {
                width: 90%;
            }

            .version {
                display: none;
            }

            .card {
                padding: 25px;
            }

            .hero {
                margin-top: 20px;
            }
        }
    </style>
</head>

<body>

    <!-- Navbar -->
    <nav>
        <div class="brand">
            <div class="brand-icon">L</div>
            <div class="brand-name">Aplikasi Web</div>
        </div>

        <div class="version">
            Laravel 13.29.0
        </div>
    </nav>


    <!-- Main Content -->
    <main>

        <!-- Hero -->
        <section class="hero">
            <div class="tag">● Praktik Aplikasi Web</div>

            <h1>
                Aplikasi Web<br>
                <span>Pertama.</span>
            </h1>

            <p>
                Selamat datang di project Praktik Aplikasi Web.
                Lingkungan pengembangan Laravel telah berhasil
                disiapkan dan siap digunakan untuk pengembangan aplikasi.
            </p>
        </section>


        <!-- Content -->
        <section class="content-grid">

            <!-- Main Card -->
            <article class="card main-card">

                <div>
                    <div class="icon">✓</div>

                    <h2>Status Lingkungan</h2>

                    <p>
                        Laravel berhasil dijalankan dengan baik.
                        Project telah terhubung dengan lingkungan
                        pengembangan dan basis data SQLite.
                    </p>
                </div>

                <div class="status-box">
                    <div class="status-dot"></div>

                    <div class="status-info">
                        <strong>System Ready</strong>
                        <span>Aplikasi siap digunakan untuk praktikum.</span>
                    </div>
                </div>

            </article>


            <!-- Right Column -->
            <div class="right-column">

                <article class="card small-card">

                    <div class="icon">⌘</div>

                    <h2>Laravel Framework</h2>

                    <p>
                        Framework PHP modern yang digunakan
                        untuk membangun aplikasi web ini.
                    </p>

                    <div class="arrow">→</div>

                </article>


                <article class="card small-card">

                    <div class="icon">◆</div>

                    <h2>Database Ready</h2>

                    <p>
                        Database SQLite telah dikonfigurasi
                        dan migration berhasil dijalankan.
                    </p>

                    <div class="arrow">→</div>

                </article>


                <article class="card small-card">

                    <div class="icon">⚡</div>

                    <h2>Development Ready</h2>

                    <p>
                        Project siap dikembangkan menuju fitur
                        aplikasi pada praktikum berikutnya.
                    </p>

                    <div class="arrow">→</div>

                </article>

            </div>

        </section>

    </main>


    <!-- Footer -->
    <footer>
        Praktik Aplikasi Web
        <span>• Universitas Negeri Yogyakarta • 2026</span>
    </footer>

</body>
</html>