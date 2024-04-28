import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/gestacoes`

async function getGestacao(animal_id) {
    return await axios.get(`${APIURL}/${animal_id}`);
}

function salvarGestacao(gestacao) {
    return axios.post(`${APIURL}/`, gestacao);
}

/**
 * Realiza o parto de um animal e atualiza o nmero de crias
 * @param {number} id - Id da gestação
 * @param {number} crias - Nmero de crias
 */
async function parir(id, crias) {
    return await axios.put(`${APIURL}/parir/${id}`, { status: 'concluida', data_finalizacao: new Date(), crias: crias });
}

async function confirmarGestacao(id) {
    return await axios.put(`${APIURL}/${id}`, { status: 'confirmada' });
}

async function deletarGestacao(id) {
    return await axios.delete(`${APIURL}/${id}`);
}

/**
 * Edita uma gestação
 * @param {number} id - Id da gestação
 * @param {object} gestacao - Dados a serem alterados
 */
async function editarGestacao(id, gestacao) {
    delete gestacao.animal_id;
    delete gestacao.id_gestacao;
    return await axios.put(`${APIURL}/${id}`, gestacao);
}

export default { salvarGestacao, parir, confirmarGestacao, deletarGestacao, editarGestacao };

