<script>
import { ref } from 'vue';
import SelectContainer from './SelectContainer.vue';

export default {
    name: 'DatePicker',
    components: { SelectContainer },
    props: {
        modelValue: Array | Date,
        maxDate: Date,
        minDate: Date,
        isCompare: {
            type: Boolean,
            default: false
        },
        expanded: {
            type: Boolean,
            default: false
        },
    },
    emits: ['update:modelValue', 'update:expanded'],
    setup() {
        return {
            hidePass: ref(true),
            onFocus: ref(false),
            isExpanded: ref(),
            month: ref([]),
            weekDays: ref(['D', 'S', 'T', 'Q', 'Q', 'S', 'S']),
            model: ref(),
            title: ref(),
            today: ref(new Date()),
        }
    },

    created() {
        this.model = this.modelValue;
        this.isExpanded = this.expanded;
        this.getArrayMonthDay(this.today);
    },

    watch: {
        modelValue() {
            this.model = this.modelValue
        },
        expanded() {
            this.isExpanded = this.expanded;
        }
    },

    methods: {
        changeExpanded(value) {
            this.isExpanded = value;
            this.$emit('update:modelValue', this.isExpanded);
        },

        changeModel(value) {
            this.model = value;
            this.$emit('update:modelValue', this.model);
        },

        getArrayMonthDay(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const maxDays = new Date(year, month + 1, 0).getDate();
            let day = 1;
            this.month = [];
            for (let i = 0; i < 6; i++) {
                const week = [];
                for (let j = 0; j < 7; j++) {
                    if ((i === 0 && j < firstDay) || day > maxDays) {
                        week.push('');
                    } else {
                        const newDate = new Date(year, month, day);
                        week.push(newDate);
                        day++;
                    }
                }
                this.month.push(week);
            }
        },

        formateDate() {}
    }
}
</script>

<template>
    <SelectContainer v-model="isExpanded" @update:model-value="changeModel" icon="calendar_month">
        <template #item>
            <div class="w-fit">
                <div class="flex items-center justify-between gap-2">
                    <div class="chevron">
                        <span class="material-symbols-rounded">
                            chevron_left
                        </span>
                    </div>
                    <Transition>
                        <h1 class="text-base font-bold cursor-pointer">{{ title }}</h1>
                    </Transition>
                    <div class="chevron">
                        <span class="material-symbols-rounded">
                            chevron_right
                        </span>
                    </div>
                </div>
                <div>
                    <Transition>
                        <table>
                            <tr class="date-space table-header">
                                <th v-for="(weekDay, index) in weekDays" :key="index">{{ weekDay }}</th>
                            </tr>
                            <tr v-for="(week, index) in month" :key="index" class="date-space">
                                <td v-for="(day, index) in week" :key="index">
                                    <div v-if="day" class="day">
                                        {{ day.getDate() }}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </Transition>
                </div>
            </div>
        </template>
    </SelectContainer>
</template>


<style scoped lang="scss">
@import "../style/var.scss";


.date-space {
    @apply [&>*]:p-[.5em];
}

.table-header {
    color: $gray-500;
}

.chevron {
    display: flex;
    align-items: center;
    border-radius: 50%;
    padding: 0.1em;
    cursor: pointer;
    color: $gray-500;
    transition-duration: 0.3s;

    &:hover {
        background: $gray-200;
    }

    .material-symbols-rounded {
        font-size: 30px;
    }
}

.day {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $gray-500;
    border-radius: 50%;
    padding: 0.2em 0.35em;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: white;
        background: $green-100;
    }
}

.day.selected {
    color: white;
    background: $green-dark;

    &:hover {
        background: $green-dark;
    }
}
</style>