<template>
	<Dialog v-model="model" @update:model-value="cancelar" width="70%" height="fit-content">
		<div class="dialog-div">
			<h1 class="title mt-0">Agendar fertilização da {{ animalData.nome }}</h1>
			<Input class="md:w-[49%] w-full" label="Crias" type="number" v-model="fertilizacaoData.crias" />
			<div class="flex flex-row gap-4 justify-end">
				<Button @click="cancelar" only-border :disabled="loading">Cancelar</Button>
				<Button @click="salvarFertilizacao()" :loading="loading">Agendar</Button>
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
import { useGado } from '../composables/useGado.js';
import { ref, reactive, watch } from 'vue';

export default {
	name: 'DialogFertilizacao',
	props: {
		animalData: { type: Object, required: true },
		modelValue: { type: Boolean, required: false }
	},
	emits: ['update:modelValue', 'change'],
	watch: {
		animalData() {
			if (this.animalData) {
				this.fertilizacaoData = {
					animal_id: this.animalData.id,
					id_fertilizacao: this.animalData.id_fertilizacao ? this.animalData.id_fertilizacao : null,
					crias: 0
				};
			} else {
				this.fertilizacaoData.animal_id = this.animalData.id;
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
		const {
			fertilizacaoData,
            createDialog,
			loadBaseData,
			openInsemDialog,
			openParirDialog,
			parirAnimal,
			secarAnimal,
			deletarAnimal,
			confirmarGestacao,
			getOptions
		} = useGado();

		const defaultAlert = ref({
			top: true,
			right: true,
			timeout: 3500,
		});

		return {
			model: ref(false),
			defaultAlert,
			loading: ref(false),
			fertilizacaoData,
			createDialog,
			loadBaseData,
			openInsemDialog,
			openParirDialog,
			parirAnimal,
			secarAnimal,
			deletarAnimal,
			confirmarGestacao,
			getOptions
		};
	},

	mounted() {
		this.model = this.dialogModel;
	},

	methods: {
		changeModel(value) {
			this.model = value;
			this.$emit('update:modelValue', this.model); // Emitindo o evento
		},
		cancelar() {
			this.changeModel(false);
			this.fertilizacaoData = {
				animal_id: null,
				id_fertilizacao: null,
				status: '',
				crias: null,
				touro: '',
				data_insem: '',
				prev_parto: '' || null,
			};
		},

		async validateData(fertilizacaoData){	
			return fertilizacaoData.crias >= 0;
		},

		async salvarFertilizacao() {
			if (!this.validateData(this.fertilizacaoData)) {
				this.showAlert('Verifique o valor dos campos para a fertilização da vaca', 'error');
			} else {
				this.loading = true;
				try {
					console.log(this.fertilizacaoData.crias);
					await this.fertilizarAnimal(this.fertilizacaoData.id, this.fertilizacaoData.crias);
					this.showAlert('Fertilização registrado com sucesso', 'success')
				} catch (error) {
					console.error(error);
				} finally {
					this.cancelar();
					this.$emit('change');
					this.loading = false;
				}
			}
		},

		showAlert(message, type) {
			this.$alert({
				message: message,
				type: type,
				...this.defaultAlert,
			});
		},
	},
};
</script>
<style scoped lang="scss">
.dialog-div {
	display: flex;
	flex-direction: column;
	height: fit-content;
	gap: 3em;
	padding: 1em;
	transition-duration: 1s;
}

@media screen and (max-width: 768px) {
	.dialog-div {
		width: 90vw;
	}
}
</style>