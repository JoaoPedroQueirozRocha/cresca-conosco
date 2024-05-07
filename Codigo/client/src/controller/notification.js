import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/notification`

async function getAll() {
    const response = await axios.get(`${APIURL}/list`);
    return response.data;
}

async function deleteNotification(id){
    return axios.delete(`${APIURL}/${id}`);
}

export default {
    getAll,
    deleteNotification
}