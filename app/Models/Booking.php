<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected \$fillable = [
        'user_id',
        'room_id',
        'borrower_name',
        'activity_name',
        'booking_date',
        'start_time',
        'end_time',
        'participants',
        'notes',
        'status',
    ];

    public function room()
    {
        return \$this->belongsTo(Room::class);
    }

    public function user()
    {
        return \$this->belongsTo(User::class);
    }
}
