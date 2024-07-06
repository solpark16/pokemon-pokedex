"use client";

import { Pokemon } from "@/types/pokemon";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const PokemonList = (): React.JSX.Element => {
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
      const { data } = await axios.get<Pokemon[]>(`/api/pokemons`, {
        params: { offset: pageParam, limit: 48 },
      });
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
    // IntersectionObserver는 특정 요소가 뷰포트 내에 들어왔는지 감시하는 객체.
    // entries는 마시하고 있는 요소들의 배열.
    // isIntersecting 속성은 요소가 뷰포트에 들어왔는지를 나타낸다.
    // hasNextPage를 통해 다음 페이지 존재 여부를 나타내고, 두 조건이 충족되었다면 fetchNextPage를 통해 다음 페이지의 데이터를 불러온다.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      // 요소가 100% 뷰포트에 들어왔을 때 콜백이 실행되도록 한다.
      { threshold: 1.0 }
    );

    // 검사할 요소 설정. loadMoreRef는 무한 스크롤의 트리거가 되는 DOM 요소를 가리킨다.
    if (loadMoreRef.current) {
      // 해당 요소가 뷰포트에 들어오는지를 감시하도록 설정한다.
      observer.observe(loadMoreRef.current);
    }

    // 클린 업 함수. 컴포넌트가 언마운트되거나 useEffect가 다시 호출될 때 감시를 중지한다.
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isPending || !pokemonList) {
    return (
      <div className="text-center mt-9">
        <Image
          src="/images/mew.gif"
          alt="loading-mew"
          width={300}
          height={300}
          className="mx-auto"
        />
        <p className="text-3xl mt-5">포켓몬을 데려오는 중입니다...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-9">
        <p className="text-3xl mt-5">
          포켓몬을 데려오는 동안 오류가 발생했습니다.
        </p>
      </div>
    );
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
                    {/* Image 태그 vercel 내 최적화 제한 초과로 img 태그로 변경했습니다.  */}
                    <img
                      src={pokemon.sprites.front_default}
                      width={100}
                      height={100}
                      alt={pokemon.korean_name}
                      className="mx-auto"
                    />
                    {/* <Image
                      src={pokemon.sprites.front_default}
                      width={100}
                      height={100}
                      alt={pokemon.korean_name}
                      className="mx-auto"
                    /> */}
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
