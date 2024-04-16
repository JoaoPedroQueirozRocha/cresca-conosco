
import { reactive, toRefs, computed } from "vue";

export function useFilter(gadoData, filterOptions, searchValue) {

    const state = reactive({
        gadoData,
        filterOptions,
        searchValue
    });

    const getSelected = computed(() => {
        const selected = [];
        state.filterOptions.forEach((option) => {
            if (option.childs) {
                const selectedChilds = option.childs
                    .filter((child) => child.selected)
                    .map((child) => ({
                        ...child,
                        fatherValue: option.value,
                    }));
                selected.push(...selectedChilds);
            } else if (option.selected) {
                selected.push(option);
            }
        });
        return selected;
    });

    const filteredData = computed(() => {
        let data = state.gadoData;
        if (getSelected.value.length) {
            data = data.filter((item) => {
                let returnItem = false;
                getSelected.value.forEach((selected) => {
                    if (returnItem) return;

                    if (selected.fatherValue) {
                        returnItem = item[selected.fatherValue] == selected.value;
                    } else if (item[selected.value]) {
                        returnItem = !!item[selected.value];
                    }
                });
                if (returnItem) return item;
            });
        }

        if (!state.searchValue) return data;

        return data.filter((item) => {
            return Object.values(item).some((value) => {
                const stringValue = String(value);
                return stringValue.toLowerCase().includes(state.searchValue.toLowerCase());
            });
        });
    });

    return {
        getSelected,
        filteredData
    }

}

