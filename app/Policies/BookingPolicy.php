<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function update(User $user, Booking $booking): bool
    {
        return $user->isAdmin()
            || ($booking->user_id === $user->id && $booking->status === 'pending');
    }

    public function delete(User $user, Booking $booking): bool
    {
        return $this->update($user, $booking);
    }

    public function review(User $user, Booking $booking): bool
    {
        return $user->isAdmin();
    }
}
