<script>
import Menu from "./components/Menu.vue";
import Alert from "./components/Alert.vue";
import Topbar from "./components/Topbar.vue"

export default {
  name: "App",
  inject: ["Auth"],
  components: { Menu, Alert, Topbar },
};
</script>

<template>
  <Alert />
  <div class="flex w-full h-screen overflow-auto">
    <Menu />
    <Topbar />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "style/var.scss";

#app {
  font-family: "Inter", sans-serif;
  padding: 0;
  background: $gray-100;
}
</style>
