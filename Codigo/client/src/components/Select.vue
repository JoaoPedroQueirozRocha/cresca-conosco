<script>
import { ref } from 'vue';
import SelectContainer from './SelectContainer.vue';

export default {
    name: 'Select',
    components: { SelectContainer },
    props: {
        modelValue: Array | Date,
        items: Array,
        expanded: {
            type: Boolean,
            default: false
        },
        label: String,
        labelKey:  {
            type: String,
            default: 'label'
        },
    },
    emits: ['update:modelValue', 'update:expanded'],
    setup() {
        return {
            isExpanded: ref(),
            model: ref(),
        }
    },

    created() {
        if (this.modelValue) {
            this.model = this.modelValue;
        } else {
            this.model = [];
        }
    
        this.isExpanded = this.expanded;
    },

    watch: {
        modelValue() {
            this.model = this.modelValue;
        },
        expanded() {
            this.isExpanded = this.expanded;
        }
    },

    methods: {
        changeExpanded(value) {
            this.isExpanded = value;
            this.$emit('update:expanded', this.isExpanded);
        },

        changeModel(value) {
            this.model = value;
            this.changeExpanded(false);
            this.$emit('update:modelValue', this.model);
        },
    }
}
</script>

<template>
    <SelectContainer v-model="isExpanded" @update:model-value="changeExpanded" :label="label">
        <template #status>
            <p v-if="model[labelKey] || model" class="status-text">{{ model[labelKey] ? model[labelKey] : model }}</p>
            <slot v-else />
        </template>
        <template #item>
            <div v-for="(item, index) in items" :key="index" class="items-holder">
                <div
                    class="item"
                    :class="{'active': item == model}"
                    @click="changeModel(item)"
                >
                    {{ item[labelKey] ? item[labelKey] : item }}
                </div>
            </div>
        </template>
    </SelectContainer>
</template>


<style scoped lang="scss">
@import "../style/var.scss";

.items-holder {
    @apply divide-y-[.1em] divide-gray-100;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.item {
    @apply w-full flex justify-center items-center cursor-pointer;
    color: $gray-500;
    padding: 0.1em 0.5em;
    font-size: 16px;

    &:hover {
        background: $green-100;
        color: $green-dark;
    }
}

.item.active {
    background: $green-100;
    color: $green-dark;
}

.status-text {
    font-size: 16px;
    color: $gray-500;
}
</style>
