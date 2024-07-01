import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Type = {
  type: {
    korean_name: string;
  };
};

type Ability = {
  ability: {
    korean_name: string;
  };
};

type Move = {
  move: {
    korean_name: string;
  };
};

const PokemonDetail = async ({ id }: { id: string }) => {
  console.log(id);
  const { data: pokemon } = await axios.get(
    `http://localhost:3000/api/pokemons/${id}`
  );
  console.log(pokemon.types);
  return (
    <div>
      <div>
        <h2>{pokemon.korean_name}</h2>
        <p>No.{pokemon.id}</p>
      </div>
      <Image
        src={pokemon.sprites.front_default}
        width={100}
        height={100}
        alt={pokemon.korean_name}
      />
      <p>이름: {pokemon.korean_name}</p>
      <p>
        키: {pokemon.height / 10}m 무게: {pokemon.weight / 10}kg
      </p>
      <p>
        타입:
        {pokemon.types.map((type: Type) => {
          return <span>{type.type.korean_name}</span>;
        })}
      </p>
      <p>
        특성:
        {pokemon.abilities.map((ability: Ability) => {
          return <span>{ability.ability.korean_name}</span>;
        })}
      </p>
      <p>
        기술:{" "}
        {pokemon.moves.map((move: Move) => {
          return <span>{move.move.korean_name}</span>;
        })}
      </p>

      <Link href={"/"}>
        <button>뒤로 가기</button>
      </Link>
    </div>
  );
};

export default PokemonDetail;
