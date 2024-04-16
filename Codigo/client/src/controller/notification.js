import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL}/notification`

async function getAll() {
    const response = await axios.get(`${APIURL}`);
    return response.data;
}

export default {
    getAll,
}



