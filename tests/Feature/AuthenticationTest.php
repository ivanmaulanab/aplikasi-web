<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\Support\CreatesUserSchema;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use CreatesUserSchema;

    protected function setUp(): void
    {
        parent::setUp();

        $this->createUserSchema();
    }

    public function test_login_authenticates_the_account_and_exposes_its_profile(): void
    {
        User::factory()->create([
            'name' => 'Mahasiswa Pertama',
            'email' => 'pertama@student.ac.id',
            'password' => 'password-pertama',
        ]);
        $student = User::factory()->create([
            'name' => 'Mahasiswa Kedua',
            'email' => 'kedua@student.ac.id',
            'password' => 'password-kedua',
            'nim' => '24051130088',
        ]);
        $student->forceFill(['roles' => ['user', 'admin']])->save();

        $this->postJson('/api/login', [
            'email' => 'kedua@student.ac.id',
            'password' => 'password-kedua',
            'role' => 'user',
        ])->assertOk();

        $this->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('data.id', $student->id)
            ->assertJsonPath('data.name', 'Mahasiswa Kedua')
            ->assertJsonPath('data.nim', '24051130088')
            ->assertJsonPath('data.role', 'user')
            ->assertJsonPath('data.roles', ['user', 'admin']);
    }

    public function test_logout_and_login_as_a_different_account_switches_the_profile(): void
    {
        $firstStudent = User::factory()->create([
            'name' => 'Mahasiswa Pertama',
            'email' => 'pertama@student.ac.id',
            'password' => 'password-pertama',
        ]);
        $secondStudent = User::factory()->create([
            'name' => 'Mahasiswa Kedua',
            'email' => 'kedua@student.ac.id',
            'password' => 'password-kedua',
        ]);

        $this->postJson('/api/login', [
            'email' => 'pertama@student.ac.id',
            'password' => 'password-pertama',
            'role' => 'user',
        ])->assertOk();

        $this->getJson('/api/profile')->assertJsonPath('data.id', $firstStudent->id);
        $this->postJson('/api/logout')->assertOk();
        $this->getJson('/api/profile')->assertUnauthorized();

        $this->postJson('/api/login', [
            'email' => 'kedua@student.ac.id',
            'password' => 'password-kedua',
            'role' => 'user',
        ])->assertOk();

        $this->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('data.id', $secondStudent->id)
            ->assertJsonPath('data.name', 'Mahasiswa Kedua');
    }

    public function test_login_rejects_invalid_credentials_without_authenticating(): void
    {
        User::factory()->create([
            'email' => 'mahasiswa@student.ac.id',
            'password' => 'password-benar',
        ]);

        $this->postJson('/api/login', [
            'email' => 'mahasiswa@student.ac.id',
            'password' => 'password-salah',
            'role' => 'user',
        ])->assertUnauthorized()
            ->assertJsonPath('message', 'Email atau password salah.');

        $this->getJson('/api/profile')->assertUnauthorized();
    }

    public function test_login_returns_validation_error_when_password_has_fewer_than_six_characters(): void
    {
        $this->postJson('/api/login', [
            'email' => 'mahasiswa@student.ac.id',
            'password' => '12345',
            'role' => 'user',
        ])->assertUnprocessable()
            ->assertJsonPath('errors.password.0', 'Password minimal 6 karakter.');
    }

    public function test_login_forbids_a_role_not_assigned_to_the_account(): void
    {
        User::factory()->create([
            'email' => 'mahasiswa@student.ac.id',
            'password' => 'password-benar',
        ]);

        $this->postJson('/api/login', [
            'email' => 'mahasiswa@student.ac.id',
            'password' => 'password-benar',
            'role' => 'admin',
        ])->assertForbidden();

        $this->getJson('/api/profile')->assertUnauthorized();
    }

    public function test_dual_role_account_can_login_as_a_petugas(): void
    {
        $student = User::factory()->create([
            'email' => 'ivan@student.ac.id',
            'password' => '123456',
        ]);
        $student->forceFill(['roles' => ['user', 'admin']])->save();

        $this->postJson('/api/login', [
            'email' => 'ivan@student.ac.id',
            'password' => '123456',
            'role' => 'admin',
        ])->assertOk()
            ->assertJsonPath('role', 'admin');

        $this->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('data.id', $student->id)
            ->assertJsonPath('data.role', 'admin');
    }
}
