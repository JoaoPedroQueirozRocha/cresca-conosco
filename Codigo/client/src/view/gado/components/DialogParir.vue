<template>
	<Dialog v-model="model" @update:model-value="cancelar" width="70%" height="fit-content">
		<div class="dialog-div">
			<div>
				<h1 class="title">Parir a {{ animalData.nome }}</h1>
			</div>
			<Input class="md:w-[49%] w-full" label="Crias" type="number" v-model="crias" />
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
	name: 'DialogInsem',
	props: {
		animalData: { type: Object, required: true },
		modelValue: { type: Boolean, required: false },
		isEdit: Boolean,
	},
	emits: ['update:modelValue', 'change'],
	watch: {
		animalData() {
			if (this.animalData.status) {
				this.gestacaoData = {
					animal_id: this.animalData.id,
					id_gestacao: this.animalData.id_gestacao ? this.animalData.id_gestacao : null,
					status: this.animalData.status,
					touro: this.animalData.touro,
					crias: this.crias

				};
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
		const {
			createDialog,
			loadBaseData,
			openInsemDialog,
			openParirDialog,
			parirAnimal,
			secarAnimal,
			deletarAnimal,
			confirmarGestacao,
			getOptions,
			processarParto
		} = useGado();

		return {
			model: ref(false),
			createDialog,
			loadBaseData,
			openInsemDialog,
			openParirDialog,
			parirAnimal,
			secarAnimal,
			deletarAnimal,
			confirmarGestacao,
			getOptions,
			processarParto
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
			this.gestacaoData = {
				animal_id: null,
				id_gestacao: null,
				status: '',
				touro: '',
				data_insem: '',
				prev_parto: '' || null,
			};
		},

		async salvarParto() {
			if (this.validateData(this.data)) {
				this.showAlert('Preencha todos os campos para parir a vaca', 'error');
			} else {
				this.loading = true;
				try {
					await this.processarParto();
					this.showAlert('Parto registrado com sucesso', 'success')
				} catch (error) {

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
