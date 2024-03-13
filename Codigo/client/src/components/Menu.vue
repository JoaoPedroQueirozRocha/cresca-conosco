<script setup>
import { ref, onBeforeMount, onMounted, onUpdated, onBeforeUnmount } from 'vue';

defineProps({
  msg: String,
});

const mutationObserver = new MutationObserver(resize);
const menu = ref(); 
const isPhone = ref(false);

onBeforeMount(() => {
    isPhone.value = window.innerWidth <= 645;
    window.addEventListener('resize', handleResize);
});


onMounted(() => {
    if (menu.value) mutationObserver.observe(menu.value, { characterData: true, subtree: true, childList: true });
});

onUpdated(resize);

onBeforeUnmount(() => {
    if (mutationObserver) mutationObserver.disconnect();
    window.removeEventListener('resize', handleResize);
});

function resize() {
}

function handleResize() {
    isPhone.value = window.innerWidth <= 645;
    resize();
}
</script>

<template>
    <div class="menu" ref="menu" v-if="!isPhone">
        <div class="flex">
            <img src="../assets/logoCrescaConosco.svg" alt="logo cresça conosco" class="logo" />
            <img src="../assets/crescaConoscoText.svg" alt="logo cresça conosco" class="logo" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../style/var.scss";

.menu {
    width: fit-content;
    box-shadow: 1.25px 1.25px 4px rgba(0, 0, 0, 0.25);
    background: $green-light;
}

.logo {
    height: 170px;
    width: 170px;
}
</style>