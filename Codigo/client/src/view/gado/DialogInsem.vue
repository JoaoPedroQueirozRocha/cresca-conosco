<template>
	<Dialog v-model="model" @update:model-value="cancelar" width="70%" height="fit-content" :noOverflow="!(dateOpened.data_insem || dateOpened.prev_parto)">
		<div class="dialog-div" :class="{ bigger: dateOpened.data_insem || dateOpened.prev_parto }">
			<div>
				<h1 class="title">{{ animalData.nome }}</h1>
			</div>
			<div class="w-[100%] flex flex-col gap-4">
				<div class="flex md:flex-row flex-col gap-4">
					<Select class="flex-1" label="Status" @update:model-value="changeDisabled" v-model="gestacaoData.status" :items="options" />
					<Select class="flex-1" label="Touro (semem)" v-model="gestacaoData.touro" :items="optionsTouro" />
				</div>
				<DatePicker label="Data Inseminação" v-model:expanded="dateOpened.data_insem" :max-date="new Date()" v-model="gestacaoData.data_insem" />
				<DatePicker
					label="Previsão parto"
                    v-model:expanded="dateOpened.prev_parto"
                    :min-date="new Date()"
					v-model="gestacaoData.prev_parto"
					:disabled="isDisabled"
				/>
			</div>
			<div class="flex flex-row gap-4 justify-end">
				<Button @click="cancelar" only-border :disabled="loading">Cancelar</Button>
				<Button @click="salvarGestacao()" :loading="loading">Salvar</Button>
			</div>
		</div>
	</Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import Card from '@/components/Card.vue';
import Tab from '@/components/Tab.vue';
import Input from '@/components/Input.vue';
import Select from '@/components/Select.vue';
import DatePicker from '@/components/DatePicker.vue';
import Button from '@/components/Button.vue';
import gestacaoController from '@/controller/gestacao.js';
import { ref, reactive, watch } from 'vue';

export default {
	name: 'DialogInsem',
	props: {
		animalData: {
			type: Object,
			required: true,
		},
		modelValue: {
			type: Boolean,
			required: false,
		},
	},
	emits: ['update:modelValue', 'change'],
	watch: {
        animalData() {
            if (this.animalData.status) {
				this.gestacaoData = {
                    animal_id: this.animalData.id,
                    status: this.animalData.status,
                    touro: this.animalData.touro,
                    data_insem: this.animalData.data_insem ? new Date(this.animalData.data_insem) : null,
                    prev_parto: this.animalData.prev_parto ? new Date(this.animalData.prev_parto) : null,
                }
			} else {
                this.gestacaoData.animal_id = this.animalData.id;
            }
        },
		modelValue() {
			this.model = this.modelValue;
		},
	},
	components: {
		Dialog,
		Card,
		Tab,
		Input,
		Select,
		DatePicker,
		Button,
	},
	setup() {
		const options = ref(['pendente', 'confirmada', 'falhou', 'concluida']);
		const optionsTouro = ref(['5/8', 'gir', 'touro']);
		const gestacaoData = reactive({
			animal_id: 0 || null,
			status: '',
			touro: '',
			data_insem: '',
			prev_parto: '' || null,
		});
        const loading = ref(false);
        const isDisabled = ref(false);
        const dateOpened = ref({
            data_insem: false,
            prev_parto: false,
        });

		const defaultAlert = ref({
			top: true,
			right: true,
			timeout: 3500,
		});
		return {
			model: ref(false),
			options,
			optionsTouro,
			gestacaoData,
			defaultAlert,
            loading,
            dateOpened,
            isDisabled,
		};
	},

	mounted() {
		this.model = this.dialogModel;
	},

	methods: {
		changeModel(value) {
			this.model = value;
			this.$emit('update:modelValue', this.model);
		},
        cancelar() {
            this.changeModel(false);
            this.gestacaoData = {
                animal_id: null,
                status: '',
                touro: '',
                data_insem: '',
                prev_parto: '' || null,
            };
        },
		async salvarGestacao() {
			if (!this.validateData()) {
				this.$alert({
					message: 'Preencha todos os campos para salvar a vaca',
					...this.defaultAlert,
				});
			} else {
                this.loading = true;
				try {
					console.log('salvarGestacao', this.gestacaoData);
					const result = await gestacaoController.salvarGestacao(this.gestacaoData);
					this.$alert({
                        message: 'Gestação salva com sucesso',
                        type: 'success',
                        ...this.defaultAlert,
                    });
				} catch (error) {
					console.error(error);
					this.$alert({
                        message: 'Erro ao salvar gestação. Tente novamente mais tarde',
                        ...this.defaultAlert,
                    });
				} finally {
					this.cancelar();
                    this.loading = false;
                }
			}
		},
		validateData() {
			if (this.gestacaoData.status === 'confirmada') {
				return (
					this.gestacaoData.data_insem &&
					this.gestacaoData.prev_parto &&
					this.gestacaoData.touro &&
					this.gestacaoData.status
				);
			} else {
				return this.gestacaoData.data_insem && this.gestacaoData.touro && this.gestacaoData.status;
			}
		},
        changeDisabled(value) {
            this.isDisabled = value != 'confirmada';
            if (value === 'confirmada' && this.gestacaoData.data_insem) {
                const insemDate = new Date(this.gestacaoData.data_insem);
                const prevPartoDate = new Date(insemDate);
                prevPartoDate.setDate(prevPartoDate.getDate() + 283);
                this.gestacaoData.prev_parto = prevPartoDate;
            }else if(value !== 'confirmada' && this.gestacaoData.prev_parto){
                this.gestacaoData.prev_parto = null;
            }
        }
	},
};
</script>
<style scoped lang="scss">
.dialog-div {
  display: flex;
  flex-direction: column;
  min-height: 290px;
  gap: 2em;
  padding: 1em;
  transition-duration: 1s;
}

.dialog-div.bigger {
  min-height: 90vh;
}

@media screen and (max-width: 768px) {
  .dialog-div {
    width: 90vw;
  }
}
</style>
