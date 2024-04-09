import { reactive, toRefs, ref } from 'vue'
import gadoController from '../../controller/gado.js';


export function useFetchs(gadoData) {

    async function getBaseData() {
        const data = await gadoController.getBase();
        gadoData.value = data;
        console.log("data fetch", data);
        console.log("gadoData", gadoData);
    }


    return {
        ...toRefs(gadoData),
        getBaseData
    }
}

