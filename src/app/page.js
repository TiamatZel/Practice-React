import Image from "next/image";
import PokemonCard from "./PokemonCard";

async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await response.json();
  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );
  return detailedPokemon;
}

export default async function Pokedex() {
  const pokemonList = await getPokemonList();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}