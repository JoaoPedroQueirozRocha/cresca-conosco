<script>
import VueApexCharts from "vue3-apexcharts";
import { formatCurrency } from "../../util";
import { ref } from "vue";
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";
import FinanceDialog from "./components/FinanceDialog.vue";
import GenericTable from "./components/GenericTable.vue";
import profitController from "@/controller/profit";
import costController from "@/controller/cost";
import financeController from "@/controller/finance";

export default {
	name: "Finance",
	components: { Card, Button, FinanceDialog, GenericTable, apexchart: VueApexCharts },
    inject: ["Auth"],
	setup() {
        const chartColors = ['#23b73c', '#ed0000', '#0973f5'];
        const isCompare = ref(false);
        const reportDate = ref({
            chartCategories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            compareCategories: [[1991, 1992], [1993, 1994], [1995, 1996], [1997, 1998]]
        });
        const series = ref([
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
        ]);
        const chartOptions = ref({
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
                    colors: chartColors,
                }
            },
            colors: chartColors,
            xaxis: {
                categories: reportDate.value.chartCategories,
                overwriteCategories: reportDate.value.compareCategories,
            },
            yaxis: [
                {
                    title: {
                        text: 'Valores',
                    },
                    labels: {
                        formatter: function (value) {
                            return formatCurrency(value);
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
            tooltip: {
                enabled: true,
                custom: ({ s, seriesIndex, dataPointIndex, w }) => {
                    const item = isCompare.value ? reportDate.value.compareCategories[dataPointIndex] : reportDate.value.chartCategories[dataPointIndex];
                    return `<div class="custom-tooltip" style="width: max-content">
                        <div class="date" style="display: flex; justify-content: center; background: #eceff1; padding: 8px 8px;">
                            ${isCompare.value ? `${item[0]} - ${item[1]}` : item}
                        </div>
                        <div class="data-tooltip" style="padding: 15px 15px; display: flex; flex-direction: column; gap: 12px;">
                            ${series.value.map((s, index) => `
                                <div style="display: flex; flex-direction: row; align-items: center; width: 250px;">
                                    <span class="tooltip-circle" style="background: ${chartColors[index]}; height: 10px; width: 10px; border-radius: 50%; margin-right: 10px;"></span>
                                    <p style="margin-right: 10px; font-size: 15px; margin-bottom: 0px;">
                                        ${s.name}:
                                    </p>
                                    <p style="font-weight: bold; font-size: 14px; margin-bottom: 0px;">
                                        
                                        ${formatCurrency(s.data[dataPointIndex])}
                                    </p>
                                </div>`
                            ).join('')}
                        </div>
                    </div>`
                }
            },
        });
		return {
			defaultAlert: ref({
				top: true,
				right: true,
				timeout: 3500,
			}),
            series,
            chartOptions,
            totals: ref([
                {
                    name: 'Ganhos',
                    value: 'profit',
                    total: 200,
                },
                {
                    name: 'Custos',
                    value: 'costs',
                    total: 180,
                },
                {
                    name: 'Lucro Líquido',
                    value: 'receita',
                    total: 20,
                },
            ]),
            headers: ref({
                profit: [
                    {
                        value: 'none',
                    },
                    {
                        text: 'Mês/Ano',
                        value: 'date',
                        sortable: true,
                    },
                    {
                        text: 'Leite',
                        value: 'leite',
                        sortable: true,
                        align: 'center',
                    },
                    {
                        text: 'Venda de gado',
                        value: 'venda',
                        sortable: true,
                        align: 'center',
                    },
                    {
                        text: 'Total',
                        value: 'total',
                        sortable: true,
                        align: 'center',
                    },
                ],
                cost: [
                    {
                        value: 'none',
                    },
                    {
                        text: 'Mês/Ano',
                        value: 'mes-ano',
                        sortable: true,
                    },
                    {
                        text: 'Salários',
                        value: 'salarios',
                        sortable: true,
                        align: 'center',
                    },
                    {
                        text: 'Encargos',
                        value: 'encargos',
                        sortable: true,
                        align: 'center',
                    },
                    {
                        text: 'Compras',
                        value: 'compras',
                        sortable: true,
                        align: 'center',
                    },
                    {
                        text: 'Total',
                        value: 'total',
                        sortable: true,
                        align: 'center',
                    },
                ],
            }),
            data: ref({
                profit: [
                    {
                        date: new Date(),
                        leite: 6,
                        venda: 6,
                        total: 12,
                        childs: [
                            {
                                description: 'Teste',
                                value: 6,
                                type: 'leite',
                                date: new Date(),
                            },
                            {
                                description: 'Teste',
                                value: 6,
                                type: 'venda',
                                date: new Date(),
                            },
                        ],
                    }
                ],
                cost: [
                    {
                        description: 'Teste',
                        value: 12,
                        type: 'compras',
                        date: new Date(),
                    }
                ],
            }),
            isCompare,
            loading: ref(false),
            showDialog: ref(false),
            formatCurrency,
		};
	},

    async created() {
        await this.getAllData();
    },

	methods: {
        async generateReport(period = [], period2 = []) {
            try {
                this.showDialog = false;
                this.loading = true;
                this.isCompare = !!period.length && !!period2.length;
                const { data } = await financeController.generateReport(period, period2);
                // tratar dados
            } catch (e) {
                this.$alert({
					message: 'Error ao gerar o relatório de finanças. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            } finally {
                this.loading = false;
            }
        },

        async getAllData() {
            this.loading = true;
            await this.getProfits();
            await this.getCosts();
            await this.generateReport();
            this.loading = false;
        },

        async getProfits() {
            try {
                const { data } = await profitController.listProfits();
                this.data.profit = data;
            } catch (e) {
                this.$alert({
					message: 'Error carregar os lucros. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            }
        },

        async getCosts() {
            try {
                const { data } = await costController.listCosts();
                this.data.cost = data;
                this.filteredData.cost = data
            } catch (e) {
                this.$alert({
					message: 'Error carregar as despesas. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            }
        },
	},
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <h1 class="title">Finanças</h1>
        <Button class="w-fit self-end" @click="showDialog = true">Gerar Relatório</Button>
        <FinanceDialog v-model="showDialog" @generate-report="generateReport" @update:model-value="()=>{console.log('aui')}" />
        <div class="flex flex-wrap gap-4 [&>*]:w-full">
            <Card v-for="total in totals" class="total-card">
                <div class="skeleton skeleton-card-title" v-if="loading" />
                <h6 v-else>{{ total.name }}</h6>
                <div class="skeleton skeleton-card-content" v-if="loading" />
                <p :class="total.value" v-else>{{ formatCurrency(total.total) }}</p>
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
    </div>
    <GenericTable title="Lucros" :headers="headers.profit" :items="data.profit" :loading="loading" add-route="/" />
    <GenericTable title="Despesas" :headers="headers.cost" :items="data.cost" :loading="loading" add-route="/" />
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

.profit {
    color: $green-strong;
}

.costs {
    color: $red-strong;
}

.receita {
    color: $blue-strong;
}

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
