<?php

namespace Tests\Support;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

trait CreatesUserSchema
{
    /**
     * Create only the users table needed by these tests, avoiding unrelated duplicate room migrations.
     */
    protected function createUserSchema(): void
    {
        Schema::create('users', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->string('nim')->nullable();
            $table->string('prodi')->nullable();
            $table->string('fakultas')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('status_akun')->default('Mahasiswa Aktif');
            $table->string('avatar')->nullable();
            $table->json('roles')->nullable();
        });
    }
}
