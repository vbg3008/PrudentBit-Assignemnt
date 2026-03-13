'use client';

import { Check, Stethoscope } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DISEASES = [
  'Fever',
  'Headache',
  'Sore throat',
  'Sprained ankle',
  'Rash',
  'Sinusitis',
  'Ear infection',
  'Stomach ache',
  'Broken arm',
  'Allergic reaction',
];

interface DiseaseFilterDropdownProps {
  value: string;
  onChange: (disease: string) => void;  
  name: string;
}

export function DiseaseFilterDropdown({ value, onChange, name }: DiseaseFilterDropdownProps) {
  const label = value
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-[59px] px-4 flex items-center gap-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[16px] text-gray-700 min-w-[150px] justify-between">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-blue-500 shrink-0" />
          <span className="capitalize truncate max-w-[100px]">{label}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px] max-h-[320px] overflow-y-auto">
        {/* Clear option */}
        <DropdownMenuItem
          onClick={() => onChange('')}
          className="flex items-center justify-between text-gray-400 italic"
        >
          All diseases
          {!value && <Check className="h-4 w-4 text-blue-500" />}
        </DropdownMenuItem>

        <div className="my-1 border-t border-gray-100" />

        {DISEASES.map((disease) => {
          const isActive = value.toLowerCase() === disease.toLowerCase();
          return (
            <DropdownMenuItem
              key={disease}
              onClick={() => onChange(isActive ? '' : disease.toLowerCase())}
              className="flex items-center justify-between"
            >
              <span className={isActive ? 'text-blue-600 font-semibold' : ''}>{disease}</span>
              {isActive && <Check className="h-4 w-4 text-blue-500" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
