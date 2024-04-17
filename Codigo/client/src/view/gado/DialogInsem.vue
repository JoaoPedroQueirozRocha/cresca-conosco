<template>
	<Dialog v-model="model" @update:model-value="changeModel" width="60%" height="fit-content" noOverflow>
		<div class="">
			<div>
				<h1 class="title">{{ animalData.nome }}</h1>
				<Tab></Tab>
			</div>
			<div class="w-[100%] flex flex-col gap-4 mt-4">
				<div class="flex md:flex-row flex-col gap-4">
					<Select class="flex-1" label="Status" v-model="gestacaoData.status" :items="options" />
					<Select class="flex-1" label="Touro (semem)" v-model="gestacaoData.touro" :items="optionsTouro" />
				</div>
				<DatePicker label="Data Inseminação" v-model="gestacaoData.data_insem" />
				<DatePicker
					label="Previsão parto"
					v-model="gestacaoData.prev_parto"
					:disabled="gestacaoData.status !== 'confirmada'"
				/>
			</div>
			<div class="flex flex-row gap-4 justify-end">
				<Button @click="changeModel">Cancelar</Button>
				<Button @click="salvarGestacao()">Salvar</Button>
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
			animal_id: 31,
			status: '',
			touro: '',
			data_insem: '',
			prev_parto: '' || null,
		});

		watch(
			() => gestacaoData.status,
			(newStatus) => {
				if (newStatus === 'confirmada' && gestacaoData.data_insem) {
					const insemDate = new Date(gestacaoData.data_insem);
					const prevPartoDate = insemDate.setDate(insemDate.getDate() + 283);
					gestacaoData.prev_parto = prevPartoDate;
				}
			}
		);

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
		};
	},

	mounted() {
		this.model = this.dialogModel;
		if (this.animalData.status === 'confirmada') {
			this.prev;
		}
	},

	methods: {
		changeModel(value) {
			this.model = value;
			this.$emit('update:modelValue', this.model);
		},
		async salvarGestacao() {
			if (!this.validateData()) {
				this.$alert({
					message: 'Preencha todos os campos para salvar a vaca',
					...this.defaultAlert,
				});
			} else {
				try {
					console.log('salvarGestacao', this.gestacaoData);
					const result = await gestacaoController.salvarGestacao(this.gestacaoData);
					this.model = false;
					return result;
				} catch (error) {
					console.error(error);
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
	},
};
</script>
