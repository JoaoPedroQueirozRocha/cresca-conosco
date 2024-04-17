import { ref, reactive, toRefs } from 'vue'


export function useEditDialog(){
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

    function changeModel(value, model){
        console.log("change model", value);
        model.value = value;
        emit("update:modelValue", value); // Emitindo o evento
    };

    async function validateData(gestacaoData) {
        console.log("validate data", gestacaoData);
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

    return {
        ...toRefs(state),
        changeModel,
        validateData
    }    
}

