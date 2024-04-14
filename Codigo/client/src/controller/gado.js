import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL_PROD}/gado`

async function getAll() {
    const response = await axios.get(`${APIURL}/`);
    return response.data;
}

function createGado(gado) {
    return axios.post(`${APIURL}/gestacoes`, gado);
}

function updateGado(gado) {
    return axios.put(`${APIURL}/gestacoes/${gado.id}`, gado);
}

async function getBase() {
    const response = await axios.get(`${APIURL}/base`);
    return response.data;
}

export default {
    getAll,
    getBase,
};
