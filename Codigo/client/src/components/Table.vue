<script>
export default {
    name: 'Table',
    props: {
        header: Array,
        items: Array,
        options: Object,
        isLoading: Boolean,
    },

    methods: {
        sortBy(value, isDesc = false) {}
    }
}
</script>

<template>
    <div class="table-holder">
        <table>
            <thead>
                <tr>
                    <th
                        v-for="header, index in headers"
                        :key="index"
                        class="cursor-pointer"
                        :class="{'pointer-events-none': !header.sortable}"
                        :style="{ width: header.width ? header.width : 'fit-content' }"
                        @click="sortBy(header.value, sortDesc[header.value] = !sortDesc[header.value])"
                    >
                        <div class="flex w-full items-center gap-2" v-if="!loading" :style="{'justify-content': header.align ? header.align : 'flex-start'}">
                            <p class="truncate">{{ header.text }}</p>
                            <span
                                v-if="header.sortable"
                                class="h-fit w-fit flex items-center transition-transform ease-in-out duration-300 icon"
                                :class="{'rotate-180': sortDesc[header.value], 'icon-active': header.value === sortByName}"
                            >
                                <!-- <BIcon name="arrow-up"/> -->
                            </span>
                        </div>
                        <td v-else class="skeleton-table-cell">
                            <div class="skeleton-table-div" />
                        </td>
                    </th>
                </tr>
            </thead>
            <tbody v-if="isLoading || !items.lenght">
            </tbody>
            <tbody v-else>
                <template v-for="item, index in pagedItems" :key="index">
                    <tr class="[&>*]:py-2 [&>*]:px-4">
                        <slot v-for="header in headers" :key="header.value" :name="header.value" :item="item" :index="index" />
                        <slot v-if="$slots.actions" name="actions" :item="item" :index="index" />
                    </tr>
                    <slot name="childs" :item="item" :index="index" v-if="item.expanded" />
                </template>

            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.table-holder {
    overflow: auto;
}

table {
    tbody {
        @apply divide-y-[.1em] divide-stone-100 w-full;

        tr {
            &:first-child, &:last-child {
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
            }
        }
    }

    thead {

        :last-child {
            &:first-child, &:last-child {
                border-bottom-left-radius: 16px;
                border-bottom-right-radius: 16px;
            }
        }
    }
}
</style>