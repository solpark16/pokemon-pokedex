import PokemonDetail from "@/components/PokemonDetail";
import axios from "axios";
import React from "react";

const PokemonDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: pokemon } = await axios.get(
    `http://localhost:3000/api/pokemons/${id}`
  );

  return (
    <div>
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetailPage;
