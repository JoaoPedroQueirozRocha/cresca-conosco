<template>
	<div class="flex flex-col w-full">
		<div class="w-full flex flex-col gap-4">
			<div class="mb-6">
				<div class="flex flex-row w-full justify-between align-middle mb-4">
					<h2 class="title">{{ pageTitle }}</h2>
				</div>
				<Tab v-model="tabIndex" :items="tabItems" disabled v-if="!nome" />
			</div>

			<Card class="w-full flex flex-col gap-4">
				<Input v-model="data.nome" label="Nome" />
				<div class="flex gap-4 flex-wrap">
					<Input class="md:w-[49%] w-full" v-model="data.crias" label="Crias" type="number" />
					<Input class="md:w-[49%] w-full" v-model="data.num_insem" label="N° Inseminaçes" type="number" />
				</div>
				<div class="w-full flex flex-col gap-4 flex-wrap">
					<Checkbox v-model="data.lactante">Lactante</Checkbox>
				</div>
			</Card>
			<div class="flex w-full justify-end gap-2">
				<Button @click="$router.push('/gado')" only-border :disabled="loading">Cancelar</Button>
				<Button @click="salveVaca" :loading="loading">{{ buttonText }}</Button>
			</div>
		</div>
	</div>
</template>

<script>
// import gadoController from '@/controller/gado.js';
import animalController from '@/controller/animal.js';
import Button from '../../components/Button.vue';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Dialog from '@/components/Dialog.vue';
import Tab from '@/components/Tab.vue';
import DatePicker from '@/components/DatePicker.vue';
import Checkbox from '@/components/Checkbox.vue';
import Select from '@/components/Select.vue';
import { ref } from 'vue';

export default {
	name: 'CreateEdit',
	props: {
		id: [Number, String],
	},
	components: { Card, Dialog, Button, Input, Tab, DatePicker, Select, Checkbox },
	setup() {
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
		const data = ref({});
		const loading = ref(false);
		const pageTitle = ref('');

		return {
			tabItems,
			tabIndex,
			defaultAlert,
			data,
			loading,
			pageTitle,
		};
	},

	computed: {
		buttonText() {
			if (this.id) return 'Salvar';
			return 'Criar';
		},
	},

	async created() {
		if (this.id) {
			try {
				this.pageTitle = await this.getNomeAnimal(this.id);
				const response = await animalController.getAnimal(Number(this.id));
				Object.assign(this.data, Array.isArray(response.data) ? response.data[0] : response.data);
				this.status = this.situacoesItems.find((item) => item.value == this.data.status) || '';
			} catch (e) {
				console.error(e);
				this.$alert({
					message: `Erro ao requisitar a vaca`,
					...this.defaultAlert,
				});
			}
		} else {
			this.pageTitle = 'Nova Vaca';
		}
	},

	methods: {
		async salveVaca() {
			if (!this.isValnome()) {
				this.$alert({
					message: 'Preencha todos os campos para salvar a vaca',
					...this.defaultAlert,
				});
				return;
			}

			this.loading = true;

			try {
				if (this.id) await animalController.updateAnimal(this.id, this.data);
				else await animalController.createAnimal(this.data);

				this.$alert({
					message: 'Vaca salva com sucesso',
					type: 'success',
					...this.defaultAlert,
				});
			} catch (e) {
				console.error(e);
				this.$alert({
					message: 'Erro ao salvar vaca. Tente novamente mais tarde',
					...this.defaultAlert,
				});
			} finally {
				this.loading = false;
				this.$router.push('/gado');
			}
		},

		isValnome() {
			return this.data.nome && this.data.crias >= 0 && this.data.num_insem >= 0;
		},

		async getNomeAnimal(id) {
			const response = await animalController.getAnimal(Number(id));
			return response.data.nome;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../style/var.scss';
</style>
