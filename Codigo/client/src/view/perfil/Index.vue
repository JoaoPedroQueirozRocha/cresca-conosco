<script>
import userController from '@/controller/user.js';
import { ref } from 'vue';
import Card from '@/components/Card.vue';

export default {
    name: 'Perfil',
    components: { Card },
    setup() {
        return {
        }
    },

    beforeMount() {
    },

    beforeUnmount() {
    },

    methods: {
    }
}
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <h1 class="title">Perfil</h1>
        <Card class="w-full"></Card>
    </div>
</template>