<script>
import { ref } from "vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Checkbox from "@/components/Checkbox.vue";
import Icon from "@/components/Icon.vue";
import DatePicker from "@/components/DatePicker.vue";
import Card from "@/components/Card.vue";
import { formatCurrency, formatDate, upperCaseFirstLetter } from "@/util";

export default {
	name: "GenericTable",
    props: {
        items: Array,
        headers: Array,
        loading: Boolean,
        title: String,
        addRoute: String
    },
	components: { Table, Button, Input, DatePicker, Checkbox, Icon, Card },
    inject: ["Auth"],
	setup() {
		return {
            searchValue: ref(''),
			opendedIndex: ref(null),
			opendedChildIndex: ref(null),
            formatCurrency,
            formatDate,
            upperCaseFirstLetter,
		};
	},
    
	mounted() {
		document.addEventListener('click', this.closeCard);
        const app = document.querySelector('#app');
		app.addEventListener('scroll', this.closeCard);
		const table = document.querySelector('.finance-table');
		table.addEventListener('scroll', this.closeCard);
	},

	beforeUnmount() {
		document.removeEventListener('click', this.closeCard);
        const app = document.querySelector('#app');
		app.removeEventListener('scroll', this.closeCard);
		const table = document.querySelector('.finance-table');
		table.removeEventListener('scroll', this.closeCard);
	},

    computed: {
        filteredData() {
            if (!this.searchValue) return this.items;
            return this.items.filter((item) => {
                return Object.values(item).some((value) => {
                    const stringValue = String(value);
                    return stringValue.includes(this.searchValue);
                });
            });
        }
    },

    methods: {
        positionCard(item, index, cIndex) {
			this.setExpanded();
			const card = this.$refs['card' + index + cIndex][0]?.$el
			const rect = card?.parentElement?.getBoundingClientRect();

            if (!card || !rect) return;

			card.style.left = rect.left - 40 + 'px';
			card.style.top = rect.top + 30 + 'px';
			item.expanded = true;
			this.opendedIndex = index;
			this.opendedChildIndex = cIndex;
		},

		closeCard(event) {
			const card = this.$refs['card' + this.opendedIndex + this.opendedChildIndex];
            if (!card) return;
            const cardParent = card[0]?.$el?.parentElement;
			if (this.opendedIndex == null || this.opendedChildIndex == null || (cardParent && event.target.closest('.actions') === cardParent)) return;
			this.setExpanded();
		},

		setExpanded() {
            if (this.opendedIndex == null || this.opendedChildIndex == null) return;

			const item = this.filteredData[this.opendedIndex]?.childs[this.opendedChildIndex];
			if (!item) return;
			item.expanded = false;
			this.opendedIndex = null;
			this.opendedChildIndex = null;
		},
    },
};
</script>

<template>
    <div class="flex flex-col gap-6 mt-12">
        <div class="flex items-center gap-4">
            <h1 class="title" style="margin: 0;">{{ title }}</h1>
            <router-link :to="addRoute" :class="{'pointer-events-none': loading}">
                <Button rounded :disabled="loading">
                    <span class="material-symbols-rounded">
                        add
                    </span>
                </Button>
            </router-link>
        </div>
        <div class="flex items-center justify-between gap-4 flex-wrap">
            <Input v-model="searchValue" type="search" class="filter-input" placeholder="Pesquisar" :disabled="loading" />
            <Button class="filter-button" rounded :disabled="loading">
                <span class="material-symbols-rounded">
                    filter_list
                </span>
            </Button>
        </div>
        <Table :headers="headers" :items="filteredData" :loading="loading" class="finance-table">
            <template v-for="(header, index) in headers" :key="index" v-slot:[header.value]="{ item }">
                <td v-if="item[header.value] instanceof Date">
                    {{ upperCaseFirstLetter(formatDate(item[header.value], { month: 'long' })) }}/{{ formatDate(item[header.value], { year: 'numeric' }) }}
                </td>
                <td v-else-if="typeof item[header.value] == 'number'" class="text-center">
                    <div class="flex items-center justify-center">
                        {{ formatCurrency(item[header.value]) }}
                        <span class="material-symbols-rounded text-xl ml-2 opacity-0">
                            arrow_upward
                        </span>
                    </div>
                </td>
                <td v-else-if="header.value == 'none'" class="w-2">
                    <div class="icon-holder" :class="{'rotate-180': item.expanded}" @click="item.expanded = !item.expanded">
                        <Icon name="arrow_drop_down" />
                    </div>
                </td>
                <td v-else>{{ item[header.value] }}</td>
            </template>
            <template #actions></template>
            <template #childs="{ item, index }">
                <tr
                    v-for="(child, cIndex) in item.childs"
                    :key="cIndex"
                    class="child-tr"
                >
                    <td
                        v-for="(header, hIndex) in headers"
                        :key="hIndex"
                        class="border-gray-200 border-t-[.1em]"
                        :class="{'text-center': header.value != 'date'}"
                    >
                        <template v-if="child.type == header.value">
                            <Icon name="check" class="text-green-500" />
                            <span class="material-symbols-rounded text-xl ml-2 opacity-0">
                                arrow_upward
                            </span>
                        </template>
                        <template v-else-if="header.value == 'date' && child.date instanceof Date">
                            {{ formatDate(child.date, { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                        </template>
                        <template v-else-if="header.value == 'total' && typeof child.value == 'number'">
                            <div class="flex items-center justify-center">
                                {{ formatCurrency(child.value) }}
                                <span class="material-symbols-rounded text-xl ml-2 opacity-0">
                                    arrow_upward
                                </span>
                            </div>
                        </template>
                    </td>
                    <td class="border-gray-200 border-t-[.1em] w-2 actions">
                        <div class="icon-holder action" @click="positionCard(child, index, cIndex)">
                            <Icon name="more_vert" />
                        </div>
						<Card
							:ref="'card' + index + cIndex"
							class="fixed"
							v-show="child.expanded"
							tabindex="0"
							@blur="child.expanded = false"
						>
							teste
						</Card>
                    </td>
                </tr>
            </template>
            <template #empty-state>
                <Icon name="sentiment_dissatisfied" />
            </template>
        </Table>
    </div>
</template>

<style scoped lang="scss">
@import "../../../style/var.scss";

td {
    color: $gray-500;
}

.icon-holder {
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 50%;
    padding: 0.1em 0.15em;
    cursor: pointer;
    color: $gray-500;
    transition-duration: 0.3s;

    &:hover {
        background: $gray-200;
    }

    .material-symbols-rounded {
        font-size: 35px;
    }
}

.icon-holder.action {
    &:hover {
        background: $gray-300;
    }

    .material-symbols-rounded {
        font-size: 30px;
    }
}

.child-tr {
    @apply [&>*]:py-2 [&>*]:px-4;
    background: $gray-200;
}

.filter-button .material-symbols-rounded {
    font-size: 30px;
}

.filter-input {
    min-width: 25em;
}

@media screen and (max-width: 488px) {
    .filter-input {
        min-width: 100%;
    }
}
</style>
