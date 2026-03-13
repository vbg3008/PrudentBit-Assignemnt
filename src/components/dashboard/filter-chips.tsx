'use client';

import { X } from 'lucide-react';

export interface FilterChip {
  label: string;
  value: string;
  type: string;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onRemove: (type: string) => void;
}

export function FilterChips({ filters, onRemove }: FilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <div
          key={`${filter.type}-${filter.value}`}
          className="flex items-center gap-1.5 pl-3 pr-2 py-1 border border-gray-300 rounded-full bg-white text-[13px] text-gray-700"
        >
          <span className="font-medium text-gray-500">{filter.label}:</span>
          <span>{filter.value}</span>
          <button
            onClick={() => onRemove(filter.type)}
            className="ml-0.5 rounded-full hover:text-red-500 hover:bg-red-50 p-0.5 transition-colors"
            title={`Remove ${filter.label} filter`}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
