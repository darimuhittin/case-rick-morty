import { CharacterList } from "@/components/character-list";
import { getCharacters } from "@/services/rick-morty";
import type { SearchParams, CharacterFilters } from "@/types/rick-morty";

interface PageProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: PageProps) {
  const { status, gender, page } = await searchParams;
  // Handle searchParams properly with type checking
  const filters: CharacterFilters = {
    status: status as CharacterFilters['status'],
    gender: gender as CharacterFilters['gender'],
    page: page as CharacterFilters['page'],
  };

  const initialData = await getCharacters(filters);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Rick and Morty Characters</h1>
      <CharacterList initialData={initialData} initialFilters={filters} />
    </main>
  );
}
