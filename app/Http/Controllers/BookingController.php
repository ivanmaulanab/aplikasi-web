<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('room')->latest()->get();
        return view('bookings.index', compact('bookings'));
    }

    public function create(Request $request)
    {
        $rooms = Room::where('is_available', true)->get();
        $selectedRoomId = $request->query('room_id');
        return view('bookings.create', compact('rooms', 'selectedRoomId'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => ['required', 'exists:rooms,id'],
            'activity_name' => ['required', 'string', 'max:150'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'start_time' => ['required'],
            'end_time' => ['required', 'after:start_time'],
            'participants' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
        ]);

        $room = Room::findOrFail($validated['room_id']);

        if ($validated['participants'] > $room->capacity) {
            return back()->withErrors([
                'participants' => 'Jumlah peserta melebihi kapasitas ruang.'
            ])->withInput();
        }

        $conflict = Booking::where('room_id', $validated['room_id'])
            ->where('date', $validated['date'])
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($query) use ($validated) {
                $query->where('start_time', '<', $validated['end_time'])
                      ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return back()->withErrors([
                'start_time' => 'Jadwal bertabrakan dengan pengajuan yang sudah ada.'
            ])->withInput();
        }

        $validated['status'] = 'pending';
        Booking::create($validated);

        return redirect()->route('bookings.index')
            ->with('success', 'Pengajuan berhasil disimpan.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('bookings.index')
            ->with('success', 'Pengajuan berhasil dihapus.');
    }
}
