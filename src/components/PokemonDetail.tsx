import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonDetail = ({
  pokemon,
}: {
  pokemon: Pokemon;
}): React.JSX.Element => {
  return (
    <div className="w-[800px] mx-auto p-8 bg-white text-black text-center rounded-2xl my-8 flex gap-3 flex-col items-center">
      <div className="text-center">
        <h2 className="text-4xl	font-extrabold mb-2">{pokemon.korean_name}</h2>
        <p className="bg-black text-white rounded px-1 w-fit mx-auto">
          {String(pokemon.id).padStart(4, "0")}
        </p>
      </div>
      <Image
        src={pokemon.sprites.front_default}
        width={200}
        height={200}
        alt={pokemon.korean_name}
        className="mx-auto"
      />
      <p>
        키: {pokemon.height / 10}m 무게: {pokemon.weight / 10}kg
      </p>
      <div className="flex justify-center gap-3">
        <p className="flex gap-2">
          타입:
          {pokemon.types.map((type) => {
            return (
              <span
                key={type.type.korean_name}
                className="bg-orange-600 text-white rounded px-1 w-fit"
              >
                {type.type.korean_name}
              </span>
            );
          })}
        </p>
        <p className="flex gap-2">
          특성:
          {pokemon.abilities.map((ability) => {
            return (
              <span
                key={ability.ability.korean_name}
                className="bg-green-600 text-white rounded px-1 w-fit"
              >
                {ability.ability.korean_name}
              </span>
            );
          })}
        </p>
      </div>
      <p className="break-keep	">
        기술:
        <br />
        {pokemon.moves.map((move) => {
          return <>{move.move.korean_name} </>;
        })}
      </p>

      <Link className="w-fit" href={"/"}>
        <button className="bg-blue-600 p-3 text-white rounded-2xl w-fit">
          뒤로 가기
        </button>
      </Link>
    </div>
  );
};

export default PokemonDetail;
