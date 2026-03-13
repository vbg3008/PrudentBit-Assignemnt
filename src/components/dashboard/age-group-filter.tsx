'use client';

import { Check, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AGE_GROUPS = [
  { label: 'Child (0-12)', value: '0-12' },
  { label: 'Teen (13-19)', value: '13-19' },
  { label: 'Adult (20-59)', value: '20-59' },
  { label: 'Senior (60+)', value: '60-120' },
];

interface AgeGroupFilterProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function AgeGroupFilter({ value, onChange, name }: AgeGroupFilterProps) {
  const currentGroup = AGE_GROUPS.find(g => g.value === value);
  const label = currentGroup ? currentGroup.label : name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-[59px] px-4 flex items-center gap-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[16px] text-gray-700 min-w-[150px] justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500 shrink-0" />
          <span className="capitalize truncate max-w-[100px]">{label}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem
          onClick={() => onChange('')}
          className="flex items-center justify-between text-gray-400 italic"
        >
          All ages
          {!value && <Check className="h-4 w-4 text-blue-500" />}
        </DropdownMenuItem>

        <div className="my-1 border-t border-gray-100" />

        {AGE_GROUPS.map((group) => {
          const isActive = value === group.value;
          return (
            <DropdownMenuItem
              key={group.value}
              onClick={() => onChange(isActive ? '' : group.value)}
              className="flex items-center justify-between"
            >
              <span className={isActive ? 'text-blue-600 font-semibold' : ''}>{group.label}</span>
              {isActive && <Check className="h-4 w-4 text-blue-500" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
