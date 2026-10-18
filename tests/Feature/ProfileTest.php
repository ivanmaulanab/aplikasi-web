<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\Support\CreatesUserSchema;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use CreatesUserSchema;

    protected function setUp(): void
    {
        parent::setUp();

        $this->createUserSchema();
    }

    public function test_unauthenticated_requests_cannot_read_or_update_a_profile(): void
    {
        $this->getJson('/api/profile')->assertUnauthorized();
        $this->putJson('/api/profile', [])->assertUnauthorized();

        $this->assertDatabaseCount('users', 0);
    }

    public function test_profile_returns_the_authenticated_users_data_without_password(): void
    {
        User::factory()->create([
            'name' => 'Mahasiswa Pertama',
            'email' => 'pertama@student.ac.id',
        ]);
        $student = User::factory()->create([
            'name' => 'Mahasiswa Kedua',
            'email' => 'kedua@student.ac.id',
            'nim' => '24051130088',
            'prodi' => 'Sistem Informasi',
            'fakultas' => 'Fakultas Ilmu Komputer',
            'no_telp' => '089876543210',
        ]);

        $response = $this->actingAs($student)->getJson('/api/profile');

        $response->assertOk()
            ->assertJsonPath('data.id', $student->id)
            ->assertJsonPath('data.name', 'Mahasiswa Kedua')
            ->assertJsonPath('data.email', 'kedua@student.ac.id')
            ->assertJsonPath('data.nim', '24051130088')
            ->assertJsonMissingPath('data.password');
    }

    public function test_profile_update_changes_only_the_authenticated_users_allowed_fields(): void
    {
        $student = User::factory()->create([
            'name' => 'Nama Lama',
            'email' => 'lama@student.ac.id',
            'password' => 'original-password',
        ]);
        $otherStudent = User::factory()->create([
            'name' => 'Mahasiswa Lain',
            'email' => 'lain@student.ac.id',
            'nim' => '24051130088',
        ]);

        $response = $this->actingAs($student)->putJson('/api/profile', [
            'name' => 'Nama Baru',
            'email' => 'baru@student.ac.id',
            'nim' => '24051130123',
            'prodi' => 'Teknologi Informasi',
            'fakultas' => 'Fakultas Teknik',
            'no_telp' => '081234567890',
            'status_akun' => 'Administrator',
            'password' => 'new-plaintext-password',
        ]);

        $response->assertOk()
            ->assertJsonPath('data.id', $student->id)
            ->assertJsonPath('data.name', 'Nama Baru')
            ->assertJsonPath('data.email', 'baru@student.ac.id')
            ->assertJsonPath('data.nim', '24051130123')
            ->assertJsonMissingPath('data.password');

        $this->assertDatabaseHas('users', [
            'id' => $student->id,
            'name' => 'Nama Baru',
            'email' => 'baru@student.ac.id',
            'status_akun' => 'Mahasiswa Aktif',
        ]);
        $this->assertDatabaseHas('users', [
            'id' => $otherStudent->id,
            'name' => 'Mahasiswa Lain',
            'email' => 'lain@student.ac.id',
            'nim' => '24051130088',
        ]);
        $this->assertTrue(Hash::check('original-password', $student->fresh()->password));

        $this->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('data.name', 'Nama Baru')
            ->assertJsonPath('data.email', 'baru@student.ac.id');
    }

    public function test_profile_update_returns_validation_errors_for_invalid_data(): void
    {
        $student = User::factory()->create();

        $response = $this->actingAs($student)->putJson('/api/profile', [
            'name' => '',
            'email' => 'bukan-email-valid',
            'no_telp' => 'nomor_huruf_tidak_valid_abc',
        ]);

        $response->assertUnprocessable()
            ->assertJsonPath('success', false)
            ->assertJsonStructure([
                'errors' => ['name', 'email', 'no_telp'],
            ]);
    }
}
