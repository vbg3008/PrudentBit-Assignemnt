'use client';

import { Patient } from '@/types/schema';
import { PatientCard } from './patient-card';
import { AlertCircle } from 'lucide-react';

interface PatientGridProps {
  patients: Patient[];
  loading: boolean;
  error?: string | null;
}

export function PatientGrid({ patients, loading, error }: PatientGridProps) {
  if (loading && patients.length === 0) {
    return <GridSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p className="text-[15px] font-medium">Failed to load patients</p>
        <p className="text-[13px] text-red-400">{error}</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border border-gray-100 rounded-lg">
        No patients found.
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="region"
      aria-label="Patient Directory Grid"
    >
      {patients.map((patient) => (
        <PatientCard key={patient.patient_id} patient={patient} />
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden animate-pulse"
          style={{ minHeight: '260px' }}
        >
          <div className="h-[80px]" style={{ background: '#B5D1FE' }}>
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="h-12 w-12 rounded-full bg-blue-200/60" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-blue-200/60 rounded w-3/4" />
                <div className="h-3 bg-blue-200/60 rounded w-1/3" />
              </div>
            </div>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div className="h-5 bg-gray-100 rounded w-1/3" />
            <div className="space-y-2.5">
              <div className="h-3.5 bg-gray-100 rounded w-3/4" />
              <div className="h-3.5 bg-gray-100 rounded w-1/2" />
              <div className="h-3.5 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
