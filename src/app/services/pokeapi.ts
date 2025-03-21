import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemon = async (nameOrId: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};
