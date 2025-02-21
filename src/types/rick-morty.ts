export type Character = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type CharacterFilters = {
  status: 'alive' | 'dead' | 'unknown' | undefined;
  gender: 'female' | 'male' | 'genderless' | 'unknown' | undefined;
  page: number | undefined;
};

export type SearchParams = {
  status?: string;
  gender?: string;
  page?: string;
};

export const isValidStatus = (status: string | undefined): status is CharacterFilters['status'] => {
  return !status || ['alive', 'dead', 'unknown'].includes(status.toLowerCase());
};

export const isValidGender = (gender: string | undefined): gender is CharacterFilters['gender'] => {
  return !gender || ['female', 'male', 'genderless', 'unknown'].includes(gender.toLowerCase());
};

export const isValidPage = (page: string | undefined): boolean => {
  if (!page) return true;
  const pageNum = parseInt(page);
  return !isNaN(pageNum) && pageNum > 0;
};

export const parseSearchParams = async (params: Promise<SearchParams>): Promise<CharacterFilters> => {
  const resolvedParams = await params;
  
  // Handle each parameter individually to avoid multiple accesses
  const statusParam = resolvedParams?.status;
  const genderParam = resolvedParams?.gender;
  const pageParam = resolvedParams?.page;

  return {
    status: statusParam && isValidStatus(statusParam) ? statusParam.toLowerCase() as CharacterFilters['status'] : undefined,
    gender: genderParam && isValidGender(genderParam) ? genderParam.toLowerCase() as CharacterFilters['gender'] : undefined,
    page: pageParam && isValidPage(pageParam) ? parseInt(pageParam) : 1,
  };
}; 