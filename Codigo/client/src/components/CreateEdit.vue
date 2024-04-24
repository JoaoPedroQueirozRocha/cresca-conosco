<template>
    <div class="flex justify-between items-center gap-2 mb-8">
        <h2 class="title">{{ title }}</h2>
    </div>
    <Tab v-model="tabIndex" :items="tabItems" v-if="!id" class="mb-6" />

    <div>
        <Card class="flex flex-col gap-4 mb-4" v-if="tabIndex == 0">
            <Input type="text" label="Descrição" v-model="data.descricao" placeholder="Digite aqui"></Input>

            <div class="flex gap-6 flex-wrap">
                <Input class="md:w-[49%] w-full" type="number" label="Valor" placeholder="Digite aqui" v-model="data.valor" />
                <Select class="tipo-holder md:w-[49%] w-full" v-model="tipo" :items="types" @update:model-value="changeTipo" label="Tipo">
                    Selecione
                </Select>
            </div>

            <Checkbox v-model="dataChecked">Selecionar data</Checkbox>
            
            <DatePicker v-if="dataChecked" label="Selecione a data" v-model="data.updated_at" />
            
        </Card>
        <ImportData v-model="fileData.headers" v-model:values="fileData.values" v-model:map="fileData.map" :options="Object.keys(data)" v-else />

        <div class="flex flex-row flex-wrap gap-2 justify-end ">
            <Button class="only-border" :disabled="loading" @click="$router.push('/financas')">Cancelar</Button>
            <Button @click="salvar" :loading="loading">{{ buttonText }}</Button>
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
import ImportData from "@/components/ImportData.vue";
import DatePicker from "@/components/DatePicker.vue";
import { upperCaseFirstLetter, checkValidImport } from "@/util";

export default {
    name: "CreateEdit",
    props: {
        id: String | Number,
        value: String,
        types: Array,
        callback: Function,
        import: Function,
        get: Function,
    },
    components: { Button, Dialog, Card, Input, Tab, Checkbox, Select, DatePicker, ImportData },
    inject: ["Auth"],

    setup() {
        const data = ref({
            descricao: '',
            valor: 0,
            tipo: '',
            updated_at: '',
        });
        const dataChecked = ref(false)
        const tipo = ref("")
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
        const defaultAlert = ref({
            top: true,
            right: true,
            timeout: 3500,
        });
        const loading = ref(false);
        const fileData = ref({
            map: false,
            headers: [],
            parsedHeaders: [],
            values: [],
            parsedValues: [],
        });

        return {
            data,
            dataChecked,
            tipo,
            tabItems,
            tabIndex,
            defaultAlert,
            loading,
            fileData,
        }
    },

    computed: {
        title() {
            if (this.id) return 'Editar ' + upperCaseFirstLetter(this.value);
            return 'Criar ' + upperCaseFirstLetter(this.value);
        },
        buttonText() {
            if (this.id) return 'Salvar';
            else if (this.tabIndex > 0) return 'Importar';
            return 'Criar';
        },
        errorMessage() {
            if (this.tabIndex > 0) return `importar arquivo`;
            return `salvar a ${this.value}`;
        },
        sucessMessage() {
            if (this.tabIndex > 0) return `Arquivo importado`;
            return `${upperCaseFirstLetter(this.value)} salva`;
        }
    },

    async created() {
        if (this.id) {
            try {
                const { data } = await this.get(Number(this.id));
                this.data = data;
                this.tipo = this.types.find((item) => item.value == data.tipo);

            } catch (e) {
                this.callAlert(`Erro ao requisitar a ${this.value}`);
            }
        }
    },

    methods: {
        async salvar() {
            const importError = this.isImportaValid();
            if ((!this.isValid() && this.tabIndex == 0) || importError) {
                this.callAlert(importError || `Preencha todos os dados para salvar a ${this.value}`);
                return;
            }

            this.loading = true;

            try {
                if (this.id) {
                    await this.callback(this.id, this.data);
                }
                else if (this.tabIndex > 0) {
                    await this.import(this.fileData.parsedHeaders, this.fileData.parsedValues);
                } else {
                    await this.callback(this.data);
                }

                this.callAlert(`${this.sucessMessage} com sucesso`, { type: 'success' });

            } catch (e) {
                this.callAlert(`Erro ao ${this.errorMessage}. Tente novamente mais tarde`);
            } finally {
                this.loading = false;
                this.$router.push('/financas');
            }
        },

        callAlert(message, extra = {}) {
            this.$alert({
                message: message,
                ...extra,
                ...this.defaultAlert,
            });
        },

        changeTipo(value) {
            this.data.tipo = value.value;
        }, 

        isValid() {
            if (!this.dataChecked && !this.id) this.data.updated_at = new Date();

            return this.data.valor > 0 &&
                this.data.descricao &&
                this.data.tipo &&
                this.data.updated_at;
        },

        isImportaValid() {
            if (this.tabIndex == 0) return;
            const data = checkValidImport(this.fileData.headers, this.fileData.values, this.fileData.map, Object.keys(this.data), this.value);
            this.fileData.parsedHeaders = data.parsedHeaders;
            this.fileData.parsedValues = data.parsedValues;
            
            return data.message;
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