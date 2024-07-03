import PokemonDetail from "@/components/PokemonDetail";
import axios from "axios";
import React from "react";

import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

// 메타 데이터 설정
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { data: pokemon } = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );
  return {
    title: `${pokemon.korean_name} | Pokédex`,
  };
}

const PokemonDetailPage = async ({
  params,
}: Props): Promise<React.JSX.Element> => {
  const { id } = params;
  const { data: pokemon } = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );

  return (
    <div>
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetailPage;
