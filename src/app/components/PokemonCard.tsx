import Image from "next/image";

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    weight: number;
    height: number;
  };
}

const typeColors: { [key: string]: string } = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  ice: "bg-cyan-500",
  fighting: "bg-orange-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-600",
  rock: "bg-gray-700",
  ghost: "bg-violet-700",
  dragon: "bg-indigo-800",
  dark: "bg-gray-900",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border-4 border-black text-center text-white">
      {/* Nombre y número */}
      <h2 className="text-xl font-bold capitalize">
        #{pokemon.id} {pokemon.name}
      </h2>

      {/* Imagen del Pokémon */}
      <div className="bg-gray-700 p-2 rounded-lg mt-2">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>

      {/* Tipos con colores */}
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((t, i) => (
          <span key={i} className={`px-3 py-1 rounded text-white ${typeColors[t.type.name] || "bg-gray-500"}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Peso y altura */}
      <p className="mt-2 text-gray-300">Peso: {pokemon.weight / 10} kg</p>
      <p className="text-gray-300">Altura: {pokemon.height / 10} m</p>
    </div>
  );
};

export default PokemonCard;
