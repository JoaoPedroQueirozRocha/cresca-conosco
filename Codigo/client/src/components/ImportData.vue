

<script>
import { ref } from "vue";
import Card from "./Card.vue";
import Input from "./Input.vue";
import Checkbox from "./Checkbox.vue";
import Select from "./Select.vue";
import Icon from "./Icon.vue";
import File from "./File.vue";
import { parseFile } from "@/util";

export default {
    name: "ImportData",
    props: {
        modelValue: Object,
        options: Array,
    },
    emits: ['update:modelValue'],
    components: { Card, Input, Checkbox, Select, File, Icon },
    inject: ["Auth"],

    setup() {
        const file = ref(null);
        const headers = ref([]);
        const parsedOptions = ref([]);
        const values = ref([]);
        const mapData = ref(false);

        return {
            file,
            headers,
            values,
            mapData,
            parsedOptions,
        }
    },

    created() {
        this.parsedOptions = this.options;
    },

    watch: {
        modelValue() {
            this.headers = this.modelValue;
        },
        options() {
            this.parsedOptions = this.options;
        }
    },

    methods: {
        async changeModel(file) {
            if (!file) return;

            const parsedFile = await parseFile(file);
            this.headers = parsedFile[0].map((header) => {
                return {
                    from: header,
                    to: '',
                };
            });
            parsedFile.splice(0, 1);
            this.values = [...parsedFile];
            console.log(this.values)

            this.$emit('update:modelValue', this.model);
        }
    },
};
</script>

<template>
    <Card class="flex flex-col gap-4 mb-4">
        <File v-model="file" @update:model-value="changeModel" />
        <Checkbox v-model="mapData" v-if="file">Mapear dados</Checkbox>
        <template v-if="mapData && file">
            <div v-for="(header, index) in headers" :key="index" class="flex items-center gap-4">
                <Input class="flex-1" v-model="header.from" disabled />
                <Icon class="arrow-icon" name="arrow_forward" />
                <Select class="flex-1" v-model="headers.to" :items="options" />
            </div>
        </template>
    </Card>
</template>


<style lang="scss" scoped>
@import "../style/var.scss";

.arrow-icon {
    color: $green-dark;
}
</style>