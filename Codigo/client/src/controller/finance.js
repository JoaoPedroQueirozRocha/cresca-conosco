import axios from 'axios';
const APIURL = `${import.meta.env.VITE_API_URL}/finance`

function generateReport(period, period2) {
    return axios.post(`${APIURL}`, { period, period2 });
}

export default {
    generateReport
}