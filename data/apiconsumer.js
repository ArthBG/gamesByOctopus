import axios from 'axios';

export const fetchApi = async (page) => {
    const URL_API = `https://api.rawg.io/api/games?key=da3625204a87477ca22170f1f6d85543&page=${page}`;

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
        const resposta = await axios.get(`https://api.rawg.io/api/games/${id}?key=da3625204a87477ca22170f1f6d85543`);
        return resposta.data;
    }

    catch (error) {
        throw error;
    }

}
