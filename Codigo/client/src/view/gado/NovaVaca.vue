<script>
import gadoController from '@/controller/gado.js';
import Button from '../../components/Button.vue';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Dialog from '@/components/Dialog.vue';
import authController from '@/controller/auth.js';
import { ref } from 'vue';

export default {
	name: 'NovaVaca',
	components: { Card, Dialog, Button, Input },
	setup() {
		const editing = ref(false);
		const defaultAlert = ref({
			top: true,
			right: true,
			timeout: 3500,
		});
		const gadoData = ref({
			name: '',
			crias: '',
			semen: '',
			situacao: '',
			prox: ''
		});

		const isValid = () => {
			return gadoData.value.name.trim() !== '' &&
				   gadoData.value.crias.trim() !== '' &&
				   gadoData.value.semen.trim() !== '' &&
				   gadoData.value.situacao.trim() !== '' &&
				   gadoData.value.prox.trim() !== '';
		};

		const salveVaca = async () => {
			if (!isValid()) {
				this.$alert({
					message: 'Preencha todos os campos',
					...defaultAlert.value,
				});
				return;
			}

			try {
				await gadoController.createGado(gadoData.value);

				this.$alert({
					message: 'Vaca criada com sucesso',
					type: 'success',
					...defaultAlert.value,
				});

				resetGadoData();
			} catch (e) {
				this.$alert({
					message: 'Erro ao criar vaca. Tente novamente mais tarde',
					...defaultAlert.value,
				});
			}
		};

		const resetGadoData = () => {
			gadoData.value = {
				name: '',
				crias: '',
				semen: '',
				situacao: '',
				prox: ''
			};
		};

		const cancel = () => {
			resetGadoData();
			editing.value = false;
		};

		return {
			editing,
			defaultAlert,
			gadoData,
			salveVaca,
			cancel
		};
	},
};
</script>

<template>
	<div class="flex flex-col w-full mt-[3em]">
		<div class="w-full flex flex-col gap-4">
			<div class="mb-6">
				<div class="flex flex-row w-full justify-between align-middle mb-4">
					<h2 class="text-[2.5em] font-bold">Nova Vaca</h2>
				</div>
				<div class="flex items-center justify-between gap-4 flex-wrap">
                    <Button>Criação</Button>
                    <Button>Importar de planilha</Button>
				</div>
			</div>

            <Card class="w-full flex flex-col gap-4">
                <div class="flex flex-col gap-4">
				    <Input v-model="gadoData.name" label="Nome" text-area />
                    <Input v-model="gadoData.crias" label="Crias" text-area />
                    <Input v-model="gadoData.semen" label="Sêmen a usar" text-area />
					<Input v-model="gadoData.situacao" label="Situação" text-area />
					<Input v-model="gadoData.prox" type="date" label="Próxima inseminação" />
			    </div>
		    </Card>
            <div class="flex w-full justify-end gap-2">
				<Button v-if="editing" @click="cancel" only-border>Cancelar</Button>
			    <Button @click="salveVaca">Criar</Button>
		    </div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../../style/var.scss';

.actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.5em;
}

h1 {
	color: $green-dark;
}

.input-pass {
	min-width: 60vw;
}
</style>
