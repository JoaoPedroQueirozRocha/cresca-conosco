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

async function confirmarGestacao(id) {
    return await axios.put(`${APIURL}/${id}`, { status: 'confirmada' });
}

async function deletarGestacao(id) {
    return await axios.delete(`${APIURL}/${id}`);
}

async function editarGestacao(id, gestacao) {
    return await axios.put(`${APIURL}/${id}`, gestacao);
}

export default { salvarGestacao, parir, confirmarGestacao, deletarGestacao, editarGestacao };

