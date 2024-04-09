<template>
    <div class="flex flex-col w-full mt-[3em]">
        <div class="w-fullflex flex-col gap-3">
            <div class="mb-3">
                <div class="flex flex-row w-full justify-between align-middle">
                    <h2 class="text-[2.5em] font-bold">Gado</h2>
                    <div class="flex flex-row flex-wrap gap-2 content-center">
                        <Button>Mais detalhes</Button>
                        <Button>Adicionar</Button>
                    </div>
                </div>
                <div class="w-fit flex flex-row">
                    <Input />
                </div>
            </div>
            <Table :items="gadoData" :headers="headers" class="w-full">
                <template #actions="{ item, index }">
                    <td class="w-2 cursor-pointer">
                        <span class="material-symbols-rounded">
                            more_vert
                        </span>
                    </td>
                </template>
                <template #nome="{ item, index }">
                    <td>
                        {{ item.nome }}
                    </td>
                </template>
                <template #proxInseminacao="{ item, index }">
                    <td>
                        {{ item.proxima_insem ? item.proxima_insem : "-" }}
                    </td>
                </template>
                <template #prevParto="{ item, index }">
                    <td>
                        {{
                            item.prev_parto
                                ? new Date(item.prev_parto).toLocaleDateString()
                                : "-"
                        }}
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
                            :class="
                                item.lactante
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            "
                        >
                            {{ item.lactante ? "done" : "close" }}
                        </span>
                    </td>
                </template>
                <template #status="{ item, index }">
                    <td>
                        {{ item.status }}
                    </td>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
import { useFetchs } from "./useFetchs.js";
import { reactive, ref } from "vue";
import Table from "../../components/Table.vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";

export default {
    name: "Gado",
    components: { Table, Button, Input },
    inject: ["Auth"],
    setup() {
        const gadoData = ref([]);
        const { getBaseData } = useFetchs(gadoData);

        const headers = ref([
            { text: "Nome", value: "nome", sortable: true },
            {
                text: "Prox.Inseminação",
                value: "proxInseminacao",
                sortable: true,
            },
            { text: "Prev.Parto", value: "prevParto", sortable: true },
            { text: "Sêmem", value: "semem", sortable: true },
            {
                text: "Lactante",
                value: "lactante",
                sortable: true,
                align: "center",
            },
            { text: "Status", value: "status", sortable: true },
        ]);
        return {
            gadoData,
            headers,
            getBaseData,
        };
    },

    async beforeMount() {
        await this.getBaseData();
    },
};
</script>

<style lang=""></style>
