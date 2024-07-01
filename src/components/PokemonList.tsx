"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonList = () => {
  const queryClient = useQueryClient();

  const {
    data: pokemonList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/api/pokemons`);
      return data;
    },
    staleTime: 600000,
  });
  console.log(pokemonList);

  if (isPending) {
    return <div>로딩 중</div>;
  }
  return (
    <ul>
      {pokemonList.map((pokemon: Pokemon) => {
        return (
          <Link key={pokemon.id} href={`/${pokemon.id}`}>
            <li>
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={pokemon.korean_name}
              />
              <p>{pokemon.korean_name}</p>
              <p>도감번호: {pokemon.id}</p>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default PokemonList;
