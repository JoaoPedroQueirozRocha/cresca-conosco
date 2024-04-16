import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/animals`

function createAnimal(animal) {
    return axios.post(`${APIURL}/animals`, animal);
}

function getAnimal(id) {
    return axios.get(`${APIURL}/${id}`);
}

function updateAnimal(id, animal) {
    return axios.put(`${APIURL}/${id}`, animal);
}

export default {
    createAnimal,
    getAnimal,
    updateAnimal
}

