import { reactive, toRefs, ref } from 'vue'
import gadoController from '../../controller/gado.js';
import animalsController from '../../controller/animal.js';


export function useFetchs() {

    async function getBaseData() {
        const data = await gadoController.getBase();
        return data;
    }

    async function getAllData() {
        const data = await gadoController.getAll();
        return data;

    }

    async function getAnimal(id) {
        const data = await animalsController.getAnimal(id);
        return data;
    }

    return {
        getBaseData,
        getAllData,
        getAnimal
    }
}

