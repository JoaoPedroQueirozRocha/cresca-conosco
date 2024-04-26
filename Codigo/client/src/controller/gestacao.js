import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/gestacoes`

async function getGestacao(animal_id) {
    return await axios.get(`${APIURL}/${animal_id}`);
}

function salvarGestacao(gestacao) {
    return axios.post(`${APIURL}/`, gestacao);
}

async function parir(id) {
    return await axios.put(`${APIURL}/${id}`, { status: 'concluida', data_finalizacao: new Date() });
}

async function confirmarGestacao(id) {
    return await axios.put(`${APIURL}/${id}`, { status: 'confirmada' });
}

async function deletarGestacao(id) {
    return await axios.delete(`${APIURL}/${id}`);
}

async function editarGestacao(id, gestacao) {
    delete gestacao.animal_id;
    delete gestacao.id_gestacao;
    return await axios.put(`${APIURL}/${id}`, gestacao);
}

export default { salvarGestacao, parir, confirmarGestacao, deletarGestacao, editarGestacao };

