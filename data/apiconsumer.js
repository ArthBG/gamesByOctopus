import axios from 'axios';
import { API_KEY } from './APIKEY';

export const fetchApi = async (page) => {
    const URL_API = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;

    try {
        const resposta = await axios.get(URL_API);
        return resposta.data.results;
    }

    catch (error) {
        throw error;
    }
}

export const fetchApiDetails = async (id) => {
    try {
        const resposta = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        return resposta.data;
    }

    catch (error) {
        throw error;
    }

}