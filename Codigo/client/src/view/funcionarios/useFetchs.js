import { reactive, toRefs, ref } from 'vue'
import funcionarioController from '@/controller/funcionario.js';

export function useFetchs(funcionariodata) {

    async function getBaseData() {
        const data = await funcionarioController.getBase();
        funcionariodata.value = data;
    }

    return{
        ...toRefs(funcionariodata),
        getBaseData
    }
}