import PokemonList from "@/components/PokemonList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>포켓몬 도감</h1>
      <PokemonList />
    </div>
  );
}
