<template>
	<Dialog v-model="model" @update:model-value="changeModel" width="60%" height="fit-content" noOverflow>
		<div class="">
			<div>
				<h1 class="title">{{ animalData.nome }}</h1>
				<Tab></Tab>
			</div>
			<div class="w-[100%] flex flex-col gap-4 mt-4">
				<div class="flex md:flex-row flex-col gap-4">
					<Select class="flex-1" label="Status" v-model="status" :items="options" />
					<Select class="flex-1" label="Touro (semem)" v-model="touro" :items="optionsTouro" />
				</div>
				<DatePicker label="Data Inseminação" v-model="date" />
				<DatePicker label="Previsão parto" v-model="datePrevisao" disabled />
			</div>
			<div class="flex flex-row gap-4">
				<Button></Button>
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
import { ref } from 'vue';

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
		const status = ref('');
		const touro = ref('');
		const date = ref('');
		const datePrevisao = ref('');
		return {
			model: ref(false),
			options,
			optionsTouro,
			status,
			touro,
			date,
			datePrevisao,
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
	},
};
</script>
