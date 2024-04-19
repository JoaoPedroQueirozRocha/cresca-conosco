import axios from 'axios'
const APIURL = `${import.meta.env.VITE_API_URL}/funcionario`

async function getBase() {
    const response = await axios.get(`${APIURL}/base`);
    return response.data;
}

export default {
    getBase
}