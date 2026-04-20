<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::latest()->get();
        return view('patient.index', compact('patients'));
    }

    public function create()
    {
        return view('patient.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'        => 'required|string|max:255',
            'last_name'         => 'required|string|max:255',
            'age'               => 'required|integer|min:0|max:150',
            'gender'            => 'required|in:Male,Female',
            'blood_type'        => 'nullable|string|max:5',
            'phone'             => 'required|string|max:20',
            'email'             => 'nullable|email|max:255',
            'address'           => 'nullable|string|max:500',
            'emergency_contact' => 'nullable|string|max:255',
        ]);

        Patient::create($validated);

        return redirect()->route('patients.index')
                         ->with('success', 'Patient added successfully.');
    }

    public function show(string $id)
    {
        $patient = Patient::findOrFail($id);
        return view('patients.show', compact('patient'));
    }

    public function edit(string $id)
    {
        $patient = Patient::findOrFail($id);
        return view('patients.edit', compact('patient'));
    }

    public function update(Request $request, string $id)
    {
        $patient = Patient::findOrFail($id);

        $validated = $request->validate([
            'first_name'        => 'required|string|max:255',
            'last_name'         => 'required|string|max:255',
            'age'               => 'required|integer|min:0|max:150',
            'gender'            => 'required|in:Male,Female',
            'blood_type'        => 'nullable|string|max:5',
            'phone'             => 'required|string|max:20',
            'email'             => 'nullable|email|max:255',
            'address'           => 'nullable|string|max:500',
            'emergency_contact' => 'nullable|string|max:255',
        ]);

        $patient->update($validated);

        return redirect()->route('patients.index')
                         ->with('success', 'Patient updated successfully.');
    }

    public function destroy(string $id)
    {
        Patient::findOrFail($id)->delete();

        return redirect()->route('patients.index')
                         ->with('success', 'Patient deleted successfully.');
    }
}