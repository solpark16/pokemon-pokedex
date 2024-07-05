import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonDetail = ({
  pokemon,
}: {
  pokemon: Pokemon;
}): React.JSX.Element => {
  const pokemonTypes: { [key: string]: string } = {
    grass: "bg-[#66a945]",
    poison: "bg-[#735198]",
    fire: "bg-[#e56c3e]",
    water: "bg-[#5185c5]",
    normal: "bg-[#949495]",
    flying: "bg-[#a2c3e7]",
    bug: "bg-[#9fa244]",
    ground: "bg-[#9c7743]",
    fairy: "bg-[#dab4d4]",
    psychic: "bg-[#dd6b7b]",
    fighting: "bg-[#e09c40]",
    rock: "bg-[#bfb889]",
    ghost: "bg-[#684870]",
    steel: "bg-[#69a9c7]",
    electric: "bg-[#fbb917]",
    ice: "bg-[#6dc8eb]",
    dragon: "bg-[#535ca8]",
    dark: "bg-[#4c4948]",
  };
  return (
    <div className="w-[800px] mx-auto p-8 bg-white text-black text-center rounded-2xl my-8 flex gap-3 flex-col items-center">
      <div className="text-center">
        <h2 className="text-4xl	font-extrabold mb-2">{pokemon.korean_name}</h2>
        <p className="bg-black text-white rounded px-1 w-fit mx-auto">
          {String(pokemon.id).padStart(4, "0")}
        </p>
      </div>
      {/* Image 태그 vercel 내 최적화 제한 초과로 img 태그로 변경했습니다.  */}
      <img
        src={pokemon.sprites.front_default}
        width={200}
        height={200}
        alt={pokemon.korean_name}
        className="mx-auto"
      />
      {/* <Image
        src={pokemon.sprites.front_default}
        width={200}
        height={200}
        alt={pokemon.korean_name}
        className="mx-auto"
      /> */}
      <p>
        키: {pokemon.height / 10}m 무게: {pokemon.weight / 10}kg
      </p>
      <div className="flex justify-center gap-3">
        <p className="flex gap-2">
          타입:
          {pokemon.types.map((type) => {
            return (
              <span
                key={type.type.name}
                className={`${
                  pokemonTypes[type.type.name]
                } text-white rounded px-1 w-fit`}
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
                key={ability.ability.name}
                className="bg-green-600 text-white rounded px-1 w-fit"
              >
                {ability.ability.korean_name}
              </span>
            );
          })}
        </p>
      </div>
      <p className="break-keep">
        기술:
        <br />
        {pokemon.moves.map((move) => {
          return <span key={move.move.name}>{move.move.korean_name} </span>;
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
