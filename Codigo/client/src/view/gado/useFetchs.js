import { reactive, toRefs, ref } from 'vue'
import gadoController from '../../controller/gado.js';


export function useFetchs(gadoData) {

    async function getBaseData() {
        const data = await gadoController.getBase();
        gadoData.value = data;
    }

    async function getAllData(){
        const data = await gadoController.getAll();
        return data;

    }

    return {
        ...toRefs(gadoData),
        getBaseData,
        getAllData
    }
}

