<script>
import gadoController from '@/controller/gado.js';
import Button from '../../components/Button.vue';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Dialog from '@/components/Dialog.vue';
import Tab from '@/components/Tab.vue';
import DatePicker from '@/components/DatePicker.vue';
import Select from '@/components/Select.vue';
import { ref } from 'vue';

export default {
	name: 'CreateEdit',
    props: {
        nome: String,
    },
	components: { Card, Dialog, Button, Input, Tab, DatePicker, Select },
	setup() {
        const tabItems = ref([
            {
                text: 'Criação',
                icon: 'add_circle'
            },
            {
                text: 'Importação de Planilha',
                icon: 'swap_vert'
            },
        ]);
        const tabIndex = ref(0);
		const defaultAlert = ref({
			top: true,
			right: true,
			timeout: 3500,
		});
		const situacoesItems = ref([
			{
				label: 'Pendente',
				value: 'pendente',
			},
			{
				label: 'Confirmada',
				value: 'confirmada',
			},
			{
				label: 'Concluída',
				value: 'conclunomea',
			},
			{
				label: 'Falhou',
				value: 'falhou',
			},
		]);
		const situacao = ref('');
		const data = ref({
			nome: '',
			crias: 0,
			semen: '',
			situacao: '',
			prox: ''
		});
		const loading = ref(false);

		return {
			tabItems,
			tabIndex,
			defaultAlert,
			situacoesItems,
			data,
			situacao,
			loading,
		};
	},

    computed: {
        title() {
            if (this.nome) return this.data.nome;
            return 'Nova Vaca';
        },
        buttonText() {
            if (this.nome) return 'Salvar';
            return 'Criar';
        }
    },

    async created() {
        if (this.nome) {
            try {
                const { data } = await gadoController.getGado(Number(this.nome));
                this.data = data;
                this.situacao = this.situacoesItems.find((item) => item.value == data.situacao);

            } catch (e) {
                this.$alert({
					message: `Erro ao requisitar a ${this.value}`,
					...this.defaultAlert,
				});
            }
        }
    },

	methods: {
		async salveVaca() {
			this.data.situacao = this.situacao.value;

			if (!this.isValnome()) {
				this.$alert({
					message: 'Preencha todos os campos para salvar a vaca',
					...this.defaultAlert,
				});
				return;
			}

			this.loading = true;

			try {
				if (this.nome) await gadoController.updateGado(this.nome, this.data);
				else await gadoController.createGado(this.data);

				this.$alert({
					message: 'Vaca salva com sucesso',
					type: 'success',
					...this.defaultAlert,
				});

			} catch (e) {
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
			return this.data.name &&
				this.data.crias >= 0 &&
				this.data.semen &&
				this.data.situacao &&
				this.data.prox &&
				this.data.primeira_ia;
		}
	}
};
</script>

<template>
	<div class="flex flex-col w-full">
		<div class="w-full flex flex-col gap-4">
			<div class="mb-6">
				<div class="flex flex-row w-full justify-between align-mnomedle mb-4">
					<h2 class="title">{{ title }}</h2>
				</div>
    			<Tab v-model="tabIndex" :items="tabItems" disabled v-if="!nome" />
			</div>

            <Card class="w-full flex flex-col gap-4">
				<Input v-model="data.name" label="Nome" />
				<div class="flex gap-4 flex-wrap">
					<Input class="md:w-[49%] w-full" v-model="data.crias" label="Crias" type="number" />
					<Input class="md:w-[49%] w-full" v-model="data.semen" label="Touro (sêmen)" />
				</div>
				<DatePicker v-if="!nome" v-model="data.primeira_ia" label="Data 1ª inseminação artificial" />
                <div class="flex gap-4 flex-wrap">
					<Select class="md:w-[49%] w-full" v-model="situacao" :items="situacoesItems" label="Situação" />
					<DatePicker v-model="data.prox" label="Próxima inseminação" />
				</div>
		    </Card>
            <div class="flex w-full justify-end gap-2">
				<Button @click="$router.push('/gado')" only-border :disabled="loading">Cancelar</Button>
			    <Button @click="salveVaca" :loading="loading">{{ buttonText }}</Button>
		    </div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../../style/var.scss';
</style>
