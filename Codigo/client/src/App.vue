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
  <div class="flex w-full h-screen">
    <Menu />
    <Topbar />
    <div class="md:mt-14 mt-20 w-full h-full md:px-8 content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "style/var.scss";

body {
  font-family: "Inter", sans-serif;
  padding: 0;
  background: $gray-200;
}

.title {
  @apply text-4xl font-bold;
  color: $green-dark;
}

@media screen and (max-width: 768px) {
  .content {
    padding: 0 1em;
  }
}
</style>
