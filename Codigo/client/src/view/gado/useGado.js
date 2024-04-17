import { reactive, ref, toRefs } from "vue"
import { useFetchs } from "./useFetchs.js";

export function useGado() {

    const { getAllData, getBaseData, getAnimal } = useFetchs();

    const state = reactive({
        moreDetails: ref(false),
        showInsemDialog: ref(false),
        headersDialog: ref([
            { text: "Nome", value: "nome", sortable: true },
            { text: "Crias", value: "crias", sortable: true },
            { text: "DP", value: "dp", sortable: true },
            {
                text: "Data.Insem",
                value: "dataInseminacao",
                sortable: true,
            },
            { text: "Prev.Parto", value: "prevParto", sortable: true },
            { text: "Touro", value: "touro", sortable: true },
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
                text: "Data.Insem",
                value: "dataInsem",
                sortable: true,
            },
            { text: "Prev.Parto", value: "prevParto", sortable: true },
            { text: "Touro", value: "touro", align: "center", sortable: true },
            {
                text: "Lactante",
                value: "lactante",
                sortable: true,
                align: "center",
            },
            { text: "Status", value: "status", align: "center", sortable: true },
        ]),
        filterOptions: ref([
            {
                text: 'Seca',
                fatherValue: 'lactante',
                value: false,
                selected: false,
            },
            {
                text: 'Lactante',
                value: 'lactante',
                selected: false,
            },
            {
                text: 'Prenha',
                value: 'confirmada',
                fatherValue: 'status',
                selected: false,
            },
            {
                text: 'Sêmen',
                value: 'touro',
                childs: [
                    {
                        text: '5/8',
                        value: '5/8',
                        selected: false,
                    },
                    {
                        text: 'gir',
                        value: 'gir',
                        selected: false,
                    },
                    {
                        text: 'Touro',
                        value: 'touro',
                        selected: false,
                    },
                ],
            },
        ]),
        isLoading: ref(false),
        isDialogLoading: ref(false),
        allData: ref([]),
        gadoData: ref([]),
        animalData: ref([]),
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

    async function openInsemDialog(id) {
        try {
            state.isDialogLoading = true;
            state.showInsemDialog = true;
            state.animalData = await getAnimal(id);
            console.log("open dialog", state.animalData);
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
        openInsemDialog,
    }
}

