import { reactive, ref, toRefs } from "vue"
import { useFetchs } from "./useFetchs.js";

export function useGado(allData) {

    const { getAllData } = useFetchs(allData);

    const state = reactive({
        moreDetails: ref(false),
        headersDialog: ref([
            { text: "Nome", value: "nome", sortable: true },
            { text: "Crias", value: "crias", sortable: true },
            { text: "DP", value: "dp", sortable: true },
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
            { text: "Num.Insem", value: "numInsem", sortable: true },
            { text: "Status", value: "status", sortable: true },
        ]),
        headers: ref([
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
        ])
    })

    async function createDialog() {
        state.moreDetails = true;
        const data = await getAllData();
        console.log("data fetch all", data);
        allData.value = data;
    }


    return {
        ...toRefs(state, allData),
        createDialog,
    }
}