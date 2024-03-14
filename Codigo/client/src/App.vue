<script>
import Menu from "./components/Menu.vue";
import Alert from "./components/Alert.vue";
import Input from "./components/Input.vue";

export default {
  name: "App",
  components: { Menu, Alert, Input },
};
</script>

<template>
  <Alert />
  <div class="flex w-full h-screen">
    <Menu />
    <Input type="search" />
    <router-view />
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Alert from "./components/Alert.vue";

export default {
  name: "App",
  components: { Menu, Alert },
  inject: ["Auth"],
  methods: {
    logout() {
      console.log("logout");
      this.Auth.logout();
    },
  },
};
</script>

<style lang="scss">
@import "style/var.scss";

#app {
  font-family: "Inter", sans-serif;
  padding: 0;
  background: $gray-100;
}
</style>
