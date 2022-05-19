import axios from "axios";

const _apiBase = "http://localhost:3001";

const getPostAPI = async () => {
    const response = await axios.get(`${_apiBase}/`);
    return response;
}

export {getPostAPI}