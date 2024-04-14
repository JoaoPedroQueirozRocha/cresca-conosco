import { reactive, toRefs, ref } from 'vue'
import funcionarioController from '@/controller/funcionario.js';

export function useFetchs(funcionarioData) {

    const state = reactive({
        isLoading: false,
    })

    async function getBaseData() {
        state.isLoading = true;
        try {
            const data = await funcionarioController.getBase();
            funcionarioData.value = data;
        } catch (error) {
            console.log(error);
        } finally {
            state.isLoading = false;
        }
    }

    return {
        ...toRefs(funcionarioData),
        getBaseData
    }
}