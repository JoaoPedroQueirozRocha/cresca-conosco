<template>
    <div class="flex justify-between items-center gap-2 mb-8" style="margin-top: 1.5em;">
        <h2 class="title">{{ title }}</h2>
    </div>
    <Tab v-model="tabIndex" :items="tabItems" disabled v-if="!isEdicao" class="mb-6" />

    <div>
        <Card class="flex flex-col gap-4 mb-4">
            <Input type="text" label="Descrição" v-model="descricaoDespesa" placeholder="Digite aqui"></Input>

            <div class="flex gap-6">
                <Input class="w-[50%]" type="number" label="Valor" placeholder="Digite aqui" v-model="valorDespesa" />
                <Select class="tipo-holder" v-model="tipoDespesa" :items="selectItems" label="Tipo">
                    Selecione
                </Select>
            </div>

            <Checkbox v-model="dataChecked">Selecionar data</Checkbox>

            <DatePicker v-if="dataChecked" label="Selecione a data" v-model="dataDespesa" />

        </Card>

        <div class="flex flex-row flex-wrap gap-2 justify-end ">
            <Button class="only-border" :disabled="loading" @click="$router.push('/financas')">Cancelar</Button>
            <Button @click = "salvar" :loading="loading">{{ buttonText }}</Button>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import Button from "@/components/Button.vue";
import Dialog from "@/components/Dialog.vue";
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import Tab from "@/components/Tab.vue";
import Checkbox from "@/components/Checkbox.vue";
import Select from "@/components/Select.vue";
import DatePicker from "@/components/DatePicker.vue";
import controller from "@/controller/cost.js";

export default {
    name: "EditarDespesas",
    props: {
        isEdicao: Boolean,
        title: String,
        id: String | Number,
    },
    components: { Button, Dialog, Card, Input, Tab, Checkbox, Select, DatePicker },
    inject: ["Auth"],

    setup() {
        const dataChecked = ref(false)
        const descricaoDespesa = ref("")
        const valorDespesa = ref(0)
        const tipoDespesa = ref("")
        const dataDespesa = ref("")
        const tabItems = ref([
            {
                text: 'Criação',
                icon: 'add_circle'
            },
            {
                text: 'Importação de Planilha',
                icon: 'swap_vert'
            },
        ]);
        const tabIndex = ref(0);
        const selectItems = ref([
            {
                label: 'Compras',
                value: 'compras'
            },
            {
                label: 'Despesas trabalhistas',
                value: 'despesas trabalhistas'
            },
            {
                label: 'Diversos',
                value: 'diverso'
            },
        ]);
        const defaultAlert = ref({
            top: true,
            right: true,
            timeout: 3500,
        });
        const loading = ref(false);

        return {
            dataChecked,
            descricaoDespesa,
            valorDespesa,
            tipoDespesa,
            dataDespesa,
            tabItems,
            tabIndex,
            selectItems,
            defaultAlert,
            loading,
        }
    },

    computed: {
        buttonText() {
            if (this.isEdicao) return 'Salvar';
            return 'Criar';
        }
    },

    async created() {
        if (this.isEdicao) {
            try {
                const { data } = await controller.getCost(Number(this.id));
                this.valorDespesa = data.valor;
                this.descricaoDespesa = data.descricao;
                this.tipoDespesa = this.selectItems.find((item) => item.value == data.tipo);
                this.dataDespesa = new Date(data.updated_at);

            } catch (e) {
                this.$alert({
					message: `Erro ao requisitar essa despesa`,
					...this.defaultAlert,
				});
            }
        }
    },

    methods: {
        async salvar() {
            if (!this.isValid()) {
                this.$alert({
					message: `Preencha todos os dados para salvar a despesa`,
					...this.defaultAlert,
				});
                return;
            }

            this.loading = true;
            const data = {
                valor: this.valorDespesa,
                descricao: this.descricaoDespesa,
                tipo: this.tipoDespesa.value,
                updated_at: this.dataChecked ? this.dataDespesa : new Date(),
            };

            try {
                if (this.isEdicao) {
                    await controller.updateCost(this.id, data);
                } else {
                    await controller.createCost(data);
                }

                this.$alert({
                    type: 'success',
					message: `Despesa salva com sucesso`,
					...this.defaultAlert,
				});

            } catch (e) {
                console.log(e)
                this.$alert({
					message: `Erro ao salvar despesa. Tente novamente mais tarde`,
					...this.defaultAlert,
				});
            } finally {
                this.loading = false;
                this.$router.push('/financas');
            }
        },

        isValid() {
            let valid = 
                this.valorDespesa > 0 &&
                this.descricaoDespesa &&
                this.tipoDespesa.value &&
                (!this.dataChecked || (this.dataChecked && this.dataDespesa));
            
            return valid;
        }
    },
};
</script>


<style lang="scss" scoped>
@import "../../../style/var.scss";

.selecionar-data {
    margin-top: 1em;
    margin-bottom: 1em;
}

.tipo-holder {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    height: fit-content;
    width: 50%;
}

.card {
    margin-bottom: 1%;
}
</style>