import { reactive, toRefs, ref } from 'vue'
import maoDeObraController from '@/controller/mao-de-obra.js';

export function useFetchs() {

    const state = reactive({
        isLoading: ref(false),
        funcionarioData: ref([])
    })

    async function getBaseData() {
        state.isLoading = true;
        try {
            state.funcionarioData = await maoDeObraController.getBase();
            console.log('data', state.funcionarioData);
        } catch (error) {
            console.log(error);
        } finally {
            state.isLoading = false;
        }
    }

    return {
        ...toRefs(state),
        getBaseData
    }
}