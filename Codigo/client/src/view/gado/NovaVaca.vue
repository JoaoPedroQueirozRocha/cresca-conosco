<script>
import userController from '@/controller/gado.js';
import Button from '../../components/Button.vue';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Dialog from '@/components/Dialog.vue';
import authController from '@/controller/auth.js';
import { ref } from 'vue';

</script>

<template>
	<div class="flex flex-col w-full mt-[3em]">
		<div class="w-fullflex flex-col gap-4">
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
				    <Input v-model="gadoData.name" label="Nome" :disabled="!editing" text-area />
                    <Input v-model="userData.crias" label="Crias" :disabled="!editing" text-area />
                    <Input v-model="userData.crias" label="Crias" :disabled="!editing" text-area />
			    </div>
		    </Card>
            <div class="flex w-full justify-end gap-2">
			    <Button only-border> Cancelar </Button>
			    <Button >Criar</Button>
		    </div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import '../../style/var.scss';

</style>
