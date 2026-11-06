<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function edit(Request \$request)
    {
        return view('dashboard', [
            'total'   => 0,
            'pending' => 0,
            'user'    => \$request->user(),
        ]);
    }

    public function update(Request \$request)
    {
        $validated =$request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $request->user()->update($validated);
        return back()->with('success', 'Profil diperbarui.');
    }

    public function destroy(Request \$request)
    {
        $user =$request->user();
        Auth::logout();
        \$user->delete();
        $request->session()->invalidate();$request->session()->regenerateToken();
        return redirect('/');
    }
}
