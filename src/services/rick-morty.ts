import { CharacterFilters, CharacterResponse } from '@/types/rick-morty';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (filters: CharacterFilters): Promise<CharacterResponse> => {
  const searchParams = new URLSearchParams();
  
  if (filters.status) {
    searchParams.append('status', filters.status);
  }
  if (filters.gender) {
    searchParams.append('gender', filters.gender);
  }
  if (filters.page) {
    searchParams.append('page', filters.page.toString());
  }

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/character${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch characters: ${response.status} ${response.statusText}${
          errorData.error ? ` - ${errorData.error}` : ''
        }`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch characters');
  }
}; 