<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    protected $fillable = [
        'title',
        'city',
        'price',
        'bedrooms',
        'agentId',
    ];

    protected $casts = [
        'price' => 'float',
        'bedrooms' => 'integer',
    ];

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agentId');
    }
}
