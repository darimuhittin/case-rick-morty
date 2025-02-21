'use client';

import { CharacterCard } from "@/components/character-card";
import { CharacterFilters } from "@/components/character-filters";
import { CharacterPagination } from "@/components/character-pagination";
import { useCharacters } from "@/hooks/useCharacters";
import type { Character, CharacterFilters as Filters, CharacterResponse } from "@/types/rick-morty";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";

interface CharacterListProps {
  initialData: CharacterResponse;
  initialFilters: Filters;
}

export function CharacterList({ initialData, initialFilters }: CharacterListProps) {
  const pathname = usePathname();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  
  const { data, isLoading, isError } = useCharacters(filters, initialData);

  const handleFilterChange = (key: keyof Filters, value: string | undefined) => {
    let newValue = value;
    if (value && value !== 'all') {
      newValue = value.toLowerCase();
    }

    const params = new URLSearchParams(window.location.search);
    
    // Update or remove the changed parameter
    if (newValue && newValue !== 'all') {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }

    // Reset page when filters change (but not when changing page)
    if (key !== 'page') {
      params.set('page', '1');
    }

    window.history.pushState({}, '', `${pathname}?${params.toString()}`);

    // Update local state
    setFilters(prev => ({
      ...prev,
      [key]: newValue === 'all' ? undefined : newValue,
      page: key !== 'page' ? 1 : newValue ? Number(newValue) : undefined
    }));
  };

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading characters. Please try again.
      </div>
    );
  }

  const { results: characters, info } = data || initialData;

  return (
    <>
      <Suspense fallback={<div>Loading filters...</div>}>
        <CharacterFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
        />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-[300px]" />
          ))
        ) : (
          characters.map((character: Character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Suspense fallback={<div>Loading pagination...</div>}>
          <CharacterPagination 
            page={filters.page || 1} 
            totalPages={info.pages} 
            onPageChange={(page) => handleFilterChange('page', page.toString())}
          />
        </Suspense>
      </div>
    </>
  );
} 