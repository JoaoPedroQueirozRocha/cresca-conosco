<template>
	<div class="flex justify-between items-center gap-2 mb-8" style="margin-top: 1.5em">
		<h2 class="title">{{ title }}</h2>
	</div>
	<Tab v-model="tabIndex" :items="tabItems" disabled v-if="!id" class="mb-6" />

	<div>
		<Card class="flex flex-col gap-4 mb-4">
			<Input type="text" label="Nome" v-model="dataWorker.nome" placeholder="Digite aqui"></Input>
			<Input type="text" label="Descrição" v-model="dataWorker.descricao" placeholder="Digite aqui"></Input>
			<div class="flex gap-6 flex-wrap">
				<Input
					class="md:w-[49%] w-full"
					type="number"
					label="Salário"
					placeholder="Digite aqui"
					v-model="dataWorker.salario"
				/>
			</div>
		</Card>

		<div class="flex flex-row flex-wrap gap-2 justify-end">
			<Button class="only-border" :disabled="loading" @click="$router.push('/mao-de-obra')">Cancelar</Button>
			<Button @click="salvar" :loading="loading">{{ buttonText }}</Button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import Dialog from '@/components/Dialog.vue';
import Card from '@/components/Card.vue';
import Input from '@/components/Input.vue';
import Tab from '@/components/Tab.vue';
import Checkbox from '@/components/Checkbox.vue';
import Select from '@/components/Select.vue';
import DatePicker from '@/components/DatePicker.vue';
import { upperCaseFirstLetter } from '@/util';

export default {
	name: 'CreateEdit',
	props: {
		id: String | Number,
		value: String,
		types: Array,
		callback: Function,
		get: Function,
	},
	components: { Button, Dialog, Card, Input, Tab, Checkbox, Select, DatePicker },
	inject: ['Auth'],

	setup() {
		const dataWorker = ref({
			nome: '',
			descricao: '',
			salario: 0,
		});
		const tabItems = ref([
			{
				text: 'Criação',
				icon: 'add_circle',
			},
			{
				text: 'Importação de Planilha',
				icon: 'swap_vert',
			},
		]);
		const tabIndex = ref(0);
		const defaultAlert = ref({
			top: true,
			right: true,
			timeout: 3500,
		});
		const loading = ref(false);

		return {
			dataWorker,
			tabItems,
			tabIndex,
			defaultAlert,
			loading,
		};
	},

	computed: {
		title() {
			if (this.id) return 'Editar ' + upperCaseFirstLetter(this.value);
			return 'Criar ' + upperCaseFirstLetter(this.value);
		},
		buttonText() {
			if (this.id) return 'Salvar';
			return 'Criar';
		},
	},

	async created() {
		if (this.id) {
			try {
				const { data } = await this.get(Number(this.id));
				this.data = data;
			} catch (e) {
				this.$alert({
					message: `Erro ao requisitar a ${this.value}`,
					...this.defaultAlert,
				});
			}
		}
	},

	methods: {
		async salvar() {
			if (!this.isValid()) {
				this.$alert({
					message: `Preencha todos os dados para salvar a ${this.value}`,
					...this.defaultAlert,
				});
				return;
			}

			this.loading = true;

			try {
				if (this.id) {
					await this.callback(this.id, this.dataWorker);
				} else {
					await this.callback(this.dataWorker);
				}

				this.$alert({
					type: 'success',
					message: `${upperCaseFirstLetter(this.value)} salva com sucesso`,
					...this.defaultAlert,
				});
			} catch (e) {
				console.error(e);
				this.$alert({
					message: `Erro ao salvar ${this.value}. Tente novamente mais tarde`,
					...this.defaultAlert,
				});
			} finally {
				this.loading = false;
				this.$router.push('/mao-de-obra');
			}
		},

		isValid() {
			return this.dataWorker.salario > 0 && this.dataWorker.descricao && this.dataWorker.nome;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../../style/var.scss';

.selecionar-data {
	margin-top: 1em;
	margin-bottom: 1em;
}

.tipo-holder {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.2em;
	height: fit-content;
	width: 50%;
}

.card {
	margin-bottom: 1%;
}
</style>
