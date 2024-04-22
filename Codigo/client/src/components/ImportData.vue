

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
        const mapData = ref(false);

        return {
            file,
            headers,
            mapData,
        }
    },

    watch: {
        modelValue() {
            this.headers = this.modelValue;
        }
    },

    methods: {
        async changeModel(file) {
            const parsedFile = await parseFile(file);
            this.headers = parsedFile[0].map((header) => {
                return {
                    from: header,
                    to: '',
                };
            });
            this.$emit('update:modelValue', this.model);
        }
    },
};
</script>

<template>
    <Card class="flex flex-col gap-4 mb-4">
        <File v-model="file" @update:model-value="changeModel" />
        <Checkbox v-model="mapData" v-if="file">Mapear dados</Checkbox>
        <template v-if="mapData">
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