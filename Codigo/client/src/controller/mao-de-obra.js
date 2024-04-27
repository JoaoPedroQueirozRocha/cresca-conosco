import axios from 'axios'
const APIURL = `${import.meta.env.VITE_API_URL}/mao-de-obra`

async function getBase() {
    const response = await axios.get(`${APIURL}/list`);
    return response.data;
}

function getFuncionario(id) {
    return axios.get(`${APIURL}/${id}`);
}

function updateFuncionario(id, data) {
    return axios.put(`${APIURL}/${id}`, data);
}

function createFuncionario(data) {
    return axios.post(`${APIURL}/`, data);
}

function deleteFuncionario(id) {
    return axios.delete(`${APIURL}/${id}`);
}

export default {
    getBase,
    getFuncionario,
    updateFuncionario,
    createFuncionario,
    deleteFuncionario
}
