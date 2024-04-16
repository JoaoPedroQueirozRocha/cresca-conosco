<template>
	<Dialog v-model="dialogModel">
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

export default {
	name: 'DialogInsem',
	props: {
		animalData: {
			type: Array,
			required: true,
		},
		dialogModel: {
			type: Boolean,
			required: true,
		},
	},
	components: {
		Dialog,
		Card,
	},
	setup() {},

	mounted() {
		console.log('this.animalData');
	},
};
</script>
