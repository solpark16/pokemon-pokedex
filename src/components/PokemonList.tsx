"use client";

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const PokemonList = (): React.JSX.Element => {
  const router = useRouter();
  const {
    data: pokemonList,
    isPending,
    isError,
  } = useQuery<Pokemon[], AxiosError, Pokemon[]>({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/api/pokemons`);
      return data;
    },
    staleTime: 600000,
    gcTime: 600000,
  });

  if (isPending || !pokemonList) {
    return <div className="text-center">Loading . . .</div>;
  }

  return (
    <ul className="grid grid-cols-6 gap-3 p-[30px]">
      {pokemonList.map((pokemon: Pokemon) => {
        return (
          <li
            key={pokemon.id}
            className="text-center cursor-pointer box-border bg-white text-black p-2 rounded-2xl hover:bg-gray-400 transition"
            onClick={() => {
              router.push(`/${pokemon.id}`);
            }}
          >
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
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonList;
