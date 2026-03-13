'use client';

import { Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortDropdownProps {
  sortField: string;
  sortOrder: 'asc' | 'desc';
  onChange: (field: string, order: 'asc' | 'desc') => void;
  name?: string;
}

const SORT_OPTIONS = [
  { label: 'Name (A-Z)', field: 'name', order: 'asc' as const },
  { label: 'Name (Z-A)', field: 'name', order: 'desc' as const },
  { label: 'Age (Youngest)', field: 'age', order: 'asc' as const },
  { label: 'Age (Oldest)', field: 'age', order: 'desc' as const },
  { label: 'ID (Low-High)', field: 'id', order: 'asc' as const },
  { label: 'ID (High-Low)', field: 'id', order: 'desc' as const },
];

export function SortDropdown({ sortField, sortOrder, onChange, name }: SortDropdownProps) {
  const currentOption = SORT_OPTIONS.find(opt => opt.field === sortField && opt.order === sortOrder);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-[59px] px-4 flex items-center gap-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[16px] text-gray-700 min-w-[120px] justify-between">
          <span className="capitalize">{name || currentOption?.label || 'Sort'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={`${option.field}-${option.order}`}
            onClick={() => onChange(option.field, option.order)}
            className="flex items-center justify-between"
          >
            {option.label}
            {option.field === sortField && option.order === sortOrder && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
