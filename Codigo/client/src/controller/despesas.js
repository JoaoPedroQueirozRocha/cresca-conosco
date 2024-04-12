import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL_PROD}despesas`

async function getById(id){
    const response = await axios.get(`${APIURL}/${id}`);
    return response.data;
}

async function updateDespesa(id){
    return axios.put(`${APIURL}/${id}`);
}

async function createDespesa(){
    return axios.post(APIURL);
}

export default{
    getById,
    updateDespesa,
    createDespesa
}
