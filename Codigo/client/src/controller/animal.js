import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/animals`

function createAnimal(animal) {
    return axios.post(`${APIURL}/animals`, animal);
}

async function getAnimal(id) {
    const response = await axios.get(`${APIURL}/${id}`);
    return response.data;
}

function updateAnimal(id, animal) {
    return axios.put(`${APIURL}/${id}`, animal);
}

export default {
    createAnimal,
    getAnimal,
    updateAnimal
}

