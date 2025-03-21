"use client";
import { useState, useEffect } from "react";
import { getPokemon } from "./services/pokeapi";
import PokemonCard from "./components/PokemonCard";
import axios from "axios";

export default function Home() {
  const TOTAL_POKEMON = 1010;
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [pokemonId, setPokemonId] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<{ name: string; id: number }[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<{ name: string; id: number }[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1010");
      setPokemonList(res.data.results.map((p: any, index: number) => ({
        name: p.name,
        id: index + 1
      })));
    };
    fetchPokemonList();
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [pokemonId]);

  const fetchPokemon = async () => {
    const data = await getPokemon(pokemonId.toString());
    if (data) {
      setPokemon(data);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (!value) {
      setFilteredPokemon([]);
    } else if (isNaN(Number(value))) {
      setFilteredPokemon(pokemonList.filter((p) => p.name.startsWith(value)));
    } else {
      setFilteredPokemon([]);
    }
  };

  const handleSearchSelect = async (name: string) => {
    const data = await getPokemon(name);
    if (data) {
      setPokemonId(data.id);
      setSearch("");
      setFilteredPokemon([]);
    }
  };

  const handleSearchClick = async () => {
    if (!search) return;
    if (!isNaN(Number(search))) {
      setPokemonId(Number(search));
    } else {
      const data = await getPokemon(search.toLowerCase());
      if (data) setPokemonId(data.id);
    }
    setSearch("");
    setFilteredPokemon([]);
  };

  const nextPokemon = () => {
    setPokemonId((prev) => (prev % TOTAL_POKEMON) + 1);
  };

  const prevPokemon = () => {
    setPokemonId((prev) => (prev === 1 ? TOTAL_POKEMON : prev - 1));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-red-300 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl border-4 border-black w-[90%] max-w-md relative">
        <h1 className="text-3xl font-bold text-center mb-4">Pokédex</h1>
        
        {/* Input de búsqueda con botón y autocompletado */}
        <div className="relative w-full flex">
          <input
            type="text"
            placeholder="Nombre o ID"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 p-2 text-white rounded-l-md focus:outline-neutral-900"
          />
          <button 
            onClick={handleSearchClick} 
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-r-md"
          >
            🔍
          </button>
          {/* Lista de sugerencias con imágenes */}
          {filteredPokemon.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white text-black mt-1 rounded-md shadow-md max-h-40 overflow-y-auto">
              {filteredPokemon.map((p) => (
                <li 
                  key={p.id} 
                  onClick={() => handleSearchSelect(p.name)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-300 cursor-pointer"
                >
                  <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} 
                    alt={p.name} 
                    className="w-10 h-10"
                  />
                  <span className="capitalize">{p.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tarjeta de Pokémon */}
        <div className="mt-6">
          {pokemon && <PokemonCard pokemon={pokemon} />}
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-between mt-4">
          <button 
            onClick={prevPokemon} 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-lg"
          >
            ◀
          </button>
          <button 
            onClick={nextPokemon} 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-lg"
          >
            ▶
          </button>
        </div>
      </div>
    </main>
  );
}
