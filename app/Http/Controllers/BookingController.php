<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with(['room', 'user'])->latest();

        if (! $request->user()->isAdmin()) {
            $query->where('user_id', $request->user()->id);
        }

        $bookings = $query->get();
        return view('bookings.index', compact('bookings'));
    }

    public function create()
    {
        $rooms = Room::all();
        return view('bookings.create', compact('rooms'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id'       => 'required|exists:rooms,id',
            'borrower_name' => 'nullable|string|max:150',
            'activity_name' => 'required|string|max:200',
            'booking_date'  => 'required|date',
            'start_time'    => 'required',
            'end_time'      => 'required|after:start_time',
            'participants'  => 'required|integer|min:1',
            'notes'         => 'nullable|string',
        ]);

        $room = Room::findOrFail($validated['room_id']);
        if ($validated['participants'] > $room->capacity) {
            return back()->withErrors([
                'participants' => 'Jumlah peserta melebihi kapasitas ruangan (' . $room->capacity . ' orang).'
            ])->withInput();
        }

        $conflict = Booking::where('room_id', $validated['room_id'])
            ->where('booking_date', $validated['booking_date'])
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($q) use ($validated) {
                $q->where('start_time', '<', $validated['end_time'])
                  ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return back()->withErrors([
                'start_time' => 'Jadwal bertabrakan dengan pengajuan yang sudah ada.'
            ])->withInput();
        }

        $validated['user_id']       = $request->user()->id;
        $validated['borrower_name'] = $validated['borrower_name'] ?: $request->user()->name;
        $validated['status']        = 'pending';

        Booking::create($validated);

        return redirect()->route('bookings.index')->with('success', 'Pengajuan berhasil disimpan.');
    }

    public function edit(Booking $booking)
    {
        Gate::authorize('update', $booking);

        $rooms = Room::all();
        return view('bookings.edit', compact('booking', 'rooms'));
    }

    public function update(Request $request, Booking $booking)
    {
        Gate::authorize('update', $booking);

        $validated = $request->validate([
            'room_id'       => 'required|exists:rooms,id',
            'borrower_name' => 'nullable|string|max:150',
            'activity_name' => 'required|string|max:200',
            'booking_date'  => 'required|date',
            'start_time'    => 'required',
            'end_time'      => 'required|after:start_time',
            'participants'  => 'required|integer|min:1',
            'notes'         => 'nullable|string',
        ]);

        $room = Room::findOrFail($validated['room_id']);
        if ($validated['participants'] > $room->capacity) {
            return back()->withErrors([
                'participants' => 'Jumlah peserta melebihi kapasitas ruangan (' . $room->capacity . ' orang).'
            ])->withInput();
        }

        $conflict = Booking::where('room_id', $validated['room_id'])
            ->where('id', '!=', $booking->id)
            ->where('booking_date', $validated['booking_date'])
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($q) use ($validated) {
                $q->where('start_time', '<', $validated['end_time'])
                  ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return back()->withErrors([
                'start_time' => 'Jadwal bertabrakan dengan pengajuan yang sudah ada.'
            ])->withInput();
        }

        $booking->update($validated);

        return redirect()->route('bookings.index')->with('success', 'Pengajuan berhasil diperbarui.');
    }

    public function destroy(Booking $booking)
    {
        Gate::authorize('delete', $booking);
        $booking->delete();

        return redirect()->route('bookings.index')->with('success', 'Pengajuan berhasil dihapus.');
    }

    public function approve(Booking $booking)
    {
        Gate::authorize('review', $booking);
        $booking->update(['status' => 'approved']);

        return back()->with('success', 'Pengajuan disetujui.');
    }

    public function reject(Booking $booking)
    {
        Gate::authorize('review', $booking);
        $booking->update(['status' => 'rejected']);

        return back()->with('success', 'Pengajuan ditolak.');
    }
}
