import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/notification`

async function getAll() {
    const response = await axios.get(`${APIURL}/list`);
    return response.data;
}

async function createNotification(data) {
    return await axios.post(`${APIURL}`, data);
}

async function createFertilizacaoNotification(date, animal) {
    const data = {
        titulo: 'Fertilização',
        descricao: `O dia de fertilizar a ${animal.nome} está chegando`,
        vencimento: date,
        animal_id: animal.id,
    };
    return await createNotification(data);
}

async function deleteNotification(id){
    return axios.delete(`${APIURL}/${id}`);
}

export default {
    getAll,
    deleteNotification,
    createNotification,
    createFertilizacaoNotification
}



