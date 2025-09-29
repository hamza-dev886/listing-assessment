<?php

namespace App\Repositories;

use App\Models\Listing;

class ListingRepository
{
    public function all()
    {
        return Listing::all();
    }
}
