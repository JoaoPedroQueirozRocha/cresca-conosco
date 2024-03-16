<script>
import Menu from "./components/Menu.vue";
import Alert from "./components/Alert.vue";
import Confirm from "./components/Confirm.vue";
import Topbar from "./components/Topbar.vue";

export default {
  name: "App",
  components: { Menu, Alert, Topbar, Confirm },
  inject: ["Auth"],
  setup() {},

  async created() {
    if (!this.$route.meta.unprotected) {
      if (await this.Auth.getTokenSilently()) {
        this.$router.push({ name: "Perfil" });
      }
    }
  },

  methods: {
    logout() {
      this.Auth.logout();
    },
  },
};
</script>

<template>
  <Alert />
  <Confirm />
  <div class="flex w-full h-screen">
    <Menu />
    <Topbar />
    <div class="md:mt-14 mt-20 w-full h-fit md:px-8 content pb-4">
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
  overflow: auto;
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
