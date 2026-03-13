'use client';

import { Patient } from '@/types/schema';
import { PatientRow } from './patient-row';
import { Skeleton } from '@/components/ui/skeleton';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
  loading: boolean;
  error?: string | null;
}

export function PatientTable({ patients, loading, error }: PatientTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: patients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56, 
    overscan: 10,
  });

  if (loading && patients.length === 0) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-500 border border-red-100 rounded-lg bg-red-50">
        <AlertCircle className="h-8 w-8" />
        <p className="text-[15px] font-medium">Failed to load patients</p>
        <p className="text-[13px] text-red-400">{error}</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-white border">No patients found.</div>;
  }

  return (
    <div className="bg-white overflow-hidden flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="grid grid-cols-[100px_1.5fr_80px_1fr_2fr_1.2fr_1.8fr_40px] items-center border-b border-gray-200 px-6 h-[56px] text-[16px] font-bold text-[#3B82F6] z-20">
        <div className="pr-2">ID</div>
        <div className="pr-2">Name</div>
        <div className="pr-2">Age</div>
        <div className="pr-2">Medical Issue</div>
        <div className="pr-2">Address</div>
        <div className="pr-2 flex items-center gap-1">
          Phone Number
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
        </div>
        <div className="pr-2">Email ID</div>
        <div></div>
      </div>

      {/* Virtualized Body */}
      <div 
        ref={parentRef} 
        className="flex-1 overflow-auto relative scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const patient = patients[virtualRow.index];
            return (
              <PatientRow
                key={virtualRow.key}
                patient={patient}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="grid grid-cols-[120px_1.5fr_0.5fr_1fr_2fr_1.2fr_1.8fr_40px] items-center bg-white border-b px-6 py-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-16" />
        ))}
      </div>
      <div className="divide-y divide-slate-50">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[120px_1.5fr_0.5fr_1fr_2fr_1.2fr_1.8fr_40px] items-center px-6 py-5">
            <Skeleton className="h-4 w-12" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-4 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

