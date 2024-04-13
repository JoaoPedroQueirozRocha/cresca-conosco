<script>
import userController from '@/controller/user.js';
import authController from '@/controller/auth.js';
import { ref } from 'vue';
import Card from '@/components/Card.vue';
import Dialog from '@/components/Dialog.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';

export default {
	name: 'Perfil',
	components: { Card, Dialog, Button, Input },
	inject: ['Auth'],
	setup() {
		return {
			editing: ref(false),
			changingPass: ref(false),
			defaultAlert: ref({
				top: true,
				right: true,
				timeout: 3500,
			}),
			passObject: ref({}),
			userData: ref({}),
		};
	},

	computed: {
		size() {
			return window.innerWidth > 352 ? 'medium' : 'small';
		},
	},

	beforeMount() {
		this.userData = JSON.parse(window.sessionStorage.getItem('user'));
	},

	methods: {
		async handleDelete() {
			const result = await this.$confirm({
				title: 'Tem certeza que deseja deletar sua conta?',
				description: 'Ao apagar sua conta, todos os dados cadastrados serão perdidos para sempre.',
			});
			if (!result) return;
			try {
				await userController.deleteUser();
			} catch (e) {
				this.$alert({
					message: 'Error ao deletar o usuário. Tente novamente mais tarde.',
					...this.defaultAlert,
				});
			}
		},

		async salveUser() {
			if (!this.isValid()) {
				this.$alert({
					message: 'Preencha todos os campos para alterar seu usuário',
					...this.defaultAlert,
				});
				return;
			} else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.userData.email)) {
				this.$alert({
					message: 'Digite um e-mail válido',
					...this.defaultAlert,
				});
				return;
			}

			try {
				await userController.updateUser(this.userData.sub, this.userData);
				window.sessionStorage.setItem('user', JSON.stringify(this.userData));

				this.$alert({
					message: 'Usuário alterado com sucesso',
					type: 'success',
					...this.defaultAlert,
				});
			} catch (e) {
				this.$alert({
					message: 'Error ao alterar o usuário. Tente novamente mais tarde',
					...this.defaultAlert,
				});
			}
		},

		async handleChangePass() {
			if (!this.isValidPass()) {
				this.$alert({
					message: 'Preencha todos os campos para alterar sua senha',
					...this.defaultAlert,
				});
				return;
			} else if (this.passObject.newPass !== this.passObject.confirmNewPass) {
				this.$alert({
					message: 'Sua senha e a confirmação devem ser iguais',
					...this.defaultAlert,
				});
				return;
			}

			try {
				await authController.changeUser(this.userData.sub, {
					...this.userData,
					password: this.passObject.newPass,
				});
				this.$alert({
					message: 'Senha alterada com sucesso',
					type: 'success',
					...this.defaultAlert,
				});
			} catch (e) {
				this.$alert({
					message: 'Error ao alterar a senha. Tente novamente mais tarde',
					...this.defaultAlert,
				});
			}
		},

		isValid() {
			return this.userData.name && this.userData.email;
		},

		isValidPass() {
			return this.passObject.actualPass && this.passObject.newPass && this.passObject.confirmNewPass;
		},

		resetPassForm() {
			this.changingPass = false;
			this.passObject = {};
		},
	},
};
</script>

<template>
	<div class="flex flex-col gap-6 w-full">
		<h1 class="title">Perfil</h1>
		<Card class="w-full flex flex-col gap-4">
			<div class="actions">
				<div class="circle-icon" :class="{ active: editing }" @click="editing = !editing">
					<span class="material-symbols-rounded"> edit </span>
				</div>
				<div class="circle-icon" @click="handleDelete">
					<span class="material-symbols-rounded"> delete </span>
				</div>
			</div>
			<div class="photo-name">
				<span class="material-symbols-rounded"> account_circle </span>
				<input v-model="userData.name" class="name-input" :disabled="!editing" :class="{ active: editing }" />
			</div>
			<div class="flex flex-col gap-4">
				<Input v-model="userData.description" label="Descrição" :disabled="!editing" text-area />
				<Input
					v-model="userData.email"
					error-message="E-mail inválido"
					label="E-mail"
					:disabled="!editing"
					type="email"
				/>
				<Button class="w-fit" @click="changingPass = true">Alterar Senha</Button>
			</div>
		</Card>
		<div class="flex w-full justify-end gap-2">
			<Button v-if="editing" @click="editing = false" only-border> Cancelar </Button>
			<Button v-if="editing" @click="salveUser">Salvar</Button>
		</div>
		<Dialog v-model="changingPass" @update:model-value="resetPassForm">
			<div class="flex flex-col xs:gap-6 gap-4 p-2">
				<h1 class="xs:text-4xl text-2xl font-bold whitespace-normal break-words">Alterar Senha</h1>
				<div class="w-full flex flex-col gap-2">
					<Input v-model="passObject.actualPass" label="Senha Atual" type="password" class="input-pass" />
					<Input v-model="passObject.newPass" label="Nova Senha" type="password" class="input-pass" />
					<Input
						v-model="passObject.confirmNewPass"
						label="Confirme sua nova senha"
						type="password"
						class="input-pass"
					/>
				</div>
				<div class="flex gap-2 justify-center xs:flex-row flex-col">
					<Button only-border :size="size" @click="resetPassForm">Cancelar</Button>
					<Button :size="size" @click="handleChangePass">Salvar</Button>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<style scoped lang="scss">
@import '../../style/var.scss';

.actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.5em;
}

.circle-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background: $gray-500;
	border-radius: 50%;
	color: white;
	cursor: pointer;

	&:hover {
		background: $green-dark;
	}
}

.circle-icon.active {
	background: $green-dark;

	&:hover {
		background: $green-800;
	}
}

.photo-name {
	@apply flex gap-2 md:flex-row flex-col items-center;

	.material-symbols-rounded {
		font-size: 9em;
		color: $green-dark;
	}

	.name-input {
		font-size: 2em;
		font-weight: 600;
		color: $green-dark;
		padding: 0.2em 0.5em;
		border-radius: 16px;
		border: 0.1em transparent solid;
		max-width: 100%;

		&:focus {
			outline: none;
		}
	}

	.name-input.active {
		border-color: $gray-300;
	}
}

h1 {
	color: $green-dark;
}

.input-pass {
	min-width: 60vw;
}

@media screen and (max-width: 768px) {
	.photo-name .name-input {
		font-size: 1.5em;
		text-align: center;
	}
}
</style>
