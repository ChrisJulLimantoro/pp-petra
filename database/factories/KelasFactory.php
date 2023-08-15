<?php

namespace Database\Factories;

use App\Models\Pengajar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kelas>
 */
class KelasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->word(),
            'hari' => fake()->randomElement(['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']),
            'jam_mulai' => fake()->time(),
            'jam_selesai' => fake()->time(),
            'ruang' => 'P ' . fake()->randomNumber(3, true),
            'pengajar_id' => mt_rand(1, Pengajar::count()),
        ];
    }
}
