import axios from "axios";
const APIURL = `${import.meta.env.VITE_API_URL_PROD}despesas`

async function getById(id){
    const response = await axios.get(`${APIURL}/${id}`);
    return response.data;
}



export default{
    getById
}
