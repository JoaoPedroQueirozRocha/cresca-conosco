<template>
	<div class="flex flex-col w-full mt-[3em]">
		<div class="w-fullflex flex-col gap-4">
			<div class="mb-6">
				<div class="flex flex-row w-full justify-between align-middle mb-4">
					<h2 class="title">Gado</h2>
					<div class="flex flex-row flex-wrap gap-2 content-center">
						<Button @click="createDialog">Mais detalhes</Button>
						<router-link to="/gado/vaca">
							<Button>Adicionar</Button>
						</router-link>
					</div>
				</div>
				<div class="flex items-center justify-between gap-4 flex-wrap">
					<Input v-model="searchValue" :disabled="isLoading" type="search" class="filter-input" placeholder="Pesquisar" />
					<div class="relative filter-holder" ref="filterCard">
                        <Button class="filter-button" :disabled="isLoading" rounded @click="showFilter = true">
                            <Icon name="filter_list" class="round-icon" />
                        </Button>
                        <Filter v-model="filterOptions" class="top-12 right-0 absolute z-50 filter" v-show="showFilter" />
                    </div>
				</div>
			</div>
			<Table :items="filteredDate" :headers="headers" class="w-full gado-table" :loading="isLoading">
				<template #actions="{ item, index }">
					<td class="w-2 cursor-pointer action">
						<div class="icon-holder" @click="positionCard(item, index)">
                    		<Icon name="more_vert"  @click="positionCard(item, index)" />
                        </div>
						<Card
							:ref="'card' + index"
							class="fixed action-card"
							v-show="item.expanded"
							tabindex="0"
							@blur="item.expanded = false"
						>
							<router-link to="/">
                                <div class="action-option">
                                    <Icon name="edit" />
                                    Editar
                                </div>
                            </router-link>
							<div class="action-option delete" @click="confirmDeletion(item.id)">
                                <Icon name="delete" />
                                Deletar
                            </div>
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
				<template #semen="{ item, index }">
					<td class="text-center">
						{{ item.semem }}
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
						{{ item.status }}
					</td>
				</template>
				<template #empty-state>
					<div class="empty-div">
						<Icon name="sentiment_dissatisfied" />
						<p>Sem dados para exibir</p>
					</div>
				</template>
			</Table>
			<Dialog v-model="moreDetails" :width="'100%'">
				<DialogTable :headers="headersDialog" :allData="allData" :isDialogLoading="isDialogLoading" />
			</Dialog>
		</div>
	</div>
</template>

<script>
import { useGado } from './useGado.js';
import { ref } from 'vue';
import Table from '@/components/Table.vue';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import Filter from '@/components/Filter.vue';
import Dialog from '@/components/Dialog.vue';
import DialogTable from './DialogTable.vue';

export default {
	name: 'Gado',
	components: { Table, Button, Input, Dialog, DialogTable, Card, Icon, Filter },
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
        const filterOptions = ref([
            {
                text: 'Seca',
                value: 'seca',
                selected: false,
            },
            {
                text: 'Lactante',
                value: 'lactante',
                selected: false,
            },
            {
                text: 'Grávida',
                value: 'gravida',
                selected: false,
            },
            {
                text: 'Sêmen',
                value: 'semem',
                childs: [
                    {
                        text: '5/8',
                        value: '5/8',
                        selected: false,
                    },
                    {
                        text: 'gir',
                        value: 'gir',
                        selected: false,
                    },
                ]
            },
        ]);

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
			filterOptions,
			filterCard: ref(),
			showFilter: ref(false),
			opendedIndex: ref(null),
            searchValue: ref(''),
		};
	},

	computed: {
		filteredDate() {
			let filteredData = this.gadoData;
            if (this.getSelected.length) {
                filteredData = filteredData.filter((item, index) => {
                    let returnItem = false;
                    this.getSelected.forEach((selected) => {
						if (returnItem) return;

                        if (selected.fatherValue) {
                            returnItem = item[selected.fatherValue] == selected.value;
                        }
                        else if (item[selected.value]) {
                            returnItem = !!item[selected.value];
                        }
                    });
					if (returnItem) return item;
                });
            }

            if (!this.searchValue) return filteredData;

			return filteredData.filter((item) => {
				return Object.values(item).some((value) => {
                    const stringValue = String(value);
                    return stringValue.includes(this.searchValue);
                });
			});
		},
		
        getSelected() {
            const selected = [];
            this.filterOptions.forEach((option) => {
                if (option.childs) {
                    const selectedChilds = option.childs.filter((child) => child.selected).map((child) => {
                        return {
                            ...child,
                            fatherValue: option.value,
                        };
                    });
                    return selected.push(...selectedChilds);
                }
                else if (option.selected) return selected.push(option);
            });
            return selected;
        },
	},

	async beforeMount() {
		await this.loadBaseData();
		console.log('gadoData');
	},

	mounted() {
		document.addEventListener('click', this.closeCards);
        const app = document.querySelector('#app');
		app.addEventListener('scroll', this.closeCard);
		const table = document.querySelector('.gado-table');
		table.addEventListener('scroll', this.closeCard);
	},

	beforeUnmount() {
		document.removeEventListener('click', this.closeCards);
        const app = document.querySelector('#app');
		app.removeEventListener('scroll', this.closeCard);
		const table = document.querySelector('.gado-table');
		table.removeEventListener('scroll', this.closeCard);
	},

	methods: {
		positionCard(item, index) {
			this.setExpanded();
			const card = this.$refs['card' + index]?.$el;
			const rect = card.parentElement.getBoundingClientRect();

			item.expanded = true;
			setTimeout(() => {
                const windowHeight = window.innerHeight;
                const cardHeight = card.offsetHeight;
                const height = rect.top + 40 + cardHeight;
                card.style.left = rect.left - 100 + 'px';
                if (height > windowHeight) {
                    delete card.style.top;
                    card.style.bottom = 0;
                } else {
                    card.style.top = rect.top + 40 + 'px';
                }
            }, 10);

			this.opendedIndex = index;
		},

		closeCard(event) {
			const cardParent = this.$refs['card' + this.opendedIndex]?.$el?.parentElement;
			if (this.opendedIndex == null || (cardParent && event.target.closest('.action') === cardParent)) return;
			this.setExpanded();
		},

		closeCards(event) {
			this.closeCard(event);
			this.closeFilterCard(event);
		},

		closeFilterCard(event) {
			if (this.filterCard == event.target.closest('.filter-holder') || event.target.closest('.filter')) return;
			this.showFilter = false;
		},

		setExpanded() {
			const item = this.gadoData[this.opendedIndex];
			if (!item) return;
			item.expanded = false;
			this.opendedIndex = null;
		},

        async confirmDeletion(id) {
            const result = await this.$confirm({
                title: 'Tem certeza que deseja deletar esse item?'
            });
			// Tratar dados
            if (result) ()=>{};
        }
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

.empty-div {
    @apply flex flex-col items-center justify-center gap-4 p-4;
    color: $gray-400;

    .material-symbols-rounded {
        font-size: 100px;
    }
}

.action-card {
    @apply p-3 flex flex-col gap-2;
}

.action-option {
    @apply flex items-center gap-4 cursor-pointer p-2 font-bold;
    color: $gray-500;
    border-radius: 8px;
    
    &:hover {
        background: $gray-200;
    }
}

.action-option.delete {
    color: $red-strong;
    
    &:hover {
        background: $red-light;
    }
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
