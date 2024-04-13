<template>
	<Table :items="filteredDate" :headers="headers" maxHeight="85vh" class="w-full" :loading="isDialogLoading">
		<template #nome="{ item, index }">
			<td>
				{{ item.nome }}
			</td>
		</template>
		<template #crias="{ item, index }">
			<td>
				{{ item.crias }}
			</td>
		</template>
		<template #dp="{ item, index }">
			<td>
				{{ item.dias_parida }}
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
		<template #numInsem="{ item, index }">
			<td>
				{{ item.num_insem }}
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
</template>

<script>
import Table from '@/components/Table.vue';
import Icon from '@/components/Icon.vue';
import { ref } from 'vue';

export default {
	name: 'DialogTable',
	props: {
		headers: {
			type: Array,
			required: true,
		},
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
	},
	setup() {
		return {
            searchValue: ref(''),
		}
	},
	
	computed: {
		filteredDate() {
            if (!this.searchValue) return this.allData;

			return this.allData.filter((item) => {
				return Object.values(item).some((value) => {
                    const stringValue = String(value);
                    return stringValue.includes(this.searchValue);
                });
			});
		}
	},
};
</script>

<style scoped lang="scss">
@import "../../style/var.scss";

.empty-div {
    @apply flex flex-col items-center justify-center gap-4 p-4;
    color: $gray-400;

    .material-symbols-rounded {
        font-size: 100px;
    }
}
</style>
