import { ref, reactive, toRefs } from 'vue'
import gestacaoController from '../../../controller/gestacao'


export function useEditDialog() {
    const state = reactive({
        options: ref(['pendente', 'confirmada', 'falhou', 'concluida']),
        optionsTouro: ref(['5/8', 'gir', 'boi']),
        loading: ref(false),
        isDisabled: ref(false),
        dateOpened: ref({
            data_insem: false,
            prev_parto: false,
        }),
        defaultAlert: ref({
            top: true,
            right: true,
            timeout: 3500,
        }),
        gestacaoData: reactive({
            animal_id: 0 || null,
            status: '',
            touro: '',
            data_insem: '',
            prev_parto: '' || null,
        })
    })

    async function validateData(gestacaoData) {
        if (gestacaoData.status === "confirmada") {
            return (
                gestacaoData.data_insem &&
                gestacaoData.prev_parto &&
                gestacaoData.touro &&
                gestacaoData.status
            );
        } else {
            return (
                gestacaoData.data_insem &&
                gestacaoData.touro &&
                gestacaoData.status
            );
        }
    }

    async function processarGestacao(gestacaoData, isEdit) {
        if (isEdit) {
            console.log("gestacao id", gestacaoData.id_gestacao);
            await gestacaoController.editarGestacao(gestacaoData.id_gestacao, gestacaoData);
        } else {
            console.log("gestacao data", gestacaoData);
            await gestacaoController.salvarGestacao(gestacaoData);
        }
    }

    function changeDisabled(value) {
        state.isDisabled = value !== 'confirmada'
        adjustPrevPartoDate(value);
    }

    function adjustPrevPartoDate(value) {
        if (value === 'confirmada' && state.gestacaoData.data_insem) {
            setPrevPartoDate();
        } else {
            resetPrevPartoDate(value);
        };
    }

    function setPrevPartoDate() {
        const insemDate = new Date(state.gestacaoData.data_insem);
        const prevPartoDate = new Date(insemDate.getTime() + (283 * 24 * 60 * 60 * 1000)); // Adiciona 283 dias
        state.gestacaoData.prev_parto = prevPartoDate;
    }

    function resetPrevPartoDate(value) {
        if (value !== 'confirmada') {
            state.gestacaoData.prev_parto = null;
        }
    };
    return {
        ...toRefs(state),
        validateData,
        processarGestacao,
        changeDisabled,
    }
}

