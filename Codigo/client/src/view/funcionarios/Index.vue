<template>
	<div class="flex flex-col w-full mt-[3em]">
		<div class="w-fullflex flex-col gap-3">
			<div class="mb-3">
				<div class="flex flex-row w-full justify-between items-center align-middle my-4">
					<h2 class="title mt-0">Funcionários</h2>
					<router-link to="/funcionario">
						<Button>Adicionar</Button>
					</router-link>
				</div>

				<div class="w-full flex items-center justify-between gap-4 flex-wrap mb-8">
					<Input v-model="searchValue" :disabled="isLoading" type="search" class="filter-input" placeholder="Pesquisar" />
					<div class="relative filter-holder" ref="filterCard">
						<Button class="filter-button" :disabled="isLoading" rounded @click="showFilter = true">
							<Icon name="filter_list" class="round-icon" />
						</Button>
						<Filter
							v-model="filterOptions"
							class="top-12 md:left-auto md:right-0 left-0 absolute z-50 filter"
							v-show="showFilter"
						/>
					</div>
				</div>
			</div>

			<Table :items="funcionarioData" :headers="headers" class="w-full funcionarios-table" :loading="isLoading">
				<template #actions="{ item, index }">
					<td class="w-2 cursos-pointer action">
						<div class="icon-holder" @click="positionCard(item, index)">
							<Icon name="more_vert" @click="positionCard(item, index)" />
						</div>
						<Card
							:ref="'card' + index"
							class="fixed action-card"
							v-show="item.expanded"
							tabindex="0"
							@blur="item.expanded = false"
						>
							<router-link :to="`/funcionario/${item.id}`">
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
					<td>{{ item.nome }}</td>
				</template>

				<template #salario="{ item, index }">
					<td>{{ item.salario }}</td>
				</template>

				<template #cargo="item, index">
					<td>{{ item.cargo }}</td>
				</template>

				<template #clt="{ item, index }">
					<td>
						<Icon name="check" class="text-green-500" v-if="item.clt" />
						<Icon name="close" class="text-red-500" v-else />
					</td>
				</template>

				<template #empty-state>
					<div class="empty-div">
						<Icon name="sentiment_dissatisfied" />
						<p>Sem dados para exibir</p>
					</div>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
import { ref } from "vue";
import  Button  from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import Table from "@/components/Table.vue";
import Icon from "@/components/Icon.vue";
import Checkbox from "@/components/Checkbox.vue";
import Filter from "@/components/Filter.vue";
import { useFetchs } from "./useFetchs.js";


export default {
    name: "Funcionarios",
    components:{
        Button, Card, Input, Table, Icon, Checkbox, Filter
    },
    setup(){
        const funcionarioData = ref([]);
        const { getBaseData, isLoading } = useFetchs(funcionarioData);
        const headers = ref([
            {
                text: 'Nome',
                value: 'nome',
                sortable: true,
            },
            {
                text: 'Salário',
                value: 'salario',
                align: 'center',
                sortable: true,
            },
            {
                text: 'Cargo',
                value: 'cargo',
                sortable: true,
            },
            {
                text: 'CLT',
                value: 'clt',
                align: 'center',
                sortable: true,
            },
        ]);
        const filterOptions = ref([
            {
                text: 'CLT',
                value: 'clt',
                selected: false,
            },
            {
                text: 'Cargo',
                value: 'cargo',
                childs: [
                    {
                        text: 'Administrador',
                        value: 'administrador',
                        selected: false,
                    },
                    {
                        text: 'Administrador',
                        value: 'administrador',
                        selected: false,
                    },
                    {
                        text: 'Administrador',
                        value: 'administrador',
                        selected: false,
                    },
                ]
            },
        ]);

        return {
            funcionarioData,
            getBaseData,
            headers,
            filterOptions,
            isLoading,
			filterCard: ref(),
			showFilter: ref(false),
			opendedIndex: ref(null),
            searchValue: ref(''),
        };
    },

	computed: {
		filteredDate() {
            let filteredData = this.funcionarioData;
			if (getSelected.value.length) {
				filteredData = filteredData.filter((item) => {
					const returnItem = {};
		
					getSelected.value.forEach((selected) => {
						if (selected.fatherValue) {
							returnItem[selected.fatherValue] = returnItem[selected.fatherValue] || item[selected.fatherValue] == selected.value
						} else {
							returnItem[selected.value] =  !!item[selected.value];
						}
					});
					const keys = Object.keys(returnItem).filter((key) => returnItem[key]);
					if (keys.length == Object.keys(returnItem).length) return item;
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

	mounted() {
		document.addEventListener('click', this.closeCards);
        const app = document.querySelector('#app');
		app.addEventListener('scroll', this.closeCard);
		const table = document.querySelector('.funcionarios-table');
		table.addEventListener('scroll', this.closeCard);
	},

	beforeUnmount() {
		document.removeEventListener('click', this.closeCards);
        const app = document.querySelector('#app');
		app.removeEventListener('scroll', this.closeCard);
		const table = document.querySelector('.funcionarios-table');
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

td {
    color: $gray-500;
}

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

@media screen and (max-width: 488px) {
	.filter-input {
		min-width: 100%;
	}
}
</style>
