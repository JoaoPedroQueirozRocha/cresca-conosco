<template>
	<div class="flex flex-col w-full mt-[3em]">
		<div class="w-fullflex flex-col gap-3">
			<div class="mb-3">
				<div class="flex flex-row w-full justify-between align-middle">
					<h2 class="text-[2.5em] font-bold">Gado</h2>
					<div class="flex flex-row flex-wrap gap-2 content-center">
						<Button @click="createDialog">Mais detalhes</Button>
						<router-link to="/gado/create">
							<Button>Adicionar</Button>
						</router-link>
					</div>
				</div>
				<div class="flex items-center justify-between gap-4 flex-wrap">
					<Input type="search" class="filter-input" placeholder="Pesquisar" />
					<Button class="filter-button" rounded>
						<span class="material-symbols-rounded">
							filter_list
						</span>
					</Button>
				</div>
			</div>
			<Table :items="gadoData" :headers="headers" class="w-full gado-table" :isLoading="isLoading">
				<template #actions="{ item, index }">
					<td class="w-2 cursor-pointer action">
						<div class="icon-holder" @click="positionCard(item, index)">
							<span class="material-symbols-rounded" @click="positionCard(item, index)"> more_vert </span>
                        </div>
						<Card
							:ref="'card' + index"
							class="fixed"
							v-show="item.expanded"
							tabindex="0"
							@blur="item.expanded = false"
						>
							teste
						</Card>
					</td>
				</template>
				<template #nome="{ item, index }">
					<td>
						{{ item.nome }}
					</td>
				</template>
				<template #proxInseminacao="{ item, index }">
					<td>
						{{ item.proxima_insem ? item.proxima_insem : '-' }}
					</td>
				</template>
				<template #prevParto="{ item, index }">
					<td>
						{{ item.prev_parto ? new Date(item.prev_parto).toLocaleDateString() : '-' }}
					</td>
				</template>
				<template #semem="{ item, index }">
					<td>
						{{ item.semem }}
					</td>
				</template>
				<template #lactante="{ item, index }">
					<td class="flex flex-row justify-center items-center">
						<span
							class="material-symbols-rounded"
							:class="item.lactante ? 'text-green-500' : 'text-red-500'"
						>
							{{ item.lactante ? 'done' : 'close' }}
						</span>
					</td>
				</template>
				<template #status="{ item, index }">
					<td>
						{{ item.status }}
					</td>
				</template>
			</Table>
			<Dialog v-model="moreDetails" :width="'100%'">
				<DialogTable :headers="headersDialog" :allData="allData" :isDialogLoading="isDialogLoading" />
			</Dialog>
		</div>
	</div>
</template>

<script>
import { useFetchs } from './useFetchs.js';
import { useGado } from './useGado.js';
import { reactive, ref } from 'vue';
import Table from '../../components/Table.vue';
import Button from '../../components/Button.vue';
import Input from '../../components/Input.vue';
import Dialog from '../../components/Dialog.vue';
import DialogTable from './DialogTable.vue';
import Card from '../../components/Card.vue';

export default {
	name: 'Gado',
	components: { Table, Button, Input, Dialog, DialogTable, Card },
	inject: ['Auth'],
	setup() {
		const {
			gadoData,
			allData,
			headersDialog,
			headers,
			isLoading,
			isDialogLoading,
			loadBaseData,
			createDialog,
			moreDetails,
		} = useGado();

		return {
			gadoData,
			allData,
			headersDialog,
			headers,
			isLoading,
			isDialogLoading,
			loadBaseData,
			createDialog,
			moreDetails,
			opendedIndex: ref(null),
		};
	},

	async beforeMount() {
		await this.loadBaseData();
		console.log('gadoData');
	},

	mounted() {
		document.addEventListener('click', this.closeCard);
		document.addEventListener('scroll', this.closeCard);
		const table = document.querySelector('.gado-table');
		table.addEventListener('scroll', this.closeCard);
	},

	beforeUnmount() {
		document.removeEventListener('click', this.closeCard);
		document.removeEventListener('scroll', this.closeCard);
		const table = document.querySelector('.gado-table');
		table.removeEventListener('scroll', this.closeCard);
	},

	methods: {
		positionCard(item, index) {
			this.setExpanded();
			const card = this.$refs['card' + index]?.$el;
			const rect = card.parentElement.getBoundingClientRect();

			card.style.left = rect.left - 40 + 'px';
			card.style.top = rect.top + 30 + 'px';
			item.expanded = true;
			this.opendedIndex = index;
		},

		closeCard(event) {
			const cardParent = this.$refs['card' + this.opendedIndex]?.$el?.parentElement;
			if (this.opendedIndex == null || (cardParent && event.target.closest('.action') === cardParent)) return;
			this.setExpanded();
		},

		setExpanded() {
			const item = this.gadoData[this.opendedIndex];
			if (!item) return;
			item.expanded = false;
			this.opendedIndex = null;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../../style/var.scss';

.icon-holder {
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 50%;
    padding: 0.1em;
    cursor: pointer;
    color: $gray-500;
    transition-duration: 0.3s;

    &:hover {
        background: $gray-200;
    }

    .material-symbols-rounded {
        font-size: 30px;
    }
}


.filter-button .material-symbols-rounded {
    font-size: 30px;
}

.filter-input {
    min-width: 25em;
}

@media screen and (max-width: 768px) {
	.dialog-div {
        width: 90vw;
    }
}

@media screen and (max-width: 488px) {
    .filter-input {
        min-width: 100%;
    }
}
</style>
