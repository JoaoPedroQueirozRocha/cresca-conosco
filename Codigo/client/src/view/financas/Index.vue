<template>
    <h2 class="text-[2.5em] font-bold">Finanças</h2>
    <div class="flex flex-row flex-wrap gap-2 content-center">
        <Button @click="createDialog">Despesas</Button>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import Table from "../../components/Table.vue";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import Dialog  from "../../components/Dialog.vue";

export default {
    name: "Financas",
    components: { Table, Button, Input, Dialog },
    inject: ["Auth"], 


    setup(){
        
    }
};
</script>