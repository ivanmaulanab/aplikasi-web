<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::latest()->get();

        return view('rooms.index', compact('rooms'));
    }

    public function create()
    {
        return view('rooms.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'facilities' => 'nullable|string',
        ]);

        $validated['is_available'] = $request->has('is_available');

        Room::create($validated);

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Ruangan berhasil ditambahkan.');
    }

    public function show(Room $room)
    {
        return view('rooms.show', compact('room'));
    }

    public function edit(Room $room)
    {
        return view('rooms.edit', compact('room'));
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'location' => 'required|string|max:255',
            'facilities' => 'nullable|string',
        ]);

        $validated['is_available'] = $request->has('is_available');

        $room->update($validated);

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Ruangan berhasil diperbarui.');
    }

    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()
            ->route('rooms.index')
            ->with('success', 'Ruangan berhasil dihapus.');
    }
}