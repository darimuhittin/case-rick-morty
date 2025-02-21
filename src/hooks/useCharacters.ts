import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getCharacters } from '@/services/rick-morty';
import type { CharacterFilters, CharacterResponse } from '@/types/rick-morty';

export function useCharacters(
  filters: CharacterFilters,
  initialData?: CharacterResponse
) {
  const queryOptions: UseQueryOptions<CharacterResponse> = {
    queryKey: ['characters', filters.status, filters.gender, filters.page],
    queryFn: () => getCharacters(filters),
    staleTime: 0
    
  };

  if (initialData) {
    queryOptions.initialData = initialData;
  }

  return useQuery<CharacterResponse>(queryOptions);
} 