

<script>
import { ref } from "vue";
import Card from "./Card.vue";
import Input from "./Input.vue";
import Checkbox from "./Checkbox.vue";
import Select from "./Select.vue";
import Icon from "./Icon.vue";
import File from "./File.vue";
import Button from "./Button.vue";
import { parseFile } from "@/util";

export default {
    name: "ImportData",
    props: {
        modelValue: Object,
        options: Array,
        values: Array,
        map: Boolean,
    },
    emits: ['update:modelValue', 'update:values', 'update:map'],
    components: { Card, Input, Checkbox, Select, File, Icon, Button },
    inject: ["Auth"],

    setup() {
        const file = ref(null);
        const headers = ref([]);
        const deletedHeaders = ref([]);
        const mapData = ref(false);

        return {
            file,
            headers,
            mapData,
            deletedHeaders,
        }
    },

    computed: {
        parsedOptions() {
            const options = [];
            this.options.forEach((option) => {
                if (!this.headers.find((header) => option == header.to)) options.push(option);
            });
            return options;
        }
    },

    methods: {
        async changeModel(file) {
            if (!file) return;

            const parsedFile = await parseFile(file);
            this.headers = parsedFile[0].map((header) => {
                return {
                    from: header,
                    map: true,
                    to: '',
                };
            });
            parsedFile.splice(0, 1);
            const values = [...parsedFile];

            this.$emit('update:modelValue', this.headers);
            this.$emit('update:value', values);
        },

        deleteHeader(index) {
            this.headers[index].map = false;
            this.headers[index].to = '';
            this.deletedHeaders.push(index);
            this.$emit('update:modelValue', this.headers);
        },

        addHeader() {
            if (!this.deletedHeaders.length) return;
            const index = this.deletedHeaders[0];
            this.headers[index].map = true;
            this.deletedHeaders.splice(0, 1);
            this.$emit('update:modelValue', this.headers);
        }
    },
};
</script>

<template>
    <Card class="flex flex-col gap-4 mb-4">
        <File v-model="file" @update:model-value="changeModel" />
        <Checkbox v-model="mapData" @update:model-value="(value) => { $emit('update:map', value) }" v-if="file">Mapear dados</Checkbox>
        <template v-if="mapData && file">
            <div v-for="(header, index) in headers.filter((h) => h.map)" :key="index" class="flex items-center gap-4">
                <Input class="flex-1" v-model="header.from" disabled />
                <Icon class="arrow-icon" name="arrow_forward" />
                <Select class="flex-1" v-model="header.to" :items="parsedOptions" />
                <Icon class="delete-icon" name="delete" @click="deleteHeader(headers.findIndex((h) => h.from == header.from))" />
            </div>
            <div v-if="deletedHeaders.length">
                <Button rounded @click="addHeader">
                    <Icon name="add" />
                </Button>
            </div>
        </template>
    </Card>
</template>


<style lang="scss" scoped>
@import "../style/var.scss";

.arrow-icon {
    color: $green-dark;
}

.delete-icon {
    @apply cursor-pointer;
    color: $gray-500;

    &:hover {
        color: $red-strong;
    }
}
</style>