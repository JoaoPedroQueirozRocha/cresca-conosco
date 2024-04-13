import axios from 'axios';
const APIURL = `${import.meta.env.VITE_API_URL}/lucro`

function listProfits(period = []) {
    return axios.post(`${APIURL}/list`, {period});
}

function getProfit(id) {
    return axios.get(`${APIURL}/${id}`);
}

function updateProfit(id) {
    return axios.put(`${APIURL}/${id}`);
}

function createProfit() {
    return axios.post(APIURL);
}

function deleteProfit(id) {
    return axios.delete(`${APIURL}/${id}`);
}

export default {
    getProfit,
    updateProfit,
    createProfit,
    deleteProfit,
    listProfits
}