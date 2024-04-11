<template>
	<Table :items="allData" :headers="headers" maxHeight="85vh">
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
			<td>
				{{ item.semem }}
			</td>
		</template>
		<template #lactante="{ item, index }">
			<td class="flex flex-row justify-center items-center">
				<span class="material-symbols-rounded" :class="item.lactante ? 'text-green-500' : 'text-red-500'">
					{{ item.lactante ? 'done' : 'close' }}
				</span>
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
	</Table>
</template>

<script>
import Table from '@/components/Table.vue';

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
	},
	components: {
		Table,
	},
};
</script>

<style lang=""></style>
