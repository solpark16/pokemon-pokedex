"use client";

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const PokemonList = (): React.JSX.Element => {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: pokemonList,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Pokemon[], AxiosError>({
    queryKey: ["pokemonList"],
    queryFn: async ({
      pageParam = 0,
    }: QueryFunctionContext): Promise<Pokemon[]> => {
      const { data } = await axios.get<Pokemon[]>(
        `http://localhost:3000/api/pokemons`,
        {
          params: { offset: pageParam, limit: 48 },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 48) {
        return undefined; // 마지막 페이지에 도달하면 더 이상 요청하지 않음
      }
      return allPages.length * 48; // 다음 페이지의 offset 계산
    },
    staleTime: 600000,
    gcTime: 600000,
    initialPageParam: 0,
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isPending || !pokemonList) {
    return <div className="text-center">포켓몬을 데려오는 중입니다...</div>;
  }

  return (
    <>
      <ul className="grid grid-cols-6 gap-3 p-[30px]">
        {pokemonList.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((pokemon: Pokemon) => {
              return (
                <Link key={pokemon.id} href={`/${pokemon.id}`}>
                  <li
                    key={pokemon.id}
                    className="text-center cursor-pointer box-border bg-white text-black p-2 rounded-2xl hover:bg-gray-400 transition"
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
                      <span className="font-bold">
                        {pokemon.korean_name
                          ? pokemon.korean_name
                          : pokemon.name}
                      </span>
                    </p>
                  </li>
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
      <div className="w-full text-center pb-[30px] " ref={loadMoreRef}>
        {isFetchingNextPage
          ? "더 많은 포켓몬을 데려오는 중입니다..."
          : hasNextPage
          ? "포켓몬을 더 데려올 수 있습니다."
          : "모든 포켓몬을 데려왔습니다!"}
      </div>
    </>
  );
};

export default PokemonList;
