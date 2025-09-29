<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListingController;

Route::get('/laravel/listings', [ListingController::class, 'index']);
