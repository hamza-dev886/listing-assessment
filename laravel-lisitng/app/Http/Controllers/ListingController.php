<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Repositories\ListingRepository;

class ListingController extends Controller
{
    protected ListingRepository $repo;

    public function __construct(ListingRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index(): JsonResponse
    {
        $listings = $this->repo->all();
        return response()->json([
            'source' => 'laravel',
            'data' => $listings,
        ]);
    }
}
