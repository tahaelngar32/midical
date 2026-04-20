<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Prescription;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PrescriptionController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('q', ''));
        $status = (string) $request->query('status', 'all');

        $prescriptions = Prescription::with('patient')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('medication', 'like', '%' . $search . '%')
                        ->orWhereHas('patient', function ($patientQuery) use ($search) {
                            $patientQuery->whereRaw("CONCAT(first_name, ' ', last_name) like ?", ['%' . $search . '%']);
                        });
                });
            })
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $stats = [
            'total' => Prescription::count(),
            'pending' => Prescription::where('status', 'pending')->count(),
            'filled_today' => Prescription::where('status', 'filled')
                ->whereDate('updated_at', today())
                ->count(),
            'expiring_soon' => Prescription::whereNotNull('expires_at')
                ->whereBetween('expires_at', [today(), today()->addDays(7)])
                ->count(),
        ];

        $patients = Patient::orderBy('first_name')->orderBy('last_name')->get();

        return view('prescription.index', compact('prescriptions', 'patients', 'stats', 'search', 'status'));
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'medication' => 'required|string|max:255',
            'dosage' => 'nullable|string|max:255',
            'frequency' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'quantity' => 'nullable|string|max:255',
            'refills' => 'nullable|integer|min:0|max:20',
            'instructions' => 'nullable|string|max:2000',
        ]);

        $durationDays = $this->extractDays($data['duration'] ?? null);

        Prescription::create([
            'patient_id' => $data['patient_id'],
            'medication' => $data['medication'],
            'dosage' => $data['dosage'] ?? null,
            'frequency' => $data['frequency'] ?? null,
            'duration' => $data['duration'] ?? null,
            'quantity' => $data['quantity'] ?? null,
            'refills' => $data['refills'] ?? 0,
            'instructions' => $data['instructions'] ?? null,
            'status' => 'pending',
            'prescribed_at' => today(),
            'expires_at' => $durationDays ? today()->copy()->addDays($durationDays) : null,
        ]);

        return redirect()
            ->route('prescriptions.index')
            ->with('success', 'Prescription added successfully.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $prescription = Prescription::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'medication' => 'required|string|max:255',
            'dosage' => 'nullable|string|max:255',
            'frequency' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'quantity' => 'nullable|string|max:255',
            'refills' => 'nullable|integer|min:0|max:20',
            'instructions' => 'nullable|string|max:2000',
            'status' => 'required|in:pending,filled,cancelled',
        ]);

        $durationDays = $this->extractDays($data['duration'] ?? null);

        $prescription->update([
            'patient_id' => $data['patient_id'],
            'medication' => $data['medication'],
            'dosage' => $data['dosage'] ?? null,
            'frequency' => $data['frequency'] ?? null,
            'duration' => $data['duration'] ?? null,
            'quantity' => $data['quantity'] ?? null,
            'refills' => $data['refills'] ?? 0,
            'instructions' => $data['instructions'] ?? null,
            'status' => $data['status'],
            'expires_at' => $durationDays ? today()->copy()->addDays($durationDays) : null,
        ]);

        return redirect()
            ->route('prescriptions.index')
            ->with('success', 'Prescription updated successfully.');
    }

    public function updateStatus(Request $request, int $id): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:pending,filled,cancelled',
        ]);

        $prescription = Prescription::findOrFail($id);
        $prescription->update([
            'status' => $data['status'],
        ]);

        return redirect()
            ->route('prescriptions.index')
            ->with('success', 'Prescription status updated successfully.');
    }

    public function download(int $id)
    {
        $prescription = Prescription::with('patient')->findOrFail($id);
        $patient = $prescription->patient;
        $patientName = trim(($patient->first_name ?? '') . ' ' . ($patient->last_name ?? '')) ?: 'Unknown Patient';

        $fileName = 'prescription-' . $prescription->id . '.pdf';

        $html = view('prescription.pdf', [
            'prescription' => $prescription,
            'patientName' => $patientName,
        ])->render();

        if (app()->bound('dompdf.wrapper')) {
            $pdf = app('dompdf.wrapper');
            $pdf->loadHTML($html);
            $pdf->setPaper('a4', 'portrait');

            return $pdf->download($fileName);
        }

        return response($html, 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
        ]);
    }

    public function destroy(int $id): RedirectResponse
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();

        return redirect()
            ->route('prescriptions.index')
            ->with('success', 'Prescription deleted successfully.');
    }

    private function extractDays(?string $duration): ?int
    {
        if (!$duration) {
            return null;
        }

        if (!preg_match('/(\d+)/', $duration, $matches)) {
            return null;
        }

        $days = (int) $matches[1];
        return $days > 0 ? $days : null;
    }
}
