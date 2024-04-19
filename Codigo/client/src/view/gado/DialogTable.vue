<template>
	<Dialog v-model="model" @update:model-value="cancelar" width="100%" overflowHidden>
		<!-- Dialog header components -->
		<div class="flex flex-col gap-2">
			<div class="flex flex-row justify-between">
				<h1 class="title">Mais Detalhes</h1>
				<Icon name="close" @click="cancelar" class="cursor-pointer close-button" />
			</div>
			<div class="flex flex-row justify-between mb-4">
				<Input v-model="searchValue" type="search" placeholder="Pesquisar" class="filter-input" />
				<div class="relative filter-holder" ref="filterCard">
					<Button class="filter-button" rounded @click="showFilter = true">
						<Icon name="filter_list" class="round-icon" />
					</Button>
					<Filter v-model="filterOptions" class="top-12 right-0 absolute z-50 filter" v-show="showFilter" />
				</div>
			</div>
		</div>
		<!-- Dialog body components -->
		<Table
			:items="filteredData"
			:headers="headersDialog"
			maxHeight="85vh"
			class="w-full"
			:loading="isDialogLoading"
		>
			<template #nome="{ item, index }">
				<td>
					{{ item.nome }}
				</td>
			</template>
			<template #crias="{ item, index }">
				<td class="text-center">{{ item.crias ? item.crias : 0 }}</td>
			</template>
			<template #dataInsem="{ item, index }">
				<td>
					{{ item.data_insem ? formatDateString(item.data_insem) : '-' }}
				</td>
			</template>
			<template #prevParto="{ item, index }">
				<td>
					{{ item.prev_parto ? formatDateString(item.prev_parto) : '-' }}
				</td>
			</template>
			<template #touro="{ item, index }">
				<td class="text-center">
					{{ item.touro }}
					<Icon name="arrow_upward" class="text-xl ml-2 opacity-0" />
				</td>
			</template>
			<template #lactante="{ item, index }">
				<td class="text-center">
					<Icon
						:name="item.lactante ? 'done' : 'close'"
						:class="item.lactante ? 'text-green-500' : 'text-red-500'"
					/>
					<Icon name="arrow_upward" class="text-xl ml-2 opacity-0" />
				</td>
			</template>
			<template #status="{ item, index }">
				<td>
					<Tag :color="getColor(item.status)" :text="item.status || 'Não inseminada'" />
				</td>
			</template>
			<template #empty-state>
				<div class="empty-div">
					<Icon name="sentiment_dissatisfied" />
					<p>Sem dados para exibir</p>
				</div>
			</template>
		</Table>
	</Dialog>
</template>

<script>
import Table from '@/components/Table.vue';
import Icon from '@/components/Icon.vue';
import Tag from '@/components/Tag.vue';
import Dialog from '@/components/Dialog.vue';
import Filter from '@/components/Filter.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { getColor, formatDateString } from '@/util/index';
import { useGado } from './composables/useGado';
import { ref } from 'vue';

export default {
	name: 'DialogTable',
	props: {
		allData: {
			type: Array,
			required: true,
		},
		isDialogLoading: {
			type: Boolean,
			required: true,
		},
	},
	components: {
		Table,
		Icon,
		Tag,
		Dialog,
		Filter,
		Input,
		Button,
	},
	setup() {
		const { headersDialog } = useGado();
		return {
			searchValue: ref(''),
			headersDialog,
			showFilter: ref(false),
			getColor,
			formatDateString,
		};
	},

	methods: {
		closeFilterCard(event) {
			if (this.filterCard == event.target.closest('.filter-holder') || event.target.closest('.filter')) return;
			this.showFilter = false;
		},
		changeModel(value) {
			this.model = value;
			this.$emit('update:modelValue', this.model); // Emitindo o evento
		},
		cancelar() {
			this.changeModel(false);
		},
	},

	computed: {
		filteredData() {
			if (!this.searchValue) return this.allData;

			return this.allData.filter((item) => {
				return Object.values(item).some((value) => {
					const stringValue = String(value);
					return stringValue.toLowerCase().includes(this.searchValue.toLowerCase());
				});
			});
		},
	},
};
</script>

<style scoped lang="scss">
@import '../../style/var.scss';

.empty-div {
	@apply flex flex-col items-center justify-center gap-4 p-4;
	color: $gray-400;

	.material-symbols-rounded {
		font-size: 100px;
	}
}

.close-button {
	font-size: 30px;
}
</style>
