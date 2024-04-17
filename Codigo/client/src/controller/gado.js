import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/gado` || "http://localhost:3002/gado";

async function getAll() {
    const response = await axios.get(`${APIURL}/`);
    return response.data;
}

function createGado(gado) {
    return axios.post(`${APIURL}/animals`, gado);
}

function updateGado(gado) {
    return axios.put(`${APIURL}/animals/${gado.id}`, gado);
}

async function getBase() {
    const response = await axios.get(`${APIURL}/base`);
    return response.data;
}

function deleteGado(id) {
    return axios.delete(`${APIURL}/animals/${id}`);
}

export default {
    getAll,
    getBase,
    createGado,
    updateGado,
    deleteGado,
};
