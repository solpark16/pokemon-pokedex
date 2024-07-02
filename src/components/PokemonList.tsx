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
    gcTime: 600000,
  });
  console.log(pokemonList);

  if (isPending) {
    return <div>로딩 중</div>;
  }
  return (
    <ul className="grid grid-cols-6 gap-3 p-[30px]">
      {pokemonList.map((pokemon: Pokemon) => {
        return (
          <li
            key={pokemon.id}
            className="text-center box-border bg-white text-black p-2 rounded-2xl"
          >
            <Link className="w-full" href={`/${pokemon.id}`}>
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={pokemon.korean_name}
                className="mx-auto"
              />
              <p className="flex justify-center items-center gap-1">
                <span className="bg-black text-white rounded px-1 text-xs">
                  {String(pokemon.id).padStart(4, "0")}
                </span>{" "}
                <span className="font-bold">{pokemon.korean_name}</span>
              </p>
              {/* <p>도감번호: {pokemon.id}</p> */}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonList;
