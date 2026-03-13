'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterPanelProps {
  value: string;
  onChange: (value: string) => void;
  issues: string[];
}

export function FilterPanel({ value, onChange, issues }: FilterPanelProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter by Issue:</span>
      <Select value={value || 'all'} onValueChange={(val: string | null) => onChange(val === 'all' || val === null ? '' : val)}>
        <SelectTrigger className="w-[180px] h-10">
          <SelectValue placeholder="All Issues" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Issues</SelectItem>
          {issues.map((issue) => (
            <SelectItem key={issue} value={issue}>
              {issue.charAt(0).toUpperCase() + issue.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
