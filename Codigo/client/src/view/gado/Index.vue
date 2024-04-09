<template>
    <div class="flex flex-col w-full mt-[3em]">
        <div class="w-fullflex flex-col gap-3">
            <div class="mb-3">
                <div class="flex flex-row w-full justify-between align-middle">
                    <h2 class="title mb-3">Gado</h2>
                    <div class="flex flex-row flex-wrap gap-2 content-center">
                        <Button @click="createDialog">Mais detalhes</Button>
                        <Button>Adicionar</Button>
                    </div>
                </div>
                <div class="w-full flex flex-row justify-between">
                    <div>
                        <Input type="search" class="bg-white" />
                    </div>
                    <div>
                        <span class="material-symbols-rounded round-icon">
                            filter_list
                        </span>
                    </div>
                <div class="w-full flex flex-row justify-between">
                    <div>
                        <Input type="search" class="bg-white" />
                    </div>
                    <div>
                        <span class="material-symbols-rounded round-icon">
                            filter_list
                        </span>
                    </div>
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
            <Dialog v-model="moreDetails">
                <Table :items="allData" :headers="headersDialog" maxHeight="85vh">
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
            </Dialog>
        </div>
    </div>
    </div>
</template>

<script>
import { useFetchs } from "./useFetchs.js";
import { useGado } from "./useGado.js";
import { reactive, ref } from "vue";
import Table from "../../components/Table.vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import Dialog  from "../../components/Dialog.vue";

export default {
    name: "Gado",
    components: { Table, Button, Input, Dialog },
    inject: ["Auth"],
    setup() {
        const gadoData = ref([]);
        const allData = ref([])
        const { getBaseData } = useFetchs(gadoData);
        const { createDialog, moreDetails, headersDialog } = useGado(allData);

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
            allData,
            headers,
            headersDialog,
            getBaseData,
            createDialog,
            moreDetails
        };
    },

    async beforeMount() {
        await this.getBaseData();
    },
};
</script>

<style lang="scss" scoped>
@import "../../style/var.scss";

.round-icon {
    cursor: pointer;
    color: white;
    padding: 5px;
    font-size: 35px;
    background: $green-dark;
    border-radius: 50%;
}
</style>
