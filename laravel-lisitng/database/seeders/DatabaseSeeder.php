<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Agent;
use App\Models\Listing;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate([
            'email' => 'test@example.com',
        ],[
            'name' => 'Test User',
            'password' => bcrypt('password')
        ]);
        
        $agent = Agent::firstOrCreate([
            'name' => 'Test Agent',
        ]);
        
        Listing::firstOrCreate([
            'title' => 'Cozy Apartment',
            'city' => 'New York',
            'price' => 250000.00,
            'bedrooms' => 2,
            'agentId' => $agent->id,
        ]);
        
        Listing::firstOrCreate([
            'title' => 'Beach House',
            'city' => 'Miami',
            'price' => 750000.00,
            'bedrooms' => 4,
            'agentId' => $agent->id,
        ]);
    }
}
