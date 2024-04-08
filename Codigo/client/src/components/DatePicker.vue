<script>
export default {
    name: 'DatePicker',
    props: {
        modelValue: Array,
        maxDate: Date,
        minDate: Date,
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
            model: ref(),
        }
    },

    created() {
        this.model = this.modelValue;
        this.isExpanded = this.expanded;
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
        }
    }
}
</script>

<template>
    <v-menu
        ref="menu"
        v-model="isExpanded"
        class="date-menu"
        :close-on-content-click="false"
        bottom
        transition="scale-y-transition"
        offset-y
        width="283"
    >
        <template v-slot:activator="{ activate }">
            <v-btn
                class="date-button"
                :class="{ 'date-button-open': isExpanded === true }"
                v-on="activate"
                @click="changeExpanded(true)"
            >
            <div class="calendar-date">
                <span class="material-symbols-rounded calendar-icon" :class="[isExpanded ? 'calendar-icon-active' : '']">
                    calendar_month
                </span>
                <span class="date-range">Seleciona o período</span>
            </div>
            <div>
                <span class="material-symbols-rounded" :class="{ 'icon-dropdown ds-blue-color': isExpanded === true }">
                    arrow_drop_down
                </span>
            </div>
            </v-btn>
        </template>
        <v-card class="filters-card" :class="{ 'filters-card-open': isExpanded === true }">
            <v-date-picker
                width="280"
                no-title
                v-model="model"
                range
                class="date-picker"
                locale="ptBr"
                :max="dateToVuetifyString(new Date())"
                @input="changeDatePicker($event)"
            />
            <!-- <div class="date-filters">
                <v-btn class="date-period" @click="selectDateFilter(0)">{{ $t('input.today') }}</v-btn>
                <v-btn class="date-period" @click="selectDateFilter(1)">{{ $t('input.yesterday') }}</v-btn>
                <v-btn class="date-period" @click="selectDateFilter(7)">{{
                    $t('input.dateRange', { days: '7' })
                }}</v-btn>
                <v-btn class="date-period" @click="selectDateFilter(15)">{{
                    $t('input.dateRange', { days: '15' })
                }}</v-btn>
                <v-btn class="date-period" @click="selectDateFilter(30)">{{
                    $t('input.dateRange', { days: '30' })
                }}</v-btn>
                <v-btn class="date-period" @click="selectDateFilter('lastMonth')">{{ $t('input.lastMonth') }}</v-btn>
                </div>
                <div class="clear-date" v-if="selectedDates.length">
                <button class="clear-fields" :disabled="isDateRange === false" @click="clearDate()" type="button">
                    {{ $t('button.clear') }}
                </button>
            </div> -->
        </v-card>
    </v-menu>
</template>