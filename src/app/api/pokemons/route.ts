import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

const TOTAL_POKEMON = 1025;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "48", 10);

  try {
    const allPokemonPromises = Array.from({ length: limit }, (_, index) => {
      const id = offset + index + 1;
      if (id <= TOTAL_POKEMON) {
        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      } else {
        return null;
      }
    }).filter(Boolean) as Promise<[AxiosResponse, AxiosResponse]>[];

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );
    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
