<script setup>
import Menu from './components/Menu.vue'
</script>

<template>
  <div class="flex w-full h-screen">
    <Menu />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "style/var.scss";

#app {
  font-family: 'Inter', sans-serif;
  padding: 0;
  background: $gray-100;
}
</style>
