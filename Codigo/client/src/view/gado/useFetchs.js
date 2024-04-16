import { reactive, toRefs, ref } from 'vue'
import gadoController from '../../controller/gado.js';


export function useFetchs() {

    async function getBaseData() {
        const data = await gadoController.getBase();
        return data;
    }

    async function getAllData() {
        const data = await gadoController.getAll();
        console.log("fetch all data", data);
        return data;

    }

    return {
        getBaseData,
        getAllData
    }
}

