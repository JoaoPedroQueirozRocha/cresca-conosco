<script>
import VueApexCharts from "vue3-apexcharts";
import { formartCurrency } from "../../util";
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
                        value: 'mes-ano',
                        sortable: true,
                    },
                    {
                        text: 'Leite',
                        value: 'leite',
                        sortable: true,
                    },
                    {
                        text: 'Venda de gado',
                        value: 'venda',
                        sortable: true,
                    },
                    {
                        text: 'Total',
                        value: 'total',
                        sortable: true,
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
                    },
                    {
                        text: 'Encargos',
                        value: 'encargos',
                        sortable: true,
                    },
                    {
                        text: 'Compras',
                        value: 'compras',
                        sortable: true,
                    },
                    {
                        text: 'Total',
                        value: 'total',
                        sortable: true,
                    },
                ],
            }),
            data: ref({
                profit: [
                    {
                        description: 'Teste',
                        valor: 12,
                        tipo: 'leite',
                        data: new Date(),
                    }
                ],
                cost: [
                    {
                        description: 'Teste',
                        valor: 12,
                        tipo: 'compras',
                        data: new Date(),
                    }
                ],
            }),
            filteredData: ref({
                profit: [
                    {
                        description: 'Teste',
                        valor: 12,
                        tipo: 'leite',
                        data: new Date(),
                    }
                ],
                cost: [
                    {
                        description: 'Teste',
                        valor: 12,
                        tipo: 'compras',
                        data: new Date(),
                    }
                ],
            }),
            loading: ref(false),
            showDialog: ref(false),
            formartCurrency,
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
                this.filteredData.profit = data;
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
                this.filteredData.cost = data;
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
    </div>
    <GenericTable title="Lucros" :headers="headers.profit" :items="filteredData.profit" :loading="loading" add-route="/" />
    <GenericTable title="Despesas" :headers="headers.cost" :items="filteredData.cost" :loading="loading" add-route="/" />
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
