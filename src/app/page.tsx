import PokemonList from "@/components/PokemonList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-w-[900px] max-w-[1400px] mx-auto ">
      <h1 className="p-8 text-center text-7xl	font-bold">
        <span className="text-red-600">P</span>okédex
      </h1>
      <PokemonList />
    </div>
  );
}
