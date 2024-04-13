import { reactive, ref, toRefs } from "vue"
import { useFetchs } from "./useFetchs.js";

export function useGado() {

    const { getAllData, getBaseData } = useFetchs();

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
            { text: "Sêmen", value: "semen", align: "center", sortable: true },
            {
                text: "Lactante",
                value: "lactante",
                sortable: true,
                align: "center",
            },
            { text: "Status", value: "status", sortable: true },
        ]),
        isLoading: ref(false),
        isDialogLoading: ref(false),
        allData: ref([]),
        gadoData: ref([]),
    })

    async function loadBaseData() {
        try {
            state.isLoading = true;
            state.gadoData = await getBaseData();
        } catch (e) {
            console.error(e);
        } finally {
            state.isLoading = false;
        }
    }

    async function createDialog() {
        try {
            state.isDialogLoading = true;
            state.moreDetails = true;
            state.allData = await getAllData();
        } catch (e) {
            console.error(e);
        } finally {
            state.isDialogLoading = false;
        }

    }


    return {
        ...toRefs(state),
        createDialog,
        loadBaseData,
    }
}

