import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/gestacoes`

async function getGestacao(animal_id) {
    return await axios.get(`${APIURL}/${animal_id}`);
}

function salvarGestacao(gestacao) {
    return axios.post(`${APIURL}/`, gestacao);
}

async function parir(id) {
    return await axios.put(`${APIURL}/${id}`, { status: 'concluida' });
}

async function deletarGestacao(id) {
    return await axios.delete(`${APIURL}/${id}`);
}

export default { salvarGestacao, parir, deletarGestacao, getGestacao };

