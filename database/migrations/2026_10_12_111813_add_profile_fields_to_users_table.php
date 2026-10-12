<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nim')->nullable()->after('email');
            $table->string('prodi')->nullable()->after('nim');
            $table->string('fakultas')->nullable()->after('prodi');
            $table->string('no_telp')->nullable()->after('fakultas');
            $table->string('status_akun')->default('Mahasiswa Aktif')->after('no_telp');
            $table->string('avatar')->nullable()->after('status_akun');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nim', 'prodi', 'fakultas', 'no_telp', 'status_akun', 'avatar']);
        });
    }
};
