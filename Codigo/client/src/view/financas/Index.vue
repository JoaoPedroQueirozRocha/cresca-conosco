<script>
import VueApexCharts from "vue3-apexcharts";
import { formartCurrency } from "../../util";
import { ref } from "vue";
import Card from "@/components/Card.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Checkbox from "@/components/Checkbox.vue";
import DatePicker from "@/components/DatePicker.vue";
import Dialog from "@/components/Dialog.vue";

export default {
	name: "Perfil",
	components: { Card, Table, Button, Input, Dialog, DatePicker, Checkbox, apexchart: VueApexCharts },
    inject: ["Auth"],
	setup() {
		return {
			defaultAlert: ref({
				top: true,
				right: true,
				timeout: 3500,
			}),
            series: ref([
                {
                    name: 'Ganhos',
                    data: [23, 45, 70, 60, 80, 95, 100, 120],
                },
                {
                    name: 'Custos',
                    data: [15, 30, 45, 40, 50, 60, 70, 80],
                },
                {
                    name: 'Lucro Líquido',
                    data: [8, 15, 25, 20, 30, 35, 30, 40],
                },
            ]),
            chartOptions: ref({
                chart: {
                    id: "vuechart-example",
                    stacked: false
                },
                stroke: {
                    width: 4,
                },
                markers: {
                    size: 0,
                },
                dataLabels: {
                    enabled: false,
                    style: {
                        colors: ['#23b73c', '#ed0000', '#0973f5'],
                    }
                },
                colors: ['#23b73c', '#ed0000', '#0973f5'],
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                },
                tooltip: {
                    enabled: true,
                },
                yaxis: [
                    {
                        title: {
                            text: 'Valores',
                        },
                        labels: {
                            formatter: function (value) {
                                return formartCurrency(value);
                            },
                        },
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                    },
                ],
            }),
            totals: ref([
                {
                    name: 'Ganhos',
                    value: 'ganhos',
                    total: 200,
                },
                {
                    name: 'Custos',
                    value: 'custos',
                    total: 180,
                },
                {
                    name: 'Lucro Líquido',
                    value: 'receita',
                    total: 20,
                },
            ]),
            headers: ref([
                {
                    text: 'Teste',
                    value: 'teste',
                }
            ]),
            loading: ref(false),
            isCompare: ref(false),
            showDialog: ref(false),
            isDateOpened: ref(false),
            isDateOpened2: ref(false),
            formartCurrency,
		};
	},

	methods: {
        gerarRelatorio() {
            this.showDialog = false;
            this.loading = true;
        }
	},
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <h1 class="title">Finanças</h1>
        <Button class="w-fit self-end" @click="showDialog = true">Gerar Relatório</Button>
        <div class="flex flex-wrap gap-4 [&>*]:w-full">
            <Card v-for="total in totals" class="total-card">
                <div class="skeleton skeleton-card-title" v-if="loading" />
                <h6 v-else>{{ total.name }}</h6>
                <div class="skeleton skeleton-card-content" v-if="loading" />
                <p :class="total.value" v-else>{{ formartCurrency(total.total) }}</p>
            </Card>
        </div>
        <Card v-if="!loading">
            <apexchart
                width="100%"
                height="300px"
                type="line"
                :options="chartOptions"
                :series="series"
            ></apexchart>
        </Card>
        <Dialog v-model="showDialog" no-overflow>
            <div class="dialog-div" :class="{'bigger': isDateOpened || isDateOpened2}">
                <div class="flex justify-between">
                    <h1 class="title" style="margin: 0;">Campos do relatório</h1>
                    <div class="close-dialog">
                        <span class="material-symbols-rounded" @click="showDialog = false">
                            close
                        </span>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 w-full">
                    <DatePicker is-compare :max-date="new Date()" class="w-full" label="Período 1" v-model:expanded="isDateOpened">Selecionar período</DatePicker>
                    <DatePicker is-compare :max-date="new Date()" class="w-full" label="Período 2" v-model:expanded="isDateOpened2" v-if="isCompare">Selecionar período</DatePicker>
                </div>
                <Checkbox v-model="isCompare">Comparar dois perídos</Checkbox>
                <Button @click="gerarRelatorio" class="w-fit self-end">Gerar</Button>
            </div>
        </Dialog>
    </div>
    <div class="flex flex-col gap-6 mt-8">
        <div class="flex items-center gap-4">
            <h1 class="title" style="margin: 0;">Receita</h1>
            <Button rounded>
                <span class="material-symbols-rounded">
                    add
                </span>
            </Button>
        </div>
        <div class="flex items-center justify-between gap-4 flex-wrap">
            <Input type="search" class="filter-input" placeholder="Pesquisar" />
            <Button class="filter-button" rounded>
                <span class="material-symbols-rounded">
                    filter_list
                </span>
            </Button>
        </div>
        <Table :headers="headers" :loading="loading"></Table>
    </div>
    <div class="flex flex-col gap-6 mt-8">
        <div class="flex items-center gap-4">
            <h1 class="title" style="margin: 0;">Desepsas</h1>
            <Button rounded>
                <span class="material-symbols-rounded">
                    add
                </span>
            </Button>
        </div>
        <div class="flex items-center justify-between gap-4 flex-wrap">
            <Input type="search" class="filter-input" placeholder="Pesquisar" />
            <Button class="filter-button" rounded>
                <span class="material-symbols-rounded">
                    filter_list
                </span>
            </Button>
        </div>
        <Table :headers="headers" :loading="loading"></Table>
    </div>
</template>

<style scoped lang="scss">
@import "../../style/var.scss";

.total-card {
    flex: 1;
    min-width: 300px;

    h6 {
        font-weight: bold;
        font-size: 20px;
        color: $gray-500;
    }

    p {
        font-weight: bold;
        font-size: 26px;
    }
}

.ganhos {
    color: $green-strong;
}

.custos {
    color: $red-strong;
}

.receita {
    color: $blue-strong;
}

.dialog-div {
    display: flex;
    flex-direction: column;
    gap: 2em;
    width: 60vw;
    min-height: 290px;
    padding: 1em;
    transition-duration: 1s;

    .close-dialog {
        display: flex;
        align-items: center;
        border-radius: 50%;
        padding: 0.1em 0.2em;
        cursor: pointer;
        color: $green-dark;
        transition-duration: 0.3s;

        &:hover {
            background: $gray-200;
        }

        .material-symbols-rounded {
            font-size: 35px;
        }
    }
}

.dialog-div.bigger {
    min-height: 90vh;
}

.filter-button .material-symbols-rounded {
    font-size: 30px;
}

.filter-input {
    min-width: 25em;
}

@media screen and (max-width: 768px) {
	.dialog-div {
        width: 90vw;
    }
}

@media screen and (max-width: 488px) {
    .filter-input {
        min-width: 100%;
    }
}
</style>
