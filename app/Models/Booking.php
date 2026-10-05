<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'room_id',
        'activity_name',
        'date',
        'start_time',
        'end_time',
        'participants',
        'notes',
        'status'
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
