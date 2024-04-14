import { reactive, toRefs, ref } from 'vue'
import funcionarioController from '@/controller/funcionario.js';

export function useFetchs(funcionarioData) {

    async function getBaseData() {
        const data = await funcionarioController.getBase();
        funcionarioData.value = data;
    }

    return{
        ...toRefs(funcionarioData),
        getBaseData
    }
}