<template>

    <div class="flex justify-between items-center gap-2" style="margin-top: 1.5em;">
        <h2 class="text-[2.5em] font-bold" v-if="isEdicao">Editar despesas</h2>
        <h2 class="text-[2.5em] font-bold" v-else>Criar despesas</h2>

        <div class="flex items-center">
            <Button v-if="isEdicao" @click=mudarEdicao>Criar despesas</Button>
            <Button v-else @click=mudarEdicao>Editar despesas</Button>
        </div>
    </div>

    <div v-show="isEdicao">

        <Card>
            <Input type="text" label="Descrição" placeholder="Digite aqui"></Input>

            <div class="flex gap-6">
                <Input type="text" label="Valor" placeholder="Digite aqui">Digite aqui</Input>
                <div class="tipo-holder">
                    <h3 class="label-text">Tipo</h3>
                    <select class="input">
                        <option disabled selected value="" default>Selecione</option>
                        <option>Tipo1</option>
                        <option>Tipo2</option>
                        <option>Tipo3</option>
                    </select>
                </div>
            </div>

            <input v-model="dataChecked" class="selecionar-data flex-row flex-wrap" type="checkbox"
                style="width: 2em; height: 1.3em;">Selecionar
            data</input>

            <Input v-if="dataChecked" type="date" label="Selecione a data"></Input>

        </Card>

        <div class="flex flex-row flex-wrap gap-2 justify-end ">

            <Button class="only-border" @click="$router.push('/financas')">Cancelar</Button>
            <Button>Editar</Button>

        </div>
    </div>

    <div v-show="!isEdicao">

        <div class = "flex flex-row flex-wrap gap-2 justify-start" style="margin-bottom: 1em;">
            <Button @click="$router.push('/gado')">
                Criação
            </Button>
            <Button class = "only-border">
                Importar planilha
            </Button>
        </div>

        <Card>
            <Input type="text" label="Descrição" placeholder="Digite aqui"></Input>

            <div class="flex gap-6">
                <Input type="text" label="Valor" placeholder="Digite aqui">Digite aqui</Input>
                <div class="tipo-holder">
                    <h3 class="label-text">Tipo</h3>
                    <select class="input">
                        <option disabled selected value="" default>Selecione</option>
                        <option>Tipo1</option>
                        <option>Tipo2</option>
                        <option>Tipo3</option>
                    </select>
                </div>
            </div>

            <input v-model="dataChecked" class="selecionar-data flex-row flex-wrap" type="checkbox"
                style="width: 2em; height: 1.3em;">Selecionar
            data</input>

            <Input v-if="dataChecked" type="date" label="Selecione a data"></Input>

        </Card>

        <div class="flex flex-row flex-wrap gap-2 justify-end ">

            <Button class="only-border" @click="$router.push('/financas')">Cancelar</Button>
            <Button>Criar</Button>

        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import Button from "../../components/Button.vue";
import Dialog from "../../components/Dialog.vue";
import Card from "../../components/Card.vue"
import Input from "../../components/Input.vue"



export default {
    name: "Financas",
    components: { Button, Dialog, Card, Input },
    inject: ["Auth"],

    setup() {
        const dataChecked = ref(false)
        const isEdicao = ref(false)
        return {
            dataChecked,
            isEdicao
        }

    },

    methods: {
        mudarEdicao() {
            this.isEdicao = !this.isEdicao
        }
    },

};
</script>


<style lang="scss" scoped>
@import "../../style/var.scss";

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
    width: 100%;
}

.card {
    margin-bottom: 1%;
}

.label-text {
    color: #004d3c;
    font-weight: 600;
    gap: 0.2em;
}

.input {
    width: 100%;
    height: 2.5em;
    border-radius: 8px;
    border: 0.15em #d9d9d9 solid;
    padding: 0.5em;
    color: #5C5C5C;

    &::placeholder {
        color: #A6A6A6;
    }

    &:focus {
        outline: none;
        box-shadow: none;
        border-color: #66d7d1;
    }
}
</style>