<script>
import { ref } from "vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Checkbox from "@/components/Checkbox.vue";
import DatePicker from "@/components/DatePicker.vue";

export default {
	name: "GenericTable",
    props: {
        items: Array,
        headers: Array,
        loading: Boolean,
        title: String,
        addRoute: String
    },
	components: { Table, Button, Input, DatePicker, Checkbox },
    inject: ["Auth"],
	setup() {
		return {
            searchValue: ref('')
		};
	},

    computed: {
        filteredData() {
            if (!this.searchValue) return this.items;
            return this.items.filter((item) => {
                return Object.values(item).some((value) => {
                    const stringValue = String(value);
                    return stringValue.includes(this.searchValue);
                });
            });
        }
    },
};
</script>

<template>
    <div class="flex flex-col gap-6 mt-12">
        <div class="flex items-center gap-4">
            <h1 class="title" style="margin: 0;">{{ title }}</h1>
            <router-link :to="addRoute">
                <Button rounded>
                    <span class="material-symbols-rounded">
                        add
                    </span>
                </Button>
            </router-link>
        </div>
        <div class="flex items-center justify-between gap-4 flex-wrap">
            <Input v-model="searchValue" type="search" class="filter-input" placeholder="Pesquisar" />
            <Button class="filter-button" rounded>
                <span class="material-symbols-rounded">
                    filter_list
                </span>
            </Button>
        </div>
        <Table :headers="headers" :items="filteredData" :loading="loading"></Table>
    </div>
</template>

<style scoped lang="scss">
@import "../../../style/var.scss";

.filter-button .material-symbols-rounded {
    font-size: 30px;
}

.filter-input {
    min-width: 25em;
}

@media screen and (max-width: 488px) {
    .filter-input {
        min-width: 100%;
    }
}
</style>
