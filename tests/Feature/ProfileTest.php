<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_profile_data(): void
    {
        $response = $this->getJson('/api/profile');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'email',
                    'nim',
                    'prodi',
                    'fakultas',
                    'no_telp',
                    'status_akun',
                ],
            ]);
    }

    public function test_can_update_profile_data(): void
    {
        $payload = [
            'name' => 'Rani Amelia Putri',
            'email' => 'rani.amelia.putri@student.ac.id',
            'nim' => '24051130099',
            'prodi' => 'Teknologi Informasi',
            'fakultas' => 'Fakultas Teknik',
            'no_telp' => '081299887766',
        ];

        $response = $this->putJson('/api/profile', $payload);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'Rani Amelia Putri',
                    'email' => 'rani.amelia.putri@student.ac.id',
                    'nim' => '24051130099',
                    'no_telp' => '081299887766',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Rani Amelia Putri',
            'email' => 'rani.amelia.putri@student.ac.id',
            'nim' => '24051130099',
        ]);
    }

    public function test_update_profile_validation_fails_with_invalid_data(): void
    {
        $payload = [
            'name' => '',
            'email' => 'bukan-email-valid',
            'no_telp' => 'nomor_huruf_tidak_valid_abc',
        ];

        $response = $this->putJson('/api/profile', $payload);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => ['name', 'email', 'no_telp'],
            ]);
    }

    public function test_cannot_modify_unauthorized_fields_via_profile_update(): void
    {
        $payload = [
            'name' => 'Rani Amelia',
            'email' => 'rani.secure@student.ac.id',
            'status_akun' => 'Super Administrator Terverifikasi',
            'role' => 'admin',
            'password' => 'newplainpassword',
        ];

        $response = $this->putJson('/api/profile', $payload);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'email' => 'rani.secure@student.ac.id',
            'status_akun' => 'Mahasiswa Aktif',
        ]);

        $this->assertDatabaseMissing('users', [
            'status_akun' => 'Super Administrator Terverifikasi',
        ]);
    }
}
