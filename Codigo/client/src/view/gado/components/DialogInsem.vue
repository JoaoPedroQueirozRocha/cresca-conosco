<template>
	<Dialog
		v-model="model"
		@update:model-value="cancelar"
		width="70%"
		height="fit-content"
		:noOverflow="!(dateOpened.data_insem || dateOpened.prev_parto)"
	>
		<div class="dialog-div" :class="{ bigger: dateOpened.data_insem || dateOpened.prev_parto }">
			<div>
				<h1 class="title">{{ animalData.nome }}</h1>
			</div>
			<div class="w-[100%] flex flex-col gap-4">
				<div class="flex md:flex-row flex-col gap-4">
					<Select
						class="flex-1"
						label="Status"
						@update:model-value="changeDisabled"
						v-model="gestacaoData.status"
						:items="options"
					/>
					<Select class="flex-1" label="Touro (semem)" v-model="gestacaoData.touro" :items="optionsTouro" />
				</div>
				<DatePicker
					label="Data Inseminação"
					v-model:expanded="dateOpened.data_insem"
					:max-date="new Date()"
					v-model="gestacaoData.data_insem"
				/>
				<DatePicker
					label="Previsão parto"
					v-model:expanded="dateOpened.prev_parto"
					:min-date="new Date()"
					v-model="gestacaoData.prev_parto"
					:disabled="isDisabled"
				/>
			</div>
			<div class="flex flex-row gap-4 justify-end">
				<Button @click="cancelar" only-border :disabled="loading">Cancelar</Button>
				<Button @click="salvarGestacao()" :loading="loading">Salvar</Button>
			</div>
		</div>
	</Dialog>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import Card from "@/components/Card.vue";
import Tab from "@/components/Tab.vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import DatePicker from "@/components/DatePicker.vue";
import Button from "@/components/Button.vue";
import gestacaoController from "@/controller/gestacao.js";
import { useEditDialog } from "../composables/useEditDialog.js";
import { ref, reactive, watch } from "vue";

export default {
	name: "DialogInsem",
	props: {
		animalData: { type: Object, required: true },
		modelValue: { type: Boolean, required: false },
		isEdit: Boolean,
	},
	emits: ["update:modelValue", "change"],
	watch: {
		animalData() {
			console.log(this.animalData);
			if (this.animalData.status) {
				this.gestacaoData = {
					animal_id: this.animalData.id,
					id_gestacao: this.animalData.id_gestacao,
					status: this.animalData.status,
					touro: this.animalData.touro,
					data_insem: this.animalData.data_insem ? new Date(this.animalData.data_insem) : null,
					prev_parto: this.animalData.prev_parto ? new Date(this.animalData.prev_parto) : null,
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
			options,
			optionsTouro,
			loading,
			isDisabled,
			dateOpened,
			defaultAlert,
			gestacaoData,
			validateData,
			processarGestacao,
			changeDisabled,
		} = useEditDialog();

		return {
			model: ref(false),
			options,
			optionsTouro,
			gestacaoData,
			defaultAlert,
			loading,
			dateOpened,
			isDisabled,
			validateData,
			processarGestacao,
			changeDisabled,
		};
	},

	mounted() {
		this.model = this.dialogModel;
	},

	methods: {
		changeModel(value) {
			this.model = value;
			this.$emit("update:modelValue", this.model); // Emitindo o evento
		},
		cancelar() {
			this.changeModel(false);
			this.gestacaoData = {
				animal_id: null,
				id_gestacao: null,
				status: "",
				touro: "",
				data_insem: "",
				prev_parto: "" || null,
			};
		},
		async salvarGestacao() {
			if (!this.validateData(this.gestacaoData)) {
				this.showAlert("Preencha todos os campos para salvar a vaca", "error");
			} else {
				this.loading = true;
				try {
					await this.processarGestacao(this.gestacaoData, this.isEdit);
					this.showAlert("Gestação salva com sucesso", "success");
				} catch (error) {
					console.error(error);
					this.showAlert("Erro ao salvar gestação. Tente novamente mais tarde");
				} finally {
					this.cancelar();
					this.$emit("change");
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
