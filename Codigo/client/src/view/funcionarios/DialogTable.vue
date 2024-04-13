<template> <Table :items="allData" :headers="headers" maxHeight="85vh">
    <template #nome="{item, index}">
        <td>
            {{ item.nome }}
        </td>
        </template>

        <template #salario="{item, index}">
        <td>
            {{ item.salario }}
        </td>
        </template>

        <template #cargo="{item, index}">
        <td>
            {{ item.cargo }}
        </td>
        </template>

        <template #clt="{item, index}">
        <td>
            {{ item.clt }}
        </td>
        </template>
    </Table>   
</template>

<script>
import Table from "@/components/Table.vue";

export default {
    name: 'BasicTable',
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
        Table
    },
}
</script>

<style lang=""></style>