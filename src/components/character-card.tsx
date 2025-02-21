'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Character } from "@/types/rick-morty";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const statusColor = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  }[character.status];

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{character.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${statusColor}`} />
            <span className="text-sm text-muted-foreground">
              {character.status} - {character.species}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last known location:</p>
            <p className="text-sm line-clamp-1">{character.location.name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{character.gender}</Badge>
            {character.type && (
              <Badge variant="outline">{character.type}</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 