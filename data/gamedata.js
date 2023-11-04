import axios from "axios";
import { API_KEY } from "../data/APIKEY";
export const fetchAsyncGames = async (page = 1) => {
    const URL_API = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;
    const { data } = await axios.get(URL_API);
    return data;
  };
  