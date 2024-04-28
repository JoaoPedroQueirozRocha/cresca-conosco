<template>
	<Dialog v-model="model" @update:model-value="cancelar" width="70%" height="fit-content">
		<div class="dialog-div">
			<div>
				<h1 class="title">Parir a {{ animalData.nome }}</h1>
			</div>
			<Input class="md:w-[49%] w-full" label="Crias" type="number" v-model="partoData.crias" />
			<div class="flex flex-row gap-4 justify-end">
				<Button @click="cancelar" only-border :disabled="loading">Cancelar</Button>
				<Button @click="salvarParto()" :loading="loading">Parir</Button>
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
	name: 'DialogParto',
	props: {
		animalData: { type: Object, required: true },
		modelValue: { type: Boolean, required: false }
	},
	emits: ['update:modelValue', 'change'],
	watch: {
		animalData() {
			if (this.animalData) {
				this.partoData = {
					animal_id: this.animalData.id,
					id_parto: this.animalData.id_parto ? this.animalData.id_parto : null,
					crias: 0
				};
			} else {
				this.partoData.animal_id = this.animalData.id;
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
			model,
			loading,
			partoData,
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

		return {
			model: ref(false),
			model,
			loading,
			partoData,
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
			this.partoData = {
				animal_id: null,
				id_parto: null,
				status: '',
				crias: null,
				touro: '',
				data_insem: '',
				prev_parto: '' || null,
			};
		},

		async validateData(partoData){	
			return partoData.crias >= 0;
		},

		async salvarParto() {
			if (!this.validateData(this.partoData)) {
				this.showAlert('Verifique o valor dos campos para parir a vaca', 'error');
			} else {
				this.loading = true;
				try {
					await this.parirAnimal(this.partoData.id);
					this.showAlert('Parto registrado com sucesso', 'success')
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
	min-height: 290px;
	gap: 3em;
	padding: 0 1em;
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
