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
        const chartColors = ['#23b73c', '#ed0000', '#0973f5', '#23b772', '#ed002b', '#09aaf5'];
        const isCompare = ref(false);
        const reportDate = ref({
            chartCategories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            compareCategories: [[1991, 1992], [1993, 1994], [1995, 1996], [1997, 1998], [1999, 2000], [2001, 2002], [2003, 2004], [2005, 2006]]
        });
        const series = ref([
            {
                name: 'Ganhos',
                type: 'line',
                data: [23, 45, 70, 60, 80, 95, 100, 120],
            },
            {
                name: 'Custos',
                type: 'line',
                data: [15, 30, 45, 40, 50, 60, 70, 80],
            },
            {
                name: 'Lucro Líquido',
                type: 'line',
                data: [8, 15, 25, 20, 30, 35, 30, 40],
            },
            // {
            //     name: 'Ganhos',
            //     type: 'bar',
            //     data: [23, 45, 70, 60, 80, 95, 100, 120],
            // },
            // {
            //     name: 'Custos',
            //     type: 'bar',
            //     data: [15, 30, 45, 40, 50, 60, 70, 80],
            // },
            // {
            //     name: 'Lucro Líquido',
            //     type: 'bar',
            //     data: [8, 15, 25, 20, 30, 35, 30, 40],
            // },
        ]);

		return {
			defaultAlert: ref({
				top: true,
				right: true,
				timeout: 3500,
			}),
            series,
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
                        value: 'updated_at',
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
                        value: 'updated_at',
                        sortable: true,
                    },
                    {
                        text: 'Salários',
                        value: 'despesas trabalhistas',
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
                profit: [],
                cost: [],
            }),
            isCompare,
            chartColors,
            reportDate,
            loading: ref({
                report: false,
                profit: false,
                costs: false,
            }),
            showDialog: ref(false),
            formatCurrency,
		};
	},

    computed: {
        chartOptions() {
            return {
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
                        colors: this.chartColors,
                    }
                },
                colors: this.chartColors,
                xaxis: {
                    categories: this.reportDate.chartCategories,
                    overwriteCategories: this.reportDate.compareCategories,
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
                        const item = this.isCompare ? this.reportDate.compareCategories[dataPointIndex] : this.reportDate.chartCategories[dataPointIndex];
                        return `<div class="custom-tooltip" style="width: max-content">
                            <div class="date" style="display: flex; justify-content: center; background: #eceff1; padding: 8px 8px;">
                                ${this.isCompare ? `${item[0]} - ${item[1]}` : item}
                            </div>
                            <div class="data-tooltip" style="display: grid; gap: 12px; ${this.isCompare ? 'grid-template-columns: 1fr 1fr;' : 'grid-template-columns: 1fr;'}">
                                <div style="padding: 15px 15px; display: grid; gap: 12px;">
                                    ${this.series.filter((nothing, index) => index < 3).map((s, index) => `
                                        <div style="display: flex; flex-direction: row; align-items: center; width: 250px;">
                                            <span class="tooltip-circle" style="background: ${this.chartColors[index]}; height: 10px; width: 10px; border-radius: 50%; margin-right: 10px;"></span>
                                            <p style="margin-right: 10px; font-size: 15px; margin-bottom: 0px;">
                                                ${s.name}:
                                            </p>
                                            <p style="font-weight: bold; font-size: 14px; margin-bottom: 0px;">
                                                ${formatCurrency(s.data[dataPointIndex])}
                                            </p>
                                        </div>`
                                    ).join('')}
                                </div>
                                ${this.isCompare ? `
                                    <div style="padding: 15px 15px; display: grid; gap: 12px;">
                                        ${this.series.filter((nothing, index) => index >= 3).map((s, index) => `
                                            <div style="display: flex; flex-direction: row; align-items: center; width: 250px;">
                                                <span class="tooltip-circle" style="background: ${this.chartColors[index + 3]}; height: 10px; width: 10px; border-radius: 50%; margin-right: 10px;"></span>
                                                <p style="margin-right: 10px; font-size: 15px; margin-bottom: 0px;">
                                                    ${s.name}:
                                                </p>
                                                <p style="font-weight: bold; font-size: 14px; margin-bottom: 0px;">
                                                    ${formatCurrency(s.data[dataPointIndex])}
                                                </p>
                                            </div>`
                                        ).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>`
                    }
                },
            }
        }
    },

    async created() {
        await this.getAllData();
    },

	methods: {
        async generateReport(period = [], period2 = []) {
            try {
                this.showDialog = false;
                this.loading.report = true;
                // this.isCompare = !!period.length && !!period2.length;
                const { data } = await financeController.generateReport(period, period2);
                // tratar dados
            } catch (e) {
                this.$alert({
					message: 'Erro ao gerar o relatório de finanças. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            } finally {
                this.loading.report = false;
            }
        },

        async getAllData() {
            await this.getProfits();
            await this.getCosts();
            await this.generateReport();
        },

        async getProfits(period = []) {
            try {
                this.loading.profit = true;
                const { data } = await profitController.listProfits(period);
                this.data.profit = data;
            } catch (e) {
                this.$alert({
					message: 'Erro carregar os lucros. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            } finally {
                this.loading.profit = false;
            }
        },

        async getCosts(period = []) {
            try {
                this.loading.costs = true;
                const { data } = await costController.listCosts(period);
                this.data.cost = data;
            } catch (e) {
                this.$alert({
					message: 'Erro carregar as despesas. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            } finally {
                this.loading.costs = false;
            }
        },

        async deleteProfit(index, childIndex, id) {
            try {
                this.loading.profit = true;
                await profitController.deleteProfit(id);
        
                if (this.data.profit[index] && this.data.profit[index].childs[childIndex]) {
                    const child = this.data.profit[index].childs[childIndex];
                    this.data.profit[index].total -= child.valor;
                    this.data.profit[index][child.tipo] -= child.valor;
                    this.data.profit[index].childs.splice(childIndex, 1);
                }

                this.$alert({
                    type: 'success',
					message: 'Lucro deletado com sucesso',
					...this.defaultAlert,
				});
            } catch (e) {
                this.$alert({
					message: 'Erro ao deletar lucro. Tente novamente mais tarde ' + e,
					...this.defaultAlert,
				});
            } finally {
                this.loading.profit = false;
            }
        },

        async deleteCost(index, childIndex, id) {
            try {
                this.loading.costs = true;
                await costController.deleteCost(id);

                
                if (this.data.cost[index] && this.data.cost[index].childs[childIndex]) {
                    const child = this.data.cost[index].childs[childIndex];
                    this.data.cost[index].total -= child.valor;
                    this.data.cost[index][child.tipo] -= child.valor;
                    this.data.cost[index].childs.splice(childIndex, 1);
                }

                this.$alert({
                    type: 'success',
					message: 'Despesa deletada com sucesso',
					...this.defaultAlert,
				});
            } catch (e) {
                this.$alert({
					message: 'Erro ao deletar despesa. Tente novamente mais tarde',
					...this.defaultAlert,
				});
            } finally {
                this.loading.costs = false;
            }
        },
	},
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <h1 class="title">Finanças</h1>
        <Button class="w-fit self-end" @click="showDialog = true" :disabled="loading.report">Gerar Relatório</Button>
        <FinanceDialog v-model="showDialog" @generate-report="generateReport" />
        <div class="flex flex-wrap gap-4 [&>*]:w-full">
            <Card v-for="total in totals" class="total-card">
                <div class="skeleton skeleton-card-title" v-if="loading.report" />
                <h6 v-else>{{ total.name }}</h6>
                <div class="skeleton skeleton-card-content" v-if="loading.report" />
                <p :class="total.value" v-else>{{ formatCurrency(total.total) }}</p>
            </Card>
        </div>
        <Card v-if="!loading.report">
            <apexchart
                width="100%"
                height="300px"
                :options="chartOptions"
                :series="series"
            ></apexchart>
        </Card>
    </div>
    <GenericTable
        title="Lucros"
        :headers="headers.profit"
        :items="data.profit"
        :loading="loading.profit"
        add-route="/"
        @filter-data="getProfits"
        @delete-item="deleteProfit"
    />
    <GenericTable
        title="Despesas"
        :headers="headers.cost"
        :items="data.cost"
        :loading="loading.cost"
        add-route="/financas/despesa"
        @filter-data="getCosts"
        @delete-item="deleteCost"
    />
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
