import axios from "axios";
export const fetchAsyncGames = async (page = 1) => {
    const URL_API = `https://api.rawg.io/api/games?key=da3625204a87477ca22170f1f6d85543&page=${page}`;
    const { data } = await axios.get(URL_API);
    return data;
  };
  