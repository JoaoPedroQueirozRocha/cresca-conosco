import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL_PROD}gado`

async function getAll() {
    const response = await axios.get(`${APIURL}/`);
    return response.data;
}

async function getBase() {
    const response = await axios.get(`${APIURL}/base`);
    console.log("response getBase ---->>");
    return response.data;
}

export default {
    getAll,
    getBase
}



