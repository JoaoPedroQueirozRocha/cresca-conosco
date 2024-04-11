import { reactive, toRefs, ref } from 'vue'
import gadoController from '../../controller/gado.js';


export function useFetchs() {

    async function getBaseData() {
        const data = await gadoController.getBase();
        return data;
    }

    async function getAllData() {
        const data = await gadoController.getAll();
        return data;

    }

    return {
        getBaseData,
        getAllData
    }
}

