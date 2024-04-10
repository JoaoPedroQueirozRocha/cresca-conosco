<script>
import VueApexCharts from "vue3-apexcharts";
import { formartCurrency } from "../../util";
import { ref } from "vue";
import Card from "@/components/Card.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import DatePicker from "@/components/DatePicker.vue";
import Dialog from "@/components/Dialog.vue";

export default {
	name: "Perfil",
	components: { Card, Table, Button, Input, Dialog, DatePicker, apexchart: VueApexCharts },
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
            formartCurrency,
		};
	},

	methods: {
	},
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <h1 class="title">Finanças</h1>
        <Button class="w-fit self-end">Gerar Relatório</Button>
        <div class="flex gap-4 [&>*]:w-full">
            <Card v-for="total in totals" class="total-card">
                <h6>{{ total.name }}</h6>
                <p :class="total.value">{{ formartCurrency(total.total) }}</p>
            </Card>
        </div>
        <Card>
            <apexchart
                width="100%"
                height="300px"
                type="line"
                :options="chartOptions"
                :series="series"
            ></apexchart>
        </Card>
        <DatePicker></DatePicker>
        <Table :headers="headers"></Table>
    </div>
</template>

<style scoped lang="scss">
@import "../../style/var.scss";

.total-card {
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
</style>
