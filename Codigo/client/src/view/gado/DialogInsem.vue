<template>
	<Dialog v-model="model" @update:model-value="changeModel">
		<div class="flex">
			<div>
				<h1 class="title">{{ animalData.nome }}</h1>
			</div>
		</div>
	</Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import Card from '@/components/Card.vue';
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
    emits: ["update:modelValue", "change"],
    watch: {
      modelValue() {
        this.model = this.modelValue;
      },
    },
	components: {
		Dialog,
		Card,
	},
	setup() {
		return {
			model: ref(false)
		}
	},

	mounted() {
		this.model = this.dialogModel;
		console.log(this.animalData);
	},

	methods: {
		changeModel(value) {
			this.model = value;
			this.$emit("update:modelValue", this.model);
		},
	}
};
</script>
