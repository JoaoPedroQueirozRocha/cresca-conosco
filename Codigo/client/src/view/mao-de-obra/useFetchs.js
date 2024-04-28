import { reactive, toRefs, ref } from 'vue'
import maoDeObraController from '@/controller/mao-de-obra.js';

export function useFetchs() {

    const state = reactive({
        isLoading: ref(false),
        maoDeObraData: ref([])
    })

    async function getBaseData() {
        state.isLoading = true;
        try {
            state.maoDeObraData = await maoDeObraController.getBase();
        } catch (error) {
            console.error(error);
        } finally {
            state.isLoading = false;
        }
    }

    return {
        ...toRefs(state),
        getBaseData
    }
}