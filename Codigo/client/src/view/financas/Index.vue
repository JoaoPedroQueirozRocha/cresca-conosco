

<template>
    <Button @click="$router.push('/financas/edicao')">Editar despesa</Button>
</template>


<script>
import Button from "../../components/Button.vue";
import Dialog from "../../components/Dialog.vue";
import Card from "../../components/Card.vue"
import Input from "../../components/Input.vue"


export default {
    name: "Financas",
    components: { Button, Dialog, Card, Input },
    inject: ["Auth"],

    data(){
        return {
            dataChecked: false
        }
    },

    setup() {
        return {
        }

    },

    methods: {
        
    },

    created() {
    },

    beforeMount() {
        
    },
};
</script>

