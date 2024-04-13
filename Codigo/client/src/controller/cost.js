import axios from 'axios';
const APIURL = `${import.meta.env.VITE_API_URL}/finance/cost`

function listCosts(period = []) {
    return axios.post(`${APIURL}`, {period});
}

function getCost(id) {
    return axios.get(`${APIURL}/${id}`);
}

function updateCost(id) {
    return axios.put(`${APIURL}/${id}`);
}

function createCost() {
    return axios.post(APIURL);
}

function deleteCost(id) {
    return axios.delete(`${APIURL}/${id}`);
}

export default {
    getCost,
    updateCost,
    createCost,
    deleteCost,
    listCosts
}