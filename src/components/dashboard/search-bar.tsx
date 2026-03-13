import { Search, ListFilter } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 300);
  const onChangeRef = useRef(onChange);
  useLayoutEffect(() => { onChangeRef.current = onChange; });

  // Sync internal state when an external reset occurs (e.g. chip removal)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Push debounced value up — depends only on debouncedValue to avoid
  // a race condition where the old debounced term would overwrite an external clear.
  useEffect(() => {
    onChangeRef.current(debouncedValue);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className="relative w-full group">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 h-[56px] rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-all text-[16px]"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        <ListFilter  className="h-5 w-5 text-blue-400 cursor-pointer hover:text-gray-600" />
      </div>
    </div>
  );
}

