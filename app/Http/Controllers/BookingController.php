<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('room')
            ->latest()
            ->get();

        return view('bookings.index', compact('bookings'));
    }

    public function create()
    {
        $rooms = Room::where('is_available', true)
            ->orderBy('name')
            ->get();

        return view('bookings.create', compact('rooms'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'activity_name' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'participants' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Cek kapasitas ruangan
        if ($validated['participants'] > $room->capacity) {
            return back()
                ->withInput()
                ->withErrors([
                    'participants' => 'Jumlah peserta melebihi kapasitas ruangan.'
                ]);
        }

        // Cek jadwal bentrok
        $conflict = Booking::where('room_id', $validated['room_id'])
            ->where('date', $validated['date'])
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($query) use ($validated) {
                $query->where('start_time', '<', $validated['end_time'])
                      ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return back()
                ->withInput()
                ->withErrors([
                    'date' => 'Jadwal ruangan bentrok dengan booking yang sudah ada.'
                ]);
        }

        $validated['status'] = 'pending';

        Booking::create($validated);

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Peminjaman berhasil dibuat.');
    }

    public function show(Booking $booking)
    {
        $booking->load('room');

        return view('bookings.show', compact('booking'));
    }

    public function edit(Booking $booking)
    {
        $rooms = Room::where('is_available', true)
            ->orderBy('name')
            ->get();

        return view('bookings.edit', compact('booking', 'rooms'));
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'activity_name' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'participants' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Cek kapasitas
        if ($validated['participants'] > $room->capacity) {
            return back()
                ->withInput()
                ->withErrors([
                    'participants' => 'Jumlah peserta melebihi kapasitas ruangan.'
                ]);
        }

        // Cek bentrok, kecuali booking yang sedang diedit
        $conflict = Booking::where('room_id', $validated['room_id'])
            ->where('date', $validated['date'])
            ->whereIn('status', ['pending', 'approved'])
            ->where('id', '!=', $booking->id)
            ->where(function ($query) use ($validated) {
                $query->where('start_time', '<', $validated['end_time'])
                      ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return back()
                ->withInput()
                ->withErrors([
                    'date' => 'Jadwal ruangan bentrok dengan booking yang sudah ada.'
                ]);
        }

        $booking->update($validated);

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Peminjaman berhasil diperbarui.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Peminjaman berhasil dihapus.');
    }
}