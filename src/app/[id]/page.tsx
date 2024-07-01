import PokemonDetail from "@/components/PokemonDetail";
import React from "react";

const PokemonDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PokemonDetail id={id} />
    </div>
  );
};

export default PokemonDetailPage;
