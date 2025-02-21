'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CharacterFilters as Filters } from "@/types/rick-morty";

interface CharacterFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | undefined) => void;
}

export function CharacterFilters({ filters, onFilterChange }: CharacterFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4">
      <Select
        value={filters.status ?? 'all'}
        onValueChange={(value) => onFilterChange('status', value === 'all' ? undefined : value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.gender ?? 'all'}
        onValueChange={(value) => onFilterChange('gender', value === 'all' ? undefined : value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="genderless">Genderless</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 